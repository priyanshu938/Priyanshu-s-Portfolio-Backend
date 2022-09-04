const mongoose = require("mongoose");
const Testimonial = require("../models/testimonial");

exports.get_testimonial = (req, res, next) => {
  Testimonial.find()
    .select("_id  description designation")
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
exports.add_testimonial = (req, res, next) => {
  const testimonial = new Testimonial({
    _id: new mongoose.Types.ObjectId(),
    description: req.body.description,
    designation: req.body.designation,
  });
  testimonial
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Testimonial added successfully",
        createdTestimonial: {
          _id: result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.edit_testimonial = (req, res, next) => {
  Testimonial.updateOne(
    { _id: req.params.testimonialId },
    {
      $set: {
        description: req.body.description,
        designation: req.body.designation,
      },
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Updated successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
