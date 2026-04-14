const express = require("express");
const router = express.Router();
const admin = require("../controllers/adminController");

router.get("/dashboard", admin.getDashboard);

// USERS CRUD
router.get("/users", admin.getUsers);
router.post("/users", admin.createUser);
router.put("/users/:id", admin.updateUser);
router.delete("/users/:id", admin.deleteUser);

router.get("/analytics", admin.getAnalytics);
module.exports = router;