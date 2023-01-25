require("dotenv").config();
const EmailContacts = require("../models/savedEmailContacts");
var nodemailer = require("nodemailer");
const { readdirSync, rmSync } = require("fs");
var dir = "./email_attachments";
exports.sendEmail = async (req, res, next) => {
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
      to: req.body.email,
      cc: req.body.cc && req.body.cc,
      bcc: req.body.bcc && req.body.bcc,
      subject: req.body.subject,
      html: req.body.html,
      attachments: req.body.attachments,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (!error) {
        res.status(201).json({
          message: "Email sent successfully",
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.getSavedEmailContacts = async (req, res, next) => {
  EmailContacts.find({ userId: req.body.userId })
    .select("email -_id")
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.addEmailContact = async (req, res, next) => {
  const findEmail = await EmailContacts.find({
    email: req.body.email,
  });
  if (findEmail.length > 0) {
    res.status(409).json({
      message: "Email already exists",
    });
  } else {
    const emailContact = await new EmailContacts({
      email: req.body.email,
    });
    await emailContact
      .save()
      .then(() => {
        res.status(201).json({
          message: "Email added successfully",
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
};
exports.addEmailAttachments = async (req, res, next) => {
  var attachments = [];
  for (var i = 0; i < req.files.length; i++) {
    var file = req.files[i];
    var filename = file.filename;
    var path = file.path;
    attachments.push({ filename: filename, path: path });
  }
  res.status(201).json({
    message: "Email attachments added successfully",
    attachments: attachments,
  });
};

exports.clearAttachments = async (req, res, next) => {
  readdirSync(dir).forEach((f) => rmSync(`${dir}/${f}`));
  res.status(201).json({
    message: "Cache cleared successfully!",
  });
};
