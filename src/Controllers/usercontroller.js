const User = require("../Models/usermodels");


const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find();
    console.log(userData);
    return res.status(200).send({ userData });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

// Define the controller function for creating a user
const createUser = async (req, res) => {
  try {
    const userPost = await User.create(req.body);
    return res.status(200).send(userPost);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

// Export the router with the defined routes
module.exports = {
  getAllUsers,
  createUser,
};
