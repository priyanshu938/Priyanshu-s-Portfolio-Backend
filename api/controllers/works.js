const mongoose = require("mongoose");
const Work = require("../models/works");

exports.get_all_works = (req, res, next) => {
  Work.find()
    .select("_id name image description url")
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

exports.add_work = (req, res, next) => {
  const work = new Work({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    url: req.body.url,
  });
  work
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Work added successfully1",
        createdWork: {
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

exports.edit_work = (req, res, next) => {
  Work.updateOne(
    { _id: req.params.workId },
    {
      $set: {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        url: req.body.url,
      },
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Work updated successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.delete_work = (req, res, next) => {
  Work.remove({ _id: req.params.workId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Work Deleted!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
