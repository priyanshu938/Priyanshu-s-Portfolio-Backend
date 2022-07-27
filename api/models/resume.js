const mongoose = require("mongoose");

//Creating Resume Schema
const resumeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  link: { type: String, required: true },
});

module.exports = mongoose.model("Resume", resumeSchema);
