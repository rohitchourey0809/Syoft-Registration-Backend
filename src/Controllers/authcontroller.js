require("dotenv").config();
const User = require("../Models/usermodels");
let jwt = require("jsonwebtoken");

const generateToken = (userdata) => {
  console.log("JWT_SECRET_KEY", `${process.env.JWT_SECRET_KEY}`);
  return jwt.sign({ userdata }, `${process.env.JWT_SECRET_KEY}`);
};

exports.register = async (req, res) => {
  try {
    const { FIRSTNAME, LASTNAME, EMAIL, PASSWORD, MOBILE, ROLE } = req.body;

    // Validate incoming data
    if (!FIRSTNAME || !LASTNAME || !EMAIL || !PASSWORD || !MOBILE || !ROLE) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const userdata = await User.findOne({ EMAIL });
    console.log("userdata", userdata);

    if (userdata) {
      return res.status(400).send({ message: "Email already exists" });
    }

    const userRegister = await User.create({
      FIRSTNAME,
      LASTNAME,
      EMAIL,
      PASSWORD,
      MOBILE,
      ROLE,
    });
    console.log("userRegister", userRegister);

    console.log("jwt token", `${process.env.JWT_SECRET_KEY}`);

    let token = jwt.sign({ userRegister }, `${process.env.JWT_SECRET_KEY}`);

    return res.status(200).send({ userRegister, token });
  } catch (err) {
    console.log("Error during registration:", err.message);
    return res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { EMAIL, PASSWORD } = req.body;

    // Validate incoming data
    if (!EMAIL || !PASSWORD) {
      return res
        .status(400)
        .send({ message: "Email and password are required" });
    }

    const userdata = await User.findOne({ EMAIL });
    console.log("userdata", userdata);

    if (!userdata) {
      return res
        .status(400)
        .send({ message: "Email and password do not match!" });
    }

    console.log("password", PASSWORD);
    const match = userdata.checkPassword(PASSWORD);

    if (!match) {
      return res
        .status(400)
        .send({ message: "Email and password do not match!" });
    }

    // If it matches
    const token = generateToken(userdata);
    return res.status(200).send({ userdata, token });
  } catch (error) {
    console.log("Error during login:", error.message);
    return res.status(500).send({ message: error.message });
  }
};
