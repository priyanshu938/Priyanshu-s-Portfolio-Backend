require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Otp = require("../models/otp");

const sendOtp = (email, otp) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
    var mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Otp Verification",
      html: `<p style="font-size:20px">Your One Time Password for My Portfolio Dashboard is <span style="color:green">${otp}</span>.<br/></br/><br/>Your otp is valid for 1 minute only.</p>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.sendOtp = async (req, res, next) => {
  await Otp.deleteMany({});
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user)
        return res.status(200).json({
          message: "User does not exist1",
        });
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      sendOtp(req.body.email, otp);
      bcrypt.hash(otp, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        } else {
          const otp = new Otp({
            _id: new mongoose.Types.ObjectId(),
            otp: hash,
            createdAt: new Date(),
            expiredAt: new Date(Date.now() + 1 * 60 * 1000),
          });
          otp
            .save()
            .then((result) => {
              res.status(201).json({
                otpId: result._id,
                message: "Otp sent successfully",
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({ error: err });
            });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.verifyOtp = async (req, res, next) => {
  Otp.find({ _id: req.body.otpId })
    .exec()
    .then(async (otp) => {
      if (!otp) {
        return res.status(401).json({
          message: "Otp does not exist !",
        });
      } else if (otp[0].expiredAt < new Date()) {
        await Otp.deleteOne({ _id: req.body.otpId });
        return res.status(201).json({
          message: "Otp expired !",
        });
      } else {
        const validOTP = await bcrypt.compare(req.body.otp, otp[0].otp);
        if (validOTP) {
          await Otp.deleteOne({ _id: req.body.otpId });
          return res.status(200).json({
            message: "Otp verified successfully !",
          });
        } else
          return res.status(201).json({
            message: "You have entered wrong otp!",
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.changePassword = async (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user)
        return res.status(401).json({
          message: "User does not exist",
        });
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        } else {
          User.updateOne(
            { email: req.body.email },
            { $set: { password: hash } },
            (err, result) => {
              if (err) {
                return res.status(500).json({
                  error: err,
                });
              } else {
                return res.status(200).json({
                  message: "Password changed successfully",
                });
              }
            }
          );
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
