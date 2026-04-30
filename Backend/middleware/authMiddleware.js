// const jwt = require("jsonwebtoken");
// const User = require("../models/user");
// const Admin = require("../models/admin"); // ✅ import admin model

// // 🔒 PROTECT
// exports.protect = async (req, res, next) => {
//   try {
//     let token;

//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     if (!token) {
//       return res.status(401).json({ message: "Not authorized" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     let user;

//     // ✅ check role from token
//     if (decoded.role === "admin") {
//       user = await Admin.findById(decoded.id).select("-password");
//     } else {
//       user = await User.findById(decoded.id).select("-password");
//     }

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = user;
//     next();

//   } catch (error) {
//     return res.status(401).json({ message: "Token failed" });
//   }
// };


// // 🔥 ADMIN ONLY
// exports.adminOnly = (req, res, next) => {
//   if (!req.user || req.user.role !== "admin") {
//     return res.status(403).json({ message: "Admin only access" });
//   }
//   next();
// };



const jwt = require("jsonwebtoken");
const User = require("../models/user");

// 🔒 PROTECT
exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 ALWAYS USER MODEL
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({ message: "Token failed" });
  }
};


// 🔥 ADMIN ONLY
exports.adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only access" });
  }
  next();
};