const express = require("express");
var cors = require("cors");
const { connection } = require("./config/db");

const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");


require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  console.log("Homepage");
  res.send("Homepage");
});


app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Listining to port", process.env.PORT);
  } catch (err) {
    console.log("Error in Connectiong DB");
    console.log(err);
  }
});
