const express = require("express");
const router = express.Router();
const check_auth = require("../middleware/check_auth");

//import user controller
const UserController = require("../controllers/user");

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

module.exports = router;
