const Pdf = require("../models/pdf");

// ================= UPLOAD PDF =================
exports.uploadPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "PDF file is required",
      });
    }

    // ✅ FIX: course field bhi save ho raha hai ab
    const newPdf = new Pdf({
      title: req.body.title,
      pdf: req.file.filename,
      course: req.body.course || "General",
    });

    await newPdf.save();

    res.status(201).json({
      message: "PDF Uploaded Successfully",
      pdf: newPdf,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= GET ALL PDF =================
exports.getAllPdf = async (req, res) => {
  try {
    const pdfs = await Pdf.find().sort({
      createdAt: -1,
    });

    res.status(200).json(pdfs);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};