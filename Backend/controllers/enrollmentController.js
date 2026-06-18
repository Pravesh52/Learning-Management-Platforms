const Enrollment = require("../models/enrollment");
const User = require("../models/user");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");

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
// ✅ FIX: transporter ek baar banao — baar baar mat banao
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// const sendEmail = async (to, subject, html) => {
//   // ✅ FIX: Email_USER nahi hai toh skip karo — server crash nahi hoga
//   if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
//     console.log("⚠️ Email credentials missing — email skip kar rahe hain");
//     return;
//   }
//   try {
//     await transporter.sendMail({
//       from: `"Climax Academy" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     });
//     console.log("✅ Email sent to:", to);
//   } catch (err) {
//     // ✅ FIX: Email fail hone pe enrollment fail nahi hogi
//     console.log("❌ Email error (non-blocking):", err.message);
//   }
// };

const sendEmail = async (to, subject, html) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log("⚠️ Email credentials missing");
    return;
  }
  try {
    const info = await transporter.sendMail({
      from: `"Climax Academy" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    // ✅ Message ID log karo — confirm hoga email gayi
    console.log("✅ Email sent to:", to);
    console.log("✅ Message ID:", info.messageId); // ADD THIS
  } catch (err) {
    console.log("❌ Email error:", err.message);
    console.log("❌ Full error:", err); // ADD THIS
  }
};

// ===== CREATE ENROLLMENT =====
exports.createEnrollment = async (req, res) => {
  try {
    const {
      studentId, courseId, courseName,
      studentName, fatherName, motherName, dob, aadharNo, gender, mobile, email,
      fullAddress, city, district, state, pinCode,
      schoolName, board, presentClass, stream, prevPercentage,
      feesMode, totalFees, batch,
    } = req.body;

    // ✅ Validation
    if (!studentId || !courseId || !courseName) {
      return res.status(400).json({ message: "Student, Course aur Course Name required hai" });
    }

    // ✅ Already enrolled check
    const existing = await Enrollment.findOne({ student: studentId, course: courseId });
    if (existing) {
      return res.status(400).json({ message: "Aap already is course mein enrolled hain" });
    }

    const photo = req.file ? req.file.filename : "";

    // ✅ Enrollment create karo
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

    // ✅ User ka isEnrolled update karo
    await User.findByIdAndUpdate(studentId, {
      isEnrolled: true,
      enrolledCourse: courseId,
      enrolledCourseName: courseName,
    });

    // ✅ Pehle response bhejo — phir email (non-blocking)
    res.status(201).json({ message: "Enrolled successfully", enrollment });

    // ✅ FIX: Email response ke BAAD bhejo taaki submit button fast respond kare
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 30px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #6c63ff; margin: 0;">🎓 Enrollment Confirmed!</h2>
          <h3 style="color: #333; margin: 5px 0;">Climax Academy</h3>
        </div>
        <hr style="border: 1px solid #eee;"/>
        <p style="color: #333;">Dear <strong>${studentName}</strong>,</p>
        <p style="color: #555;">You have been successfully enrolled in <strong style="color: #6c63ff;">${courseName}</strong>!</p>
        <table style="width:100%; border-collapse: collapse; margin-top: 20px;">
          <tr style="background: #6c63ff; color: white;">
            <th style="padding: 10px; text-align: left; border-radius: 6px 0 0 0;">Details</th>
            <th style="padding: 10px; text-align: left; border-radius: 0 6px 0 0;">Info</th>
          </tr>
          <tr style="background: #fff;">
            <td style="padding: 10px; border: 1px solid #eee;">📚 Course</td>
            <td style="padding: 10px; border: 1px solid #eee;"><strong>${courseName}</strong></td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #eee;">👤 Student Name</td>
            <td style="padding: 10px; border: 1px solid #eee;">${studentName}</td>
          </tr>
          <tr style="background: #fff;">
            <td style="padding: 10px; border: 1px solid #eee;">📧 Email</td>
            <td style="padding: 10px; border: 1px solid #eee;">${email}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #eee;">📱 Mobile</td>
            <td style="padding: 10px; border: 1px solid #eee;">${mobile}</td>
          </tr>
          <tr style="background: #fff;">
            <td style="padding: 10px; border: 1px solid #eee;">🎓 Class</td>
            <td style="padding: 10px; border: 1px solid #eee;">${presentClass || "—"}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #eee;">💰 Fees Mode</td>
            <td style="padding: 10px; border: 1px solid #eee;">${feesMode === "online" ? "💳 Online" : "💵 Offline"}</td>
          </tr>
          <tr style="background: #fff;">
            <td style="padding: 10px; border: 1px solid #eee;">📅 Enrolled On</td>
            <td style="padding: 10px; border: 1px solid #eee;">${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</td>
          </tr>
        </table>
        <div style="margin-top: 25px; padding: 15px; background: #f0f0ff; border-radius: 8px; border-left: 4px solid #6c63ff;">
          <p style="margin: 0; color: #555; font-size: 14px;">🌟 Best of luck with your studies! Our team will contact you soon with further details.</p>
        </div>
        <p style="color: #6c63ff; font-weight: bold; margin-top: 20px;">— Climax Academy Team</p>
      </div>
    `;

    // ✅ Non-blocking email — await mat karo yahan
    sendEmail(
      email,
      `✅ Enrollment Confirmed - ${courseName} | Climax Academy`,
      emailHtml
    );

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