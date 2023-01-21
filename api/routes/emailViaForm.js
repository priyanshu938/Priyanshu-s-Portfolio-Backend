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

//to allow only specific types of files to accept
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "application/pdf" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype === "application/vnd.ms-powerpoint" ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "audio/mpeg"
  )
    cb(null, true);
  else cb(null, false);
};

//upload configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 52428800 }, //this limit is equal to 50mb in binary
  fileFilter: fileFilter,
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
router.post(
  "/addEmailAttachments",
  check_auth,
  upload.array("files"),
  EmailViaFormController.addEmailAttachments
);
router.post("/clearAttachments", check_auth, EmailViaFormController.clearAttachments);
module.exports = router;
