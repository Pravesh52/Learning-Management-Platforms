const Pdf = require("../models/pdf");
const { createClient } = require("@supabase/supabase-js");
const multer = require("multer");

// ===== SUPABASE CLIENT =====
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// ===== MULTER — Memory Storage (file disk pe nahi jayegi, seedha Supabase) =====
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype !== "application/pdf") {
    return cb(new Error("Only PDF files are allowed"), false);
  }
  cb(null, true);
};

exports.upload = multer({ storage, fileFilter });

// ================= UPLOAD PDF (Supabase) =================
exports.uploadPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // ✅ Unique filename banao
    const fileName = `${Date.now()}_${req.file.originalname.replace(/\s/g, "_")}`;

    // ✅ Supabase Storage mein upload karo
    const { data, error } = await supabase.storage
      .from("pdfs")
      .upload(fileName, req.file.buffer, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (error) {
      console.log("Supabase upload error:", error);
      return res.status(500).json({ message: "Supabase upload failed: " + error.message });
    }

    // ✅ Public URL lo
    const { data: urlData } = supabase.storage
      .from("pdfs")
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;

    // ✅ MongoDB mein save karo
    const newPdf = new Pdf({
      title: req.body.title,
      course: req.body.course || "General",
      pdf: publicUrl,       // Supabase URL store hogi
      sentToStudents: false, // Default — admin ne abhi send nahi kiya
    });

    await newPdf.save();

    res.status(201).json({
      message: "PDF Uploaded Successfully to Supabase!",
      pdf: newPdf,
    });
  } catch (error) {
    console.log("Upload error:", error);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

// ================= GET ALL PDFs (Admin ke liye — saare) =================
exports.getAllPdf = async (req, res) => {
  try {
    const pdfs = await Pdf.find().sort({ createdAt: -1 });
    res.status(200).json(pdfs);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= GET PUBLIC PDFs (Students ke liye — sirf sent wale) =================
exports.getPublicPdfs = async (req, res) => {
  try {
    const pdfs = await Pdf.find({ sentToStudents: true }).sort({ createdAt: -1 });
    res.status(200).json(pdfs);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= SEND TO ALL STUDENTS =================
exports.sendToStudents = async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);
    if (!pdf) return res.status(404).json({ message: "PDF not found" });

    pdf.sentToStudents = true;
    await pdf.save();

    res.json({ message: `"${pdf.title}" sent to all students!`, pdf });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= REMOVE FROM STUDENTS =================
exports.removeFromStudents = async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);
    if (!pdf) return res.status(404).json({ message: "PDF not found" });

    pdf.sentToStudents = false;
    await pdf.save();

    res.json({ message: `"${pdf.title}" removed from students!`, pdf });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= DELETE PDF =================
exports.deletePdf = async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);
    if (!pdf) return res.status(404).json({ message: "PDF not found" });

    // ✅ Supabase se bhi delete karo
    const fileName = pdf.pdf.split("/").pop(); // URL se filename nikalo
    await supabase.storage.from("pdfs").remove([fileName]);

    await Pdf.findByIdAndDelete(req.params.id);

    res.json({ message: "PDF deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};