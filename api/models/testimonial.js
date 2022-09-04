const mongoose = require("mongoose");

const testimonialSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: { type: String, required: true },
  designation: { type: String, required: true },
});

module.exports = mongoose.model("Testimonial", testimonialSchema);
