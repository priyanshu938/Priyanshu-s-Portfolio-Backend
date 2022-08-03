const express = require("express");
const router = express.Router();
const check_auth = require("../middleware/check_auth");

const WorksController = require("../controllers/works");

router.get("/getAllWorks", WorksController.get_all_works);
router.get(
  "/getAllWorksDashboard",
  check_auth,
  WorksController.get_all_works_dashboard
);

router.post("/addWork", check_auth, WorksController.add_work);

router.patch("/editWork/:workId", check_auth, WorksController.edit_work);

router.delete("/deleteWork/:workId", check_auth, WorksController.delete_work);

module.exports = router;
