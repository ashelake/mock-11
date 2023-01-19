const express = require("express");
const { UserModel } = require("../modal/User.modal");
const { UserData } = require("../modal/UserData.modal");
var jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  try {
    var decoded = jwt.verify(token, "abc");
    const { email } = decoded;
    const Data = await UserData.find();
    console.log("auth completed");
    next();
    // res.send("Logged In");
  } catch (err) {
    console.log(err);
    res.send("Please log");
  }
};
module.exports = { auth };