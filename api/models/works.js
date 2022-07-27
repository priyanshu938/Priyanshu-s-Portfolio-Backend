const mongoose = require("mongoose");

//Creating Works Schema
const workSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
});

module.exports = mongoose.model("Work", workSchema);
