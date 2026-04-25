// const mongoose = require("mongoose");

// const adminSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// }, { timestamps: true });

// module.exports = mongoose.model("Admin", adminSchema);


const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String
});

module.exports = mongoose.model("Admin", adminSchema);