const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  studentName: { type: String, required: true },
  enrollmentNumber: { type: String, required: true }, // ✅ Always shown with result

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  courseName: { type: String, default: "" },

  // ===== TEST DETAILS =====
  testType: {
    type: String,
    enum: ["Marathon Test", "Weekly Test", "Quiz Test"],
    required: true,
  },
  testName: { type: String, required: true }, // e.g. "Marathon Test #1"

  marksObtained: { type: Number, required: true },
  totalMarks: { type: Number, required: true }, // ✅ Admin decides
  percentage: { type: Number, default: 0 },     // auto-calculated

  remarks: { type: String, default: "" },
  date: { type: Date, default: Date.now },

  // ===== SEND CONTROL =====
  sentToStudent: { type: Boolean, default: false },

}, { timestamps: true });

// ✅ Auto calculate percentage before save
resultSchema.pre("save", function (next) {
  if (this.totalMarks > 0) {
    this.percentage = Math.round((this.marksObtained / this.totalMarks) * 100 * 100) / 100;
  }
  next();
});

module.exports = mongoose.model("Result", resultSchema);