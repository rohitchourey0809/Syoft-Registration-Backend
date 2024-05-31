const express = require("express");

const UserallController = require("../Controllers/usercontroller");

const router = express.Router();
// <------------------------Userapi--------------------------------------->
// Route for getting all users
router.get("/", UserallController.getAllUsers);

// Route for creating a user
router.post("/", UserallController.createUser);

module.exports = router;
