const express = require("express");

const RegisterallController = require("../Controllers/authcontroller");

const router = express.Router();
// <------------------------Userapi--------------------------------------->
// Route for getting all users
router.post("/", RegisterallController.register);

module.exports = router;
