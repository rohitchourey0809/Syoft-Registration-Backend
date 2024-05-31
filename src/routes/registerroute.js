const express = require("express");

const RegisterallController = require("../Controllers/authcontroller");

const router = express.Router();
// <------------------------Userapi--------------------------------------->
// Route for getting all users
router.post("/", RegisterallController.register);

// Route for creating a user
router.post("/", RegisterallController.login);

module.exports = router;
