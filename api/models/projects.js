const mongoose = require("mongoose");

//Creating Projects Schema
const projectsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  githubLink: { type: String },
  liveProjectLink: { type: String},
  youtubeVideoLink: { type: String },
});

module.exports = mongoose.model("Project", projectsSchema);
