const express = require("express");
const router = express.Router();
const check_auth = require("../middleware/check_auth");

const ContactController = require("../controllers/contact");

router.get("/getAllContacts",check_auth,ContactController.get_all_contacts);

router.post("/sendMessage", ContactController.send_message);

module.exports = router;
