const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= SIGNUP =================
exports.signup = async (req, res) => {
  try {
    const { name, email, mobilenumber, password } = req.body;

    if (!name || !email || !mobilenumber || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await User.create({
      name,
      email,
      mobilenumber,
      password,
      role: "student",
      isActive: true,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log("SIGNUP ERROR 👉", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & Password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ BUG 3 FIX: Deactive user ko login nahi karne denge
    if (user.role === "student" && !user.isActive) {
      return res.status(403).json({
        message: "Your account has been deactivated. Please contact admin.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobilenumber: user.mobilenumber,
        role: user.role,
        isEnrolled: user.isEnrolled,
        enrolledCourseName: user.enrolledCourseName,
        enrolledCourse: user.enrolledCourse,
      },
    });
  } catch (error) {
    console.log("LOGIN ERROR 👉", error);
    return res.status(500).json({ message: "Server error" });
  }
};