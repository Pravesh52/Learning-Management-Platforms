const express = require("express");
const router = express.Router();
const admin = require("../controllers/adminController");

// ✅ middleware import
const { protect, adminOnly } = require("../middleware/authMiddleware");

// 🔒 ADMIN PROTECTED ROUTES
router.get("/dashboard", protect, adminOnly, admin.getDashboard);

router.get("/users", protect, adminOnly, admin.getUsers);
router.post("/users", protect, adminOnly, admin.createUser);
router.put("/users/:id", protect, adminOnly, admin.updateUser);
router.delete("/users/:id", protect, adminOnly, admin.deleteUser);

router.get("/analytics", protect, adminOnly, admin.getAnalytics);

module.exports = router;