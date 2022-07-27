const mongoose = require("mongoose");
const Resume = require("../models/resume");

exports.get_resume = (req, res, next) => {
  Resume.find()
    .select("_id link")
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
exports.add_resume = (req, res, next) => {
  const resume = new Resume({
    _id: new mongoose.Types.ObjectId(),
    link: req.body.link,
  });
  resume
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Resume added successfully",
        createdResume: {
          _id: result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.edit_resume = (req, res, next) => {
  Resume.updateOne(
    { _id: req.params.resumeId },
    { $set: { link: req.body.link } }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Resume updated successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.delete_resume = (req, res, next) => {
  Resume.remove({ _id: req.params.resumeId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Resume Deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
