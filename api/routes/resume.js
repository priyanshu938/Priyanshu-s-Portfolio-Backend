const express = require("express");
const router = express.Router();
const check_auth = require("../middleware/check_auth");

const ResumeController = require("../controllers/resume");

router.get("/getResume", ResumeController.get_resume);
router.post("/addResume", check_auth, ResumeController.add_resume);
router.patch("/editResume/:resumeId", check_auth, ResumeController.edit_resume);


module.exports = router;
