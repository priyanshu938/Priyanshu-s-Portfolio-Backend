const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  otp: String,
  createdAt: Date,
  expiredAt: Date,
});

module.exports = mongoose.model("OTP", otpSchema);
