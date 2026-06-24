const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  // ===== ENROLLMENT NUMBER (NEW) =====
  enrollmentNumber: {
    type: String,
    unique: true,
    required: true,
  },

  // ===== STUDENT REFERENCE =====
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  courseName: { type: String, required: true },

  // ===== STEP 1: PERSONAL DETAILS =====
  studentName:  { type: String, required: true },
  fatherName:   { type: String, required: true },
  motherName:   { type: String, required: true },
  dob:          { type: String, required: true },
  aadharNo:     { type: String, required: true },
  gender:       { type: String, required: true },
  mobile:       { type: String, required: true },
  email:        { type: String, required: true },
  photo:        { type: String, default: "" },

  // ===== STEP 2: ADDRESS =====
  fullAddress:  { type: String, required: true },
  city:         { type: String, required: true },
  district:     { type: String, required: true },
  state:        { type: String, required: true },
  pinCode:      { type: String, required: true },

  // ===== STEP 3: ACADEMIC =====
  schoolName:   { type: String, required: true },
  board:        { type: String, required: true },
  presentClass: { type: String, required: true },
  stream:       { type: String, required: true },
  prevPercentage: { type: String, required: true },

  // ===== STEP 4: FEES =====
  feesMode:     { type: String, enum: ["online", "offline"], required: true },
  totalFees:    { type: Number, default: 0 },
  batch:        { type: String, default: "" },

  // ===== STATUS =====
  enrolledAt:   { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Enrollment", enrollmentSchema);