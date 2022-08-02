const mongoose = require("mongoose");
var nodemailer = require("nodemailer");

const Contact = require("../models/contact");

exports.get_all_contacts = (req, res, next) => {
  Contact.find()
    .select("_id name email message ")
    .exec()
    .then((result) => {
      res.status(200).json({
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
const sendEmail = (name, email, message) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
    var mailOptionsForCustomer = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Feedback",
      text: "Thank you for your response!",
    };
    var mailOptionsForAdmin = {
      from: process.env.NODEMAILER_EMAIL,
      to: process.env.NODEMAILER_EMAIL,
      subject: "Message recieved",
      text: `${name} has sent a message.\n\n${message}`,
    };
    transporter.sendMail(mailOptionsForCustomer, function (error, info) {
      if (error) {
        console.log(error);
      }
    });
    transporter.sendMail(mailOptionsForAdmin, function (error, info) {
      if (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.send_message = async (req, res, next) => {
  const contact = new Contact({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  contact
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Message sent!",
        createdContact: {
          _id: result._id,
          name: result.name,
          email: result.email,
          message: result.message,
        },
      });

      sendEmail(req.body.name, req.body.email, req.body.message);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
