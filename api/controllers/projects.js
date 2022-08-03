const mongoose = require("mongoose");
const Project = require("../models/projects");

exports.get_all_projects = (req, res, next) => {
  Project.find()
    .select(
      "_id image title description githubLink liveProjectLink youtubeVideoLink"
    )
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

exports.get_all_projects_dashboard = (req, res, next) => {
  Project.find()
    .sort({ _id: -1 })
    .select(
      "_id image title description githubLink liveProjectLink youtubeVideoLink"
    )
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
exports.add_project = (req, res, next) => {
  const project = new Project({
    _id: new mongoose.Types.ObjectId(),
    image: req.body.image,
    title: req.body.title,
    description: req.body.description,
    githubLink: req.body.githubLink,
    liveProjectLink: req.body.liveProjectLink,
    youtubeVideoLink: req.body.youtubeVideoLink,
  });
  project
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Project added successfully!",
        createdProject: {
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

exports.edit_project = (req, res, next) => {
  Project.updateOne(
    { _id: req.params.projectId },
    {
      $set: {
        image: req.body.image,
        title: req.body.title,
        description: req.body.description,
        githubLink: req.body.githubLink,
        liveProjectLink: req.body.liveProjectLink,
        youtubeVideoLink: req.body.youtubeVideoLink,
      },
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Project updated successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.delete_project = (req, res, next) => {
  Project.remove({ _id: req.params.projectId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Project Deleted!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
