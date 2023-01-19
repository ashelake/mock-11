const mongoose = require("mongoose");
const userDataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cat: { type: String, required: true },
  
});

const UserData = mongoose.model("mock-ii-Data", userDataSchema);
module.exports = { UserData };