require("dotenv").config();
const User = require("../Models/usermodels");
let jwt = require("jsonwebtoken");

const generateToken = (userdata) => {
  console.log("JWT_SECRET_KEY", `${process.env.JWT_SECRET_KEY}`);
  return jwt.sign({ userdata }, `${process.env.JWT_SECRET_KEY}`);
};

exports.register = async (req, res) => {
  try {
    const userdata = await User.findOne({ EMAIL: req.body.EMAIL });
    console.log(userdata);

    if (userdata) {
      return res.status(500).send({ message: "Email exist " });
    }
    const userRegister = await User.create(req.body);
    console.log("userRegister", userRegister);

    console.log("jwt token", `${process.env.JWT_SECRET_KEY}`);
    // <===============token=========>

    let token = jwt.sign({ userRegister }, `${process.env.JWT_SECRET_KEY}`);

    return res.status(400).send({ userRegister, token });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const userdata = await User.findOne({ EMAIL: req.body.EMAIL });
    console.log("userdata", userdata);

    if (!userdata) {
      return res.status(500).send({ message: "Email and passowrd not match!" });
    }
    console.log("password", req.body.PASSWORD);
    const match = userdata.checkPassword(req.body.PASSWORD);

    if (!match) {
      return res.status(500).send({ message: "Email and passowrd not match!" });
    }

    // if it matches
    const token = generateToken(userdata);
    return res.status(200).send({ userdata, token });
    // console.log("token chal ra h login me")
    // var token = jwt.sign(userdata, `${process.env.JWT_SECRET_KEY}`);
    // return res.status(200).send({userdata,token});
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: error.message });
  }
};





