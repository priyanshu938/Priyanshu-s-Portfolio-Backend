const express = require("express");
const router = express.Router();

const ChangePasswordController = require("../controllers/changePassword");

router.post("/sendOtp", ChangePasswordController.sendOtp);
router.post("/verifyOtp", ChangePasswordController.verifyOtp);
router.post("/changePassword", ChangePasswordController.changePassword);
module.exports = router;
