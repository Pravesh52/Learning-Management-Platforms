const Enrollment = require("../models/enrollment");
const User = require("../models/user");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

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

// ===== ENROLLMENT NUMBER GENERATOR =====
// Format: CA2026001, CA2026002, ...
const generateEnrollmentNumber = async () => {
  const year = new Date().getFullYear();
  const prefix = `CA${year}`;

  // ✅ Is saal ka last enrollment number dhundo
  const lastEnrollment = await Enrollment.findOne({
    enrollmentNumber: { $regex: `^${prefix}` },
  }).sort({ enrollmentNumber: -1 });

  let nextNumber = 1;
  if (lastEnrollment) {
    const lastNum = parseInt(lastEnrollment.enrollmentNumber.slice(prefix.length));
    nextNumber = lastNum + 1;
  }

  // 3 digit padding: 001, 002, ... 999
  const paddedNumber = String(nextNumber).padStart(3, "0");
  return `${prefix}${paddedNumber}`;
};

// ===== EMAIL SENDER (Resend) =====
const sendEmail = async (to, subject, html) => {
  if (!process.env.RESEND_API_KEY) {
    console.log("⚠️ RESEND_API_KEY missing");
    return;
  }
  try {
    const { data, error } = await resend.emails.send({
      from: "Climax Academy <onboarding@resend.dev>",
      to: process.env.EMAIL_USER || to, // Domain verify hone tak admin email pe
      replyTo: to,
      subject,
      html,
    });
    if (error) {
      console.log("❌ Resend error:", error);
      return;
    }
    console.log("✅ Email sent! ID:", data.id);
  } catch (err) {
    console.log("❌ Email error:", err.message);
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

    if (!studentId || !courseId || !courseName) {
      return res.status(400).json({ message: "Student, Course aur Course Name required hai" });
    }

    const existing = await Enrollment.findOne({ student: studentId, course: courseId });
    if (existing) {
      return res.status(400).json({ message: "Aap already is course mein enrolled hain" });
    }

    const photo = req.file ? req.file.filename : "";

    // ✅ Generate unique enrollment number
    const enrollmentNumber = await generateEnrollmentNumber();

    const enrollment = await Enrollment.create({
      enrollmentNumber,
      student: studentId,
      course: courseId,
      courseName,
      studentName, fatherName, motherName, dob, aadharNo, gender, mobile, email,
      photo,
      fullAddress, city, district, state, pinCode,
      schoolName, board, presentClass, stream, prevPercentage,
      feesMode, totalFees: Number(totalFees) || 0, batch: batch || "",
    });

    // ✅ User update — enrollmentNumber bhi save karo
    await User.findByIdAndUpdate(studentId, {
      isEnrolled: true,
      enrolledCourse: courseId,
      enrolledCourseName: courseName,
      enrollmentNumber, // ✅ NEW
    });

    res.status(201).json({
      message: "Enrolled successfully",
      enrollment,
      enrollmentNumber, // ✅ Frontend ko bhejo
    });

    // ===== EMAIL (non-blocking) =====
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 30px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #6c63ff; margin: 0;">🎓 Enrollment Confirmed!</h2>
          <h3 style="color: #333; margin: 5px 0;">Climax Academy</h3>
        </div>
        <hr style="border: 1px solid #eee;"/>
        <p style="color: #333;">Dear <strong>${studentName}</strong>,</p>
        <p style="color: #555;">You have been successfully enrolled in <strong style="color: #6c63ff;">${courseName}</strong>!</p>
        <div style="background: #6c63ff; color: white; padding: 15px; border-radius: 8px; text-align: center; margin: 15px 0;">
          <p style="margin: 0; font-size: 13px;">Your Enrollment Number</p>
          <p style="margin: 5px 0 0; font-size: 24px; font-weight: bold;">${enrollmentNumber}</p>
        </div>
        <table style="width:100%; border-collapse: collapse; margin-top: 20px;">
          <tr style="background: #6c63ff; color: white;">
            <th style="padding: 10px; text-align: left;">Details</th>
            <th style="padding: 10px; text-align: left;">Info</th>
          </tr>
          <tr style="background: #fff;"><td style="padding: 8px 10px; border: 1px solid #ddd;">Enrollment No.</td><td style="padding: 8px 10px; border: 1px solid #ddd;"><strong>${enrollmentNumber}</strong></td></tr>
          <tr style="background: #f5f5f5;"><td style="padding: 8px 10px; border: 1px solid #ddd;">Course</td><td style="padding: 8px 10px; border: 1px solid #ddd;">${courseName}</td></tr>
          <tr style="background: #fff;"><td style="padding: 8px 10px; border: 1px solid #ddd;">Student Name</td><td style="padding: 8px 10px; border: 1px solid #ddd;">${studentName}</td></tr>
          <tr style="background: #f5f5f5;"><td style="padding: 8px 10px; border: 1px solid #ddd;">Email</td><td style="padding: 8px 10px; border: 1px solid #ddd;">${email}</td></tr>
          <tr style="background: #fff;"><td style="padding: 8px 10px; border: 1px solid #ddd;">Mobile</td><td style="padding: 8px 10px; border: 1px solid #ddd;">${mobile}</td></tr>
          <tr style="background: #f5f5f5;"><td style="padding: 8px 10px; border: 1px solid #ddd;">Fees Mode</td><td style="padding: 8px 10px; border: 1px solid #ddd;">${feesMode === "online" ? "Online" : "Offline"}</td></tr>
        </table>
        <p style="color: #6c63ff; font-weight: bold; margin-top: 20px;">- Climax Academy Team</p>
      </div>
    `;
    sendEmail(email, `✅ Enrollment Confirmed - ${courseName} | Climax Academy`, emailHtml);

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
    res.json({ isEnrolled: !!enrollment, enrollmentNumber: enrollment?.enrollmentNumber || null });
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