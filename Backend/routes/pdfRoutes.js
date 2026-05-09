const express = require("express");

const router = express.Router();

const multer = require("multer");

const path = require("path");

const PDF = require("../models/pdf");


// ================= MULTER STORAGE =================

const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, "uploads/");

  },

  filename: function (req, file, cb) {

    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );

  },

});

const upload = multer({ storage });


// ================= UPLOAD PDF =================

router.post(
  "/upload",
  upload.single("pdf"),
  async (req, res) => {

    try {

      const newPDF = new PDF({

        title: req.body.title,

        file: req.file.filename,

      });

      await newPDF.save();

      res.status(201).json({
        success: true,
        message: "PDF Uploaded",
        pdf: newPDF,
      });

    } catch (error) {

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