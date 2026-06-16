

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const fs = require("fs");
console.log("SERVER FILE RUNNING");
// const notificationRoutes =require("./routes/notificationRoutes");
// ================= AUTO CREATE UPLOAD FOLDER =================
if (!fs.existsSync("upload")) {
  fs.mkdirSync("upload");
  console.log("upload/ folder created");
}

// ✅ CORS Fix
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://learning-management-platforms.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// app.use(cors());

app.use(express.json());

app.use("/upload", express.static(path.join(__dirname, "upload")));

app.use("/api/admin",   require("./routes/adminRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/auth",    require("./routes/authRoutes"));
app.use("/api/pdfs",    require("./routes/pdfRoutes"));

app.use("/api/notifications", require("./routes/notificationRoutes"));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));