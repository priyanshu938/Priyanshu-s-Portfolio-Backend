const express = require("express");
const router = express.Router();
const check_auth = require("../middleware/check_auth");

const TestimonialController = require("../controllers/testimonial");

router.get("/getTestimonial", TestimonialController.get_testimonial);

router.post(
  "/addTestimonial",
  check_auth,
  TestimonialController.add_testimonial
);
router.patch(
  "/editTestimonial/:testimonialId",
  check_auth,
  TestimonialController.edit_testimonial
);

module.exports = router;
