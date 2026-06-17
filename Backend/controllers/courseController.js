const Course = require("../models/course");

// ✅ CREATE COURSE (BUG 4 FIX: batch, className, teacherName add kiya)
exports.createCourse = async (req, res) => {
  try {
    const { title, timing, price, status, batch, className, teacherName } = req.body;

    if (!title || !timing || !price) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newCourse = new Course({
      title,
      timing,
      price: Number(price),
      status,
      batch: batch || "",
      className: className || "",
      teacherName: teacherName || "",
      sentToUI: false,
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET ALL COURSES
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET ONLY PUBLISHED + SENT TO UI COURSES (Student ke liye)
exports.getPublicCourses = async (req, res) => {
  try {
    const courses = await Course.find({ status: "published", sentToUI: true }).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE COURSE
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

// ✅ BUG 1 FIX: SEND TO UI / REMOVE FROM UI (DB me save hoga ab localStorage nahi)
exports.toggleSendToUI = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.sentToUI = !course.sentToUI;
    await course.save();

    res.json({
      message: course.sentToUI ? "Course sent to UI" : "Course removed from UI",
      sentToUI: course.sentToUI,
      course,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE COURSE
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};