const express = require("express");
const router = express.Router();
const check_auth = require("../middleware/check_auth");
const ChatBotController = require("../controllers/chatbot");

router.post("/getResponseFromChatbot",check_auth, ChatBotController.getResponseFromChatbot);

module.exports = router;
