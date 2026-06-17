const express = require("express");
const router = express.Router();
const course = require("../controllers/courseController");

// Public routes
router.get("/", course.getCourses);
router.get("/public", course.getPublicCourses); // ✅ BUG 1 FIX: Student ke liye public courses

// Admin routes
router.post("/", course.createCourse);
router.put("/:id", course.updateCourse);
router.put("/:id/toggle-ui", course.toggleSendToUI); // ✅ BUG 1 FIX: Send/Remove from UI
router.delete("/:id", course.deleteCourse);

module.exports = router;