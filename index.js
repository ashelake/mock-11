const express = require("express");
var cors = require("cors");
const { connection } = require("./config/db");
const { UserModel } = require("./modal/User.modal");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { userData } = require("./Routes/user.Routes");

require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  console.log("Homepage");
  res.send("Homepage");
});

app.post("/signup", async (req, res) => {
  console.log("signup");
  const { email, password } = req.body;
  bcrypt.hash(password, 5, async function (err, hash) {
    const new_user = new UserModel({
      email,
      password: hash,
    });
    await new_user.save();
    res.send("Sign up Successfull");
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const login_user = await UserModel.findOne({ email });
  let hashpass = login_user.password;
  console.log(password);
  bcrypt.compare(password, hashpass, async function (err, result) {
    if (result) {
      const user = await UserModel.findOne({ email, password: hashpass });
      const token = jwt.sign({ email: email }, "abc", { expiresIn: "1h" });
      res.send({ msg: "Logged in", token: token });
    } else {
      res.send("Something Wrong");
    }
  });
});
app.use("/dashboard", userData);
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Listining to port", process.env.PORT);
  } catch (err) {
    console.log("Error in Connectiong DB");
    console.log(err);
  }
});
