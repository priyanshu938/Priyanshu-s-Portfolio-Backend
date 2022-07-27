const mongoose = require("mongoose");

//Creating Projects Schema
const certificateSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
});

module.exports = mongoose.model("Certificate", certificateSchema);
