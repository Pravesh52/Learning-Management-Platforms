const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// ✅ FIX: Controller ko properly import karo
const pdfController = require("../controllers/pdfController");

// ================= MULTER STORAGE =================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/"); // ✅ server.js ke static folder se match karta hai
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// ✅ FIX: Sirf PDF files allow karo
const uploads = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"), false);
    }
    cb(null, true);
  },
});

// ================= UPLOAD PDF ROUTE =================
// ✅ FIX: Controller function use karo
router.post("/upload", uploads.single("pdf"), pdfController.uploadPdf);

// ================= GET ALL PDFS ROUTE =================
// ✅ FIX: Controller function use karo
router.get("/", pdfController.getAllPdf);

module.exports = router;