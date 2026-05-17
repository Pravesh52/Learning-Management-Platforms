const express = require("express");

const router = express.Router();
console.log("NOTIFICATION ROUTE LOADED");
const {
  sendNotification,
  getNotifications,
  deleteNotification,
} = require("../controllers/notificationController");

router.get("/test",(req,res)=>{

   res.send("Notification Working");

});
// ADMIN - Notification bhejo
router.post("/send", sendNotification);

// STUDENT + ADMIN - Saari notifications lo
router.get("/all", getNotifications);

// ADMIN - Notification delete karo
router.delete("/delete/:id", deleteNotification);


module.exports = router;