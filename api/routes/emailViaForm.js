const express = require("express");
const router = express.Router();

const EmailViaFormController = require("../controllers/emailViaForm");
const check_auth = require("../middleware/check_auth");

//for uploading files ,use multer,
const multer = require("multer");

//if folder does not exists than make it
var fs = require("fs");
var dir = "./email_attachments";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

//storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./email_attachments"),
  filename: (req, file, cb) => cb(null, Date.now() + file.originalname),
});

//upload configuration
const upload = multer({
  storage: storage,
});

router.post("/sendEmail", check_auth, EmailViaFormController.sendEmail);
router.get(
  "/getSavedEmailContacts",
  check_auth,
  EmailViaFormController.getSavedEmailContacts
);
router.post(
  "/addEmailContact",
  check_auth,
  EmailViaFormController.addEmailContact
);
router.delete(
  "/deleteEmailContact/:email",
  check_auth,
  EmailViaFormController.deleteEmailContact
);
router.post(
  "/addEmailAttachments",
  check_auth,
  upload.array("files"),
  EmailViaFormController.addEmailAttachments
);
router.post(
  "/clearAttachments",
  check_auth,
  EmailViaFormController.clearAttachments
);
module.exports = router;
