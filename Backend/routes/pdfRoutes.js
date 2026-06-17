const express = require("express");
const router = express.Router();
const pdfController = require("../controllers/pdfController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// ✅ Upload — multer ab controller mein hai
router.post("/upload", protect, adminOnly, pdfController.upload.single("pdf"), pdfController.uploadPdf);

// ✅ Admin — saare PDFs dekhe
router.get("/", protect, adminOnly, pdfController.getAllPdf);

// ✅ Students — sirf sent wale PDFs
router.get("/public", pdfController.getPublicPdfs);

// ✅ Send to all students
router.put("/:id/send", protect, adminOnly, pdfController.sendToStudents);

// ✅ Remove from students
router.put("/:id/remove", protect, adminOnly, pdfController.removeFromStudents);

// ✅ Delete PDF (Supabase + DB dono se)
router.delete("/:id", protect, adminOnly, pdfController.deletePdf);

module.exports = router;