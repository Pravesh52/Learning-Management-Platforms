const User = require("../models/user");
const Course = require("../models/course");
const Enrollment = require("../models/enrollment");

// ================= DASHBOARD =================
exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalTeachers = await User.countDocuments({ role: "teacher" });
    const totalCourses = await Course.countDocuments();
    const totalEnrolled = await Enrollment.countDocuments();

    res.json({ totalUsers, totalStudents, totalTeachers, totalCourses, totalEnrolled });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= GET ALL USERS =================
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email role isActive");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= GET ONLY STUDENTS (with enrollment info) =================
exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
      .select("name email mobilenumber isActive isEnrolled enrolledCourseName createdAt");

    // For each student, get their enrollment form
    const enrollments = await Enrollment.find().select("student _id");
    const enrollmentMap = {};
    enrollments.forEach(e => {
      enrollmentMap[e.student.toString()] = e._id;
    });

    const result = students.map(s => ({
      ...s.toObject(),
      enrollmentFormId: enrollmentMap[s._id.toString()] || null,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= CREATE USER =================
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= UPDATE USER =================
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE USER =================
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= BUG 3 FIX: TOGGLE ACTIVE/DEACTIVE =================
exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      message: user.isActive ? "User activated successfully" : "User deactivated successfully",
      isActive: user.isActive,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= ANALYTICS =================
exports.getAnalytics = async (req, res) => {
  try {
    const users = await User.aggregate([
      { $group: { _id: { $month: "$createdAt" }, users: { $sum: 1 } } },
      { $sort: { "_id": 1 } },
    ]);
    const courses = await Course.find();
    const courseStats = courses.map(c => ({
      name: c.title,
      students: Math.floor(Math.random() * 100) + 10,
    }));
    res.json({
      userGrowth: users.map(u => ({ month: u._id, users: u.users })),
      coursePerformance: courseStats,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};