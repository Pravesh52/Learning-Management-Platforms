const User = require("../models/user");
const Course = require("../models/course");

// DASHBOARD
exports.getDashboard = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const students = await User.countDocuments({ role: "student" });
    const courses = await Course.countDocuments();

    res.json({
      users,
      students,
      courses,
      revenue: 15000,
      activities: [
        "New student registered",
        "Course React added",
        "Admin logged in"
      ]
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// USERS
exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};


// GRAPH DATA
exports.getAnalytics = async (req, res) => {
  try {
    const User = require("../models/user");
    const Course = require("../models/course");

    // 🔹 Monthly user growth
    const users = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          users: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // 🔹 Course performance (dummy progress)
    const courses = await Course.find();

    const courseStats = courses.map(c => ({
      name: c.title,
      students: Math.floor(Math.random() * 100) + 10 // demo data
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