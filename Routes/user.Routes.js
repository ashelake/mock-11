const { Router } = require("express");
const express = require("express");
const { UserModel } = require("../modal/User.modal");
const { UserData } = require("../modal/UserData.modal");
var jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth");
const userData = Router();


userData.get("/", auth, (req, res) => {
  res.send("Private Page");
});

userData.post("/post", auth, async (req, res) => {
  await UserData.insertMany(req.body);
  console.log(req.body);
  res.send("Data");
});

// userData.delete("/product/delete", auth, async (req, res) => {
//   console.log(req.body);
//   let fordelete = req.body;
//   await UserData.deleteOne(fordelete);
//   res.send("Data");
// });

// userData.patch("/product/patch/:title", auth, async (req, res) => {
//   console.log(req.body);
//   let title = req.body;
//   await UserData.updateOne(
//     { Title: req.params.title },
//     { $set: { Title: title.Title } }
//   );
//   console.log(req.body);
//   res.send("Data");
// });
module.exports = { userData };