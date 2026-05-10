const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    course: {
      type: String,
      required: false,  // ✅ CHANGED: Made optional
      default: "General", // ✅ ADDED: Default value
    },

    pdf: {
      type: String,
      required: true,
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