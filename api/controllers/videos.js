const mongoose = require("mongoose");
const Video = require("../models/videos");

exports.get_all_videos = (req, res, next) => {
  Video.find()
    .select("_id title description link")
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

exports.get_all_videos_dashboard = (req, res, next) => {
  Video.find()
    .sort({ _id: -1 })
    .select("_id title description link")
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

exports.add_video = (req, res, next) => {
  const video = new Video({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    link: req.body.link,
  });
  video
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Video added successfully!",
        createdVideo: {
          _id: result._id,
          title: result.title,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.edit_video = (req, res, next) => {
  Video.updateOne(
    { _id: req.params.videoId },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
      },
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Video updated successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.delete_video = (req, res, next) => {
  Video.remove({ _id: req.params.videoId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Video deleted successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
