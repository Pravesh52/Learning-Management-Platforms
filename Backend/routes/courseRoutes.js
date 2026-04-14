const express = require("express");
const router = express.Router();
const course = require("../controllers/courseController");

router.get("/", course.getCourses);
router.post("/", course.createCourse);
router.put("/:id", course.updateCourse);
router.delete("/:id", course.deleteCourse);

module.exports = router;