const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: false,
      default: "General",
    },
    // ✅ Supabase public URL store hogi (local filename nahi)
    pdf: {
      type: String,
      required: true,
    },
    // ✅ NEW: Send to Students toggle
    sentToStudents: {
      type: Boolean,
      default: false,
    },
    uploadedBy: {
      type: String,
      default: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PDF", pdfSchema);