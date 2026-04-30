// controllers/courseController.js

const Course = require("../models/Course");

// ✅ CREATE COURSE
exports.createCourse = async (req, res) => {
  try {
    const { title, timing, price, status } = req.body;

    // validation
    if (!title || !timing || !price) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newCourse = new Course({
      title,
      timing,
      price: Number(price), // 🔥 important
      status,
    });

    await newCourse.save();

    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET COURSES
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE
exports.updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};