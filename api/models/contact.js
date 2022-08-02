const mongoose = require("mongoose");

//Creating Contact schema
const contactSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

module.exports = mongoose.model("Contact", contactSchema);
