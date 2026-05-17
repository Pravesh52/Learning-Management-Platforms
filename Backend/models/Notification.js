const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt auto add hoga
  }
);

module.exports = mongoose.model("Notification", notificationSchema);