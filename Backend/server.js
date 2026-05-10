// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // routes
// app.use("/api/admin", require("./routes/adminRoutes"));
// app.use("/api/courses", require("./routes/courseRoutes"));
// app.use("/api/auth", require("./routes/authRoutes"));
// // app.use("/api/admin", require("./routes/adminRoutes"));
// // DB connect
// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log(err));

// // server
// app.listen(5000, () => console.log("Server running on port 5000"));


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// /* ================= PDF STATIC FOLDER ================= */
// app.use("/uploads", express.static("uploads"));

// /* ================= ROUTES ================= */
// app.use("/api/admin", require("./routes/adminRoutes"));
// app.use("/api/courses", require("./routes/courseRoutes"));
// app.use("/api/auth", require("./routes/authRoutes"));

// /* ================= PDF ROUTE ================= */
// app.use("/api/pdfs", require("./routes/pdfRoutes"));

// /* ================= DB CONNECT ================= */
// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log(err));

// /* ================= SERVER ================= */
// app.listen(5000, () => console.log("Server running on port 5000"));

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");

// require("dotenv").config();

// const app = express();

// // Ye temporarily add karo server.js mein
// console.log("PDF Routes loading...");
// const pdfRoutes = require("./routes/pdfRoutes");
// console.log("PDF Routes loaded:", pdfRoutes);

// app.use("/api/pdfs", pdfRoutes);


// // ================= MIDDLEWARE =================
// app.use(cors());

// app.use(express.json());


// // ================= STATIC FOLDER =================
// app.use(
//   "/upload",
//   express.static(path.join(__dirname, "upload"))
// );


// // ================= ROUTES =================
// app.use("/api/admin", require("./routes/adminRoutes"));

// app.use("/api/courses", require("./routes/courseRoutes"));

// app.use("/api/auth", require("./routes/authRoutes"));
// // console.log(require("./routes/pdfRoutes"));
// app.use("/api/pdfs", require("./routes/pdfRoutes"));


// // ================= DATABASE =================
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() =>
//     console.log("MongoDB Connected")
//   )
//   .catch((err) =>
//     console.log(err)
//   );


// // ================= SERVER =================
// app.listen(5000, () =>
//   console.log("Server running on port 5000")
// );

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const fs = require("fs");

// ================= AUTO CREATE UPLOAD FOLDER =================
if (!fs.existsSync("upload")) {
  fs.mkdirSync("upload");
  console.log("upload/ folder created");
}

// ✅ CORS Fix
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

app.use("/upload", express.static(path.join(__dirname, "upload")));

app.use("/api/admin",   require("./routes/adminRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/auth",    require("./routes/authRoutes"));
app.use("/api/pdfs",    require("./routes/pdfRoutes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));