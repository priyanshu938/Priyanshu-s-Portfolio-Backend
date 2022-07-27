const mongoose = require("mongoose");

//Creating Skills Schema
const skillsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  skill: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Skill", skillsSchema);
