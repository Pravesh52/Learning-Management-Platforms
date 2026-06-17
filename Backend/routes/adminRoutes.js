const express = require("express");
const router = express.Router();
const admin = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// 🔒 ADMIN PROTECTED ROUTES
router.get("/dashboard", protect, adminOnly, admin.getDashboard);
router.get("/users", protect, adminOnly, admin.getUsers);
router.get("/students", protect, adminOnly, admin.getStudents);
router.post("/users", protect, adminOnly, admin.createUser);
router.put("/users/:id", protect, adminOnly, admin.updateUser);
router.delete("/users/:id", protect, adminOnly, admin.deleteUser);

// ✅ BUG 3 FIX: Toggle Active/Deactive
router.put("/users/:id/toggle-status", protect, adminOnly, admin.toggleUserStatus);

router.get("/analytics", protect, adminOnly, admin.getAnalytics);

module.exports = router;