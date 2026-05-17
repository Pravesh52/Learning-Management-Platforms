const Notification = require("../models/Notification");


// ===================== SEND NOTIFICATION =====================

const sendNotification = async (req, res) => {

  const { subject, message } = req.body;

  // Validation
  if (!subject || !message) {
    return res.status(400).json({
      success: false,
      message: "Subject aur Message dono required hain",
    });
  }

  try {

    const notification = await Notification.create({
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Notification successfully send ho gayi",
      data: notification,
    });

  } catch (error) {

    console.error("Send Notification Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error - Notification send nahi hui",
    });
  }
};


// ===================== GET ALL NOTIFICATIONS =====================

const getNotifications = async (req, res) => {

  try {

    // Sabse nayi pehle aaye (newest first)
    const notifications = await Notification.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: notifications,
    });

  } catch (error) {

    console.error("Get Notifications Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error - Notifications fetch nahi hui",
    });
  }
};


// ===================== DELETE NOTIFICATION =====================

const deleteNotification = async (req, res) => {

  const { id } = req.params;

  try {

    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification nahi mili",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification delete ho gayi",
    });

  } catch (error) {

    console.error("Delete Notification Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error - Delete nahi hua",
    });
  }
};


module.exports = {
  sendNotification,
  getNotifications,
  deleteNotification,
};