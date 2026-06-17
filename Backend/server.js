const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
console.log("SERVER FILE RUNNING");

// ✅ Auto create upload folders
if (!fs.existsSync("upload")) fs.mkdirSync("upload");
if (!fs.existsSync("upload/photos")) fs.mkdirSync("upload/photos");

// ✅ CORS
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://learning-management-platforms.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use("/upload", express.static(path.join(__dirname, "upload")));

// ✅ ROUTES
app.use("/api/admin",       require("./routes/adminRoutes"));
app.use("/api/courses",     require("./routes/courseRoutes"));
app.use("/api/auth",        require("./routes/authRoutes"));
app.use("/api/pdfs",        require("./routes/pdfRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/enrollments", require("./routes/enrollmentRoutes")); // ✅ NEW

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

app.listen(5000, () => console.log("✅ Server running on port 5000"));