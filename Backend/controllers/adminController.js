const User = require("../models/user");
const Course = require("../models/course");


// ================= DASHBOARD =================
exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalTeachers = await User.countDocuments({ role: "teacher" });
    const totalCourses = await Course.countDocuments();

    res.json({
      totalUsers,
      totalStudents,
      totalTeachers,
      totalCourses
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= GET ALL USERS =================
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= GET ONLY STUDENTS =================
// exports.getStudents = async (req, res) => {
//   try {
//     const students = await User.find({ role: "student" })
//       .select("name email");

//     res.json(students);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
      .select("name email mobilenumber"); 

    res.json(students);

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
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
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


// ================= ANALYTICS =================
exports.getAnalytics = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          users: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    const courses = await Course.find();

    const courseStats = courses.map(c => ({
      name: c.title,
      students: Math.floor(Math.random() * 100) + 10
    }));

    res.json({
      userGrowth: users.map(u => ({
        month: u._id,
        users: u.users
      })),
      coursePerformance: courseStats
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};