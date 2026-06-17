const Enrollment = require("../models/enrollment");
const User = require("../models/user");
const Course = require("../models/course");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");

// File ke bilkul top pe test karo
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "SET ✅" : "NOT SET ❌");

// ===== MULTER SETUP FOR PHOTO =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "upload/photos";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `photo_${Date.now()}${path.extname(file.originalname)}`);
  },
});
exports.upload = multer({ storage });

// ===== EMAIL SENDER =====
const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html });
    console.log("✅ Email sent to:", to);
  } catch (err) {
    console.log("❌ Email error:", err.message);
  }
};

// ===== BUG 2 FIX: CREATE ENROLLMENT =====
exports.createEnrollment = async (req, res) => {
  try {
    const {
      studentId, courseId, courseName,
      studentName, fatherName, motherName, dob, aadharNo, gender, mobile, email,
      fullAddress, city, district, state, pinCode,
      schoolName, board, presentClass, stream, prevPercentage,
      feesMode, totalFees, batch,
    } = req.body;

    // Check already enrolled
    const existing = await Enrollment.findOne({ student: studentId, course: courseId });
    if (existing) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const photo = req.file ? req.file.filename : "";

    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
      courseName,
      studentName, fatherName, motherName, dob, aadharNo, gender, mobile, email,
      photo,
      fullAddress, city, district, state, pinCode,
      schoolName, board, presentClass, stream, prevPercentage,
      feesMode, totalFees: Number(totalFees) || 0, batch: batch || "",
    });

    // ✅ Update user's enrolled status
    await User.findByIdAndUpdate(studentId, {
      isEnrolled: true,
      enrolledCourse: courseId,
      enrolledCourseName: courseName,
    });

    // ✅ Send email confirmation
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 30px; border-radius: 10px;">
        <h2 style="color: #6c63ff; text-align: center;">🎓 Enrollment Confirmed!</h2>
        <h3 style="text-align: center; color: #333;">Climax Academy</h3>
        <hr/>
        <p>Dear <strong>${studentName}</strong>,</p>
        <p>You have been successfully enrolled in <strong>${courseName}</strong>!</p>
        <table style="width:100%; border-collapse: collapse; margin-top: 20px;">
          <tr style="background: #6c63ff; color: white;">
            <th style="padding: 10px; text-align: left;">Details</th>
            <th style="padding: 10px; text-align: left;">Info</th>
          </tr>
          <tr style="background: #fff;">
            <td style="padding: 8px 10px; border: 1px solid #ddd;">Course</td>
            <td style="padding: 8px 10px; border: 1px solid #ddd;">${courseName}</td>
          </tr>
          <tr style="background: #f5f5f5;">
            <td style="padding: 8px 10px; border: 1px solid #ddd;">Student Name</td>
            <td style="padding: 8px 10px; border: 1px solid #ddd;">${studentName}</td>
          </tr>
          <tr style="background: #fff;">
            <td style="padding: 8px 10px; border: 1px solid #ddd;">Email</td>
            <td style="padding: 8px 10px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr style="background: #f5f5f5;">
            <td style="padding: 8px 10px; border: 1px solid #ddd;">Mobile</td>
            <td style="padding: 8px 10px; border: 1px solid #ddd;">${mobile}</td>
          </tr>
          <tr style="background: #fff;">
            <td style="padding: 8px 10px; border: 1px solid #ddd;">Fees Mode</td>
            <td style="padding: 8px 10px; border: 1px solid #ddd;">${feesMode === "online" ? "Online" : "Offline"}</td>
          </tr>
          <tr style="background: #f5f5f5;">
            <td style="padding: 8px 10px; border: 1px solid #ddd;">Enrolled On</td>
            <td style="padding: 8px 10px; border: 1px solid #ddd;">${new Date().toLocaleDateString("hi-IN")}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; color: #666; font-size: 14px;">Best of luck with your studies! 🌟</p>
        <p style="color: #6c63ff; font-weight: bold;">- Climax Academy Team</p>
      </div>
    `;
    await sendEmail(email, `✅ Enrollment Confirmed - ${courseName} | Climax Academy`, emailHtml);

    res.status(201).json({ message: "Enrolled successfully", enrollment });
  } catch (error) {
    console.log("ENROLLMENT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ===== CHECK ENROLLMENT STATUS =====
exports.checkEnrollment = async (req, res) => {
  try {
    const { studentId, courseId } = req.params;
    const enrollment = await Enrollment.findOne({ student: studentId, course: courseId });
    res.json({ isEnrolled: !!enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===== GET STUDENT'S ENROLLMENTS =====
exports.getStudentEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.params.studentId });
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===== GET ALL ENROLLMENTS (Admin) =====
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("student", "name email mobilenumber")
      .populate("course", "title")
      .sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===== GET SINGLE ENROLLMENT DETAIL (Admin - Eye icon) =====
exports.getEnrollmentDetail = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate("student", "name email mobilenumber")
      .populate("course", "title timing price");
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};