const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: String,
  teacher: String,
  category: String,
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft"
  }
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);