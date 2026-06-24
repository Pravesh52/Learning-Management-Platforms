const Result = require("../models/result");
const User = require("../models/user");

// ===== CREATE RESULT (Admin) =====
exports.createResult = async (req, res) => {
  try {
    const {
      studentId, testType, testName,
      marksObtained, totalMarks, remarks, date, sendNow,
    } = req.body;

    if (!studentId || !testType || !testName || marksObtained === undefined || !totalMarks) {
      return res.status(400).json({ message: "Saari required fields bharo" });
    }

    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const result = await Result.create({
      student: studentId,
      studentName: student.name,
      enrollmentNumber: student.enrollmentNumber || "N/A",
      course: student.enrolledCourse,
      courseName: student.enrolledCourseName || "",
      testType,
      testName,
      marksObtained: Number(marksObtained),
      totalMarks: Number(totalMarks),
      remarks: remarks || "",
      date: date || new Date(),
      sentToStudent: sendNow === true || sendNow === "true",
    });

    res.status(201).json({ message: "Result created successfully", result });
  } catch (error) {
    console.log("RESULT CREATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ===== GET ALL RESULTS FOR A STUDENT (Admin view - sab dikhe) =====
exports.getResultsByStudent = async (req, res) => {
  try {
    const results = await Result.find({ student: req.params.studentId }).sort({ createdAt: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===== GET MY RESULTS (Student view - sirf sent wale) =====
exports.getMyResults = async (req, res) => {
  try {
    const results = await Result.find({
      student: req.params.studentId,
      sentToStudent: true,
    }).sort({ createdAt: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===== UPDATE RESULT (Admin - Edit) =====
exports.updateResult = async (req, res) => {
  try {
    const { testType, testName, marksObtained, totalMarks, remarks, date } = req.body;

    const result = await Result.findById(req.params.id);
    if (!result) return res.status(404).json({ message: "Result not found" });

    if (testType) result.testType = testType;
    if (testName) result.testName = testName;
    if (marksObtained !== undefined) result.marksObtained = Number(marksObtained);
    if (totalMarks) result.totalMarks = Number(totalMarks);
    if (remarks !== undefined) result.remarks = remarks;
    if (date) result.date = date;

    await result.save(); // ✅ pre-save hook se percentage auto-recalculate hoga

    res.json({ message: "Result updated successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===== DELETE RESULT (Admin) =====
exports.deleteResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Result not found" });
    res.json({ message: "Result deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===== SEND RESULT TO STUDENT (One click) =====
exports.sendResult = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);
    if (!result) return res.status(404).json({ message: "Result not found" });

    result.sentToStudent = true;
    await result.save();

    res.json({ message: `Result "${result.testName}" sent to ${result.studentName}!`, result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===== UNSEND / HIDE RESULT FROM STUDENT =====
exports.unsendResult = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);
    if (!result) return res.status(404).json({ message: "Result not found" });

    result.sentToStudent = false;
    await result.save();

    res.json({ message: `Result hidden from student`, result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};