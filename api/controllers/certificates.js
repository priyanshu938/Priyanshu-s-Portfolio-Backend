const mongoose = require("mongoose");
const Certificate = require("../models/certificates");

exports.get_all_certificates = (req, res, next) => {
  Certificate.find()
    .select("_id name image description link")
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

exports.get_all_certificates_dashboard = (req, res, next) => {
  Certificate.find()
    .sort({ _id: -1 })
    .select("_id name image description link")
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

exports.add_certificate = (req, res, next) => {
  const certificate = new Certificate({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    link: req.body.link,
  });
  certificate
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Certificate added successfully!",
        createdCertificate: {
          _id: result._id,
          name: result.name,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.edit_certificate = (req, res, next) => {
  Certificate.updateOne(
    { _id: req.params.certificateId },
    {
      $set: {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        link: req.body.link,
      },
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Certificate updated successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.delete_certificate = (req, res, next) => {
  Certificate.remove({ _id: req.params.certificateId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Certificate Deleted!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
