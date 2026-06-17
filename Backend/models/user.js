const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobilenumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "student"
  },
  // ===== BUG 3 FIX: Active/Deactive =====
  isActive: {
    type: Boolean,
    default: true
  },
  // ===== BUG 2 FIX: Enrolled course tracking =====
  enrolledCourse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    default: null
  },
  enrolledCourseName: {
    type: String,
    default: ""
  },
  isEnrolled: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// ✅ HASH PASSWORD (ONLY HERE)
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);