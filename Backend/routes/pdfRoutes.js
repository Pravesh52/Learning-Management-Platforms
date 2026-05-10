const express = require("express");

const router = express.Router();

const multer = require("multer");

const path = require("path");

const PDF = require("../models/pdf");
console.log("PDF ROUTE LOADED");


// ================= MULTER STORAGE =================

const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, "upload/");

  },

  filename: function (req, file, cb) {

    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );

  },

});

const uploads = multer({ storage });


// ================= UPLOAD PDF =================

router.post(
  "/upload",
  uploads.single("pdf"),
  async (req, res) => {

    try {

      const newPDF = new PDF({

        title: req.body.title,

        pdf: req.file.filename,  // ✅ FIXED: Changed from 'file' to 'pdf'

        course: req.body.course || "General",  // ✅ ADDED: Course field with default

      });

      await newPDF.save();

      res.status(201).json({
        success: true,
        message: "PDF Uploaded",
        pdf: newPDF,
      });

    } catch (error) {

      console.log("ERROR:", error);  // ✅ ADDED: Better error logging

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  }
);


// ================= GET ALL PDFS =================

router.get("/", async (req, res) => {

  try {

    const pdfs = await PDF.find().sort({
      createdAt: -1,
    });

    res.json(pdfs);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});



module.exports = router;