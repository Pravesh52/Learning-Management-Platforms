const User = require("../models/user");
const Admin = require("../models/admin"); // ✅ add
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= SIGNUP =================
// only student allowed
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "student" // ✅ always student
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    console.log("ERROR 👉", error);
    res.status(500).json({ message: error.message });
  }
};


// // ================= LOGIN =================
// exports.login = async (req, res) => {
//   try {
//     const { email, password, role } = req.body; // ✅ role added

//     if (!email || !password || !role) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // 🔥 ROLE VALIDATION (IMPORTANT)
//     if (user.role !== role) {
//       return res.status(400).json({ message: "Invalid role selected" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//     });

//   } catch (error) {
//     console.log("ERROR 👉", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// const User = require("../models/user");
// const Admin = require("../models/admin"); // ✅ add
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    // ================= ADMIN LOGIN =================
    if (role === "admin") {
      const admin = await Admin.findOne({ email });

      if (!admin) {
        return res.status(400).json({ message: "Admin not found" });
      }

      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { id: admin._id, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        message: "Admin login successful",
        token,
        user: {
          email: admin.email,
          role: "admin"
        }
      });
    }

    // ================= STUDENT LOGIN =================
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "User login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: "student"
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};