const express = require("express");
const router = express.Router();
const enrollment = require("../controllers/enrollmentController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Student routes
router.post("/", protect, enrollment.upload.single("photo"), enrollment.createEnrollment);
router.get("/check/:studentId/:courseId", protect, enrollment.checkEnrollment);
router.get("/student/:studentId", protect, enrollment.getStudentEnrollments);
// Test route — top pe add karo
router.get("/test-email", enrollment.testEmail);
// Admin routes
router.get("/all", protect, adminOnly, enrollment.getAllEnrollments);
router.get("/detail/:id", protect, adminOnly, enrollment.getEnrollmentDetail);

module.exports = router;