
const mongoose = require('mongoose');
const express = require("express");
;
const Userroutes = require("./routes/userroutes");
const Productroutes = require("./routes/productroutes");
const Registerroutes = require("./routes/registerroute");
const Loginroutes = require("./routes/loginroute");
require("dotenv").config();

// const { register, login } = require("./Controllers/authcontroller");

const app = express();
const cors = require("cors");

app.use(
  cors({
    credentials: true,
  })
);
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/users", Userroutes);
app.use("/products", Productroutes);
app.use("/register", Registerroutes);
app.use("/login", Loginroutes);

mongoose
  .connect(
    process.env.MONGO_URI ?? "mongodb://localhost:27017/Syofrt-Regitration"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
