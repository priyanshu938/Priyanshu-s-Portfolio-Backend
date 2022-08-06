const mongoose = require("mongoose");

//Creating Videos Schema
const videosSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
});

module.exports = mongoose.model("Video", videosSchema);
