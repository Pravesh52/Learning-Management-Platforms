// const User = require("../models/user");
// const Admin = require("../models/admin");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");


// // ================= SIGNUP =================
// // 🔥 Only STUDENT allowed
// exports.signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Validation
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     // Check existing user
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // 🔐 Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user (always student)
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: "student"
//     });

//     res.status(201).json({
//       message: "User registered successfully",
//       user
//     });

//   } catch (error) {
//     console.log("SIGNUP ERROR 👉", error);
//     res.status(500).json({ message: error.message });
//   }
// };


// // ================= LOGIN =================
// // 🔥 Admin + Student auto detect (BEST APPROACH)
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validation
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and Password required" });
//     }

//     // ================= 1. CHECK ADMIN =================
//     const admin = await Admin.findOne({ email });

//     if (admin) {
//       const isMatch = await bcrypt.compare(password, admin.password);

//       if (!isMatch) {
//         return res.status(400).json({ message: "Invalid password" });
//       }

//       const token = jwt.sign(
//         { id: admin._id, role: "admin" },
//         process.env.JWT_SECRET,
//         { expiresIn: "7d" }
//       );

//       return res.json({
//         message: "Admin login successful",
//         token,
//         user: {
//           id: admin._id,
//           name: admin.name || "Admin",
//           email: admin.email,
//           role: "admin"
//         }
//       });
//     }

//     // ================= 2. CHECK STUDENT =================
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: "student" },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     return res.json({
//       message: "User login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: "student"
//       }
//     });

//   } catch (error) {
//     console.log("LOGIN ERROR 👉", error);
//     res.status(500).json({ message: error.message });
//   }
// };


const User = require("../models/user");
const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ================= SIGNUP =================
// exports.signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     // ❗ NO HASH HERE
//     const user = await User.create({
//       name,
//       email,
//       password,
//       role: "student"
//     });

//     res.status(201).json({
//       message: "User registered successfully",
//       user
//     });

//   } catch (error) {
//     console.log("SIGNUP ERROR 👉", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "student"
    });

    // ✅ IMPORTANT RETURN
    return res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    console.log("SIGNUP ERROR 👉", error);

    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};


// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & Password required" });
    }

    // ===== ADMIN CHECK =====
    const admin = await Admin.findOne({ email });

    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
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
          id: admin._id,
          name: admin.name || "Admin",
          email: admin.email,
          role: "admin"
        }
      });
    }

    // ===== USER CHECK =====
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
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
    console.log("LOGIN ERROR 👉", error);
    res.status(500).json({ message: "Server error" });
  }
};