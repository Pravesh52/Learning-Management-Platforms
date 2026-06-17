const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  timing: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  // ===== BUG 4 FIX: New fields =====
  batch: {
    type: String,
    default: ""
  },
  className: {
    type: String,
    default: ""
  },
  teacherName: {
    type: String,
    default: ""
  },
  // ===== BUG 1 FIX: sentToUI flag in DB =====
  sentToUI: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports =
  mongoose.models.Course || mongoose.model("Course", courseSchema);