// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     enum: ["student", "instructor"],
//     default: "student"
//   }
// }, { timestamps: true });

// // hash password
// userSchema.pre("save", async function() {
//   if (!this.isModified("password")) return;

//   this.password = await bcrypt.hash(this.password, 10);
// });

// module.exports = mongoose.model("User", userSchema);


const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["student", "instructor", "admin"], // ✅ admin added
    default: "student"
  }
}, { timestamps: true });

// 🔐 hash password
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next(); // ✅ important
});

module.exports = mongoose.model("User", userSchema);