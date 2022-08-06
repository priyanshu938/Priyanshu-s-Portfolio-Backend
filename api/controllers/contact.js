const mongoose = require("mongoose");
var nodemailer = require("nodemailer");

const Contact = require("../models/contact");

exports.get_all_contacts = (req, res, next) => {
  Contact.find()
    .sort({ _id: -1 })
    .select("_id name email message date time sentAt")
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
      html: `<h1>Hi, ${name}! <br/> Thank you for your response!</h1><br/><h2 style="color:green">We also provide WEB AND APPLICATION DEVELOPMENT services to our clients at very affordable prices.<br/>Feel free to reach out us anytime when needed.</h2><br/><h2>Thank You!<br/>Have a good day!<br/>☺</h2>`,
    };
    var mailOptionsForAdmin = {
      from: process.env.NODEMAILER_EMAIL,
      to: process.env.NODEMAILER_EMAIL,
      subject: "Message received",
      html: `<h1>Name : ${name} </h1><h1>Message : ${message}</h1>`,
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
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  var t = new Date();
  var time = t.toLocaleString("hi-IN", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  date = date + "/" + month + "/" + year;
  const contact = new Contact({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    date: date,
    time: time,
    sentAt: new Date().toISOString(),
  });

  contact
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Message sent!",
        createdContact: {
          _id: result._id,
          name: result.name,
          email: result.email,
          message: result.message,
          date: result.date,
          time: result.time,
          sentAt: result.sentAt,
        },
      });

      sendEmail(req.body.name, req.body.email, req.body.message);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.delete_message = async (req, res, next) => {
  Contact.remove({ _id: req.params.messageId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Message Deleted!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
