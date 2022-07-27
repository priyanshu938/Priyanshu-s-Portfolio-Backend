const express = require("express");
const router = express.Router();
const check_auth = require("../middleware/check_auth");

const CertificatesController = require("../controllers/certificates");

router.get("/getAllCertificates", CertificatesController.get_all_certificates);

router.post("/addCertificate", check_auth, CertificatesController.add_certificate);

router.patch("/editCertificate/:certificateId", check_auth, CertificatesController.edit_certificate);

router.delete("/deleteCertificate/:certificateId", check_auth, CertificatesController.delete_certificate);

module.exports = router;
