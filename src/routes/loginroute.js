const express = require("express");

const RegisterallController = require("../Controllers/usercontroller");

const router = express.Router();
// <------------------------Userapi--------------------------------------->

// Route for creating a user
router.post("/", RegisterallController.login);

module.exports = router;
