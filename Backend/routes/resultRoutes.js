const express = require("express");
const router = express.Router();
const result = require("../controllers/resultController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// ===== ADMIN ROUTES =====
router.post("/", protect, adminOnly, result.createResult);
router.get("/student/:studentId", protect, adminOnly, result.getResultsByStudent); // Admin — sab results
router.put("/:id", protect, adminOnly, result.updateResult);
router.delete("/:id", protect, adminOnly, result.deleteResult);
router.put("/:id/send", protect, adminOnly, result.sendResult);
router.put("/:id/unsend", protect, adminOnly, result.unsendResult);

// ===== STUDENT ROUTE =====
router.get("/my/:studentId", protect, result.getMyResults); // Student — sirf sent wale

module.exports = router;