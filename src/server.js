require("dotenv").config();
const express = require("express");
const connect = require("./Config/db");
const Userroutes = require("./routes/userroutes");
const Productroutes = require("./routes/productroutes");
const Registerroutes = require("./routes/registerroute");
const Loginroutes = require("./routes/loginroute");

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

app.listen(PORT, async () => {
  try {
    await connect();
    console.log("Connected to the database");
    console.log(`Server is running on port ${"http://localhost:" + PORT}`);
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
});
