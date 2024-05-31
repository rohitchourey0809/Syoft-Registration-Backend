const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userschema = new mongoose.Schema(
  {
    FIRSTNAME: { type: String, required: true },
    LASTNAME: { type: String, required: true },
    EMAIL: { type: String, required: true },
    PASSWORD: { type: String, required: true },
    ROLE: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//===================before saving pasword convert is descripted form===>
//bcrypt
//pre

userschema.pre("save", function (next) {
  const hash = bcrypt.hashSync(this.PASSWORD, 8);
  this.PASSWORD = hash;
  return next();
});

//    <-------------------encrypt----------->
userschema.methods.checkPassword = function (PASSWORD) {
  return bcrypt.compareSync(PASSWORD, this.PASSWORD);
};

//    <==================encrypt=============>
const User = mongoose.model("user", userschema);

module.exports = User;
