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
}, { timestamps: true });

// 🔥 IMPORTANT FIX
module.exports =
  mongoose.models.Course || mongoose.model("Course", courseSchema);