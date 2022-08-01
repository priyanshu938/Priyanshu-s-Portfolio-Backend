const mongoose = require("mongoose");
const Skill = require("../models/skills");

exports.get_all_skills = (req, res, next) => {
  Skill.find()
    .select("_id skill image")
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

exports.add_skill = (req, res, next) => {
  const skill = new Skill({
    _id: new mongoose.Types.ObjectId(),
    skill: req.body.skill,
    image: req.body.image,
  });
  skill
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Skill added successfully!",
        createdSkill: {
          _id: result._id,
          skill: result.skill,
          image: result.image,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.edit_skill = (req, res, next) => {
  Skill.updateOne(
    { _id: req.params.skillId },
    { $set: { skill: req.body.skill, image: req.body.image } }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Skill updated successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.delete_skill = (req, res, next) => {
  Skill.remove({ _id: req.params.skillId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Skill Deleted!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
