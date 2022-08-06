const express = require("express");
const router = express.Router();
const check_auth = require("../middleware/check_auth");

const VideosController = require("../controllers/videos");

router.get("/getAllVideos", VideosController.get_all_videos);
router.get(
  "/getAllVideosDashboard",
  check_auth,
  VideosController.get_all_videos_dashboard
);

router.post(
  "/addVideo",
  check_auth,
  VideosController.add_video
);

router.patch(
  "/editVideo/:videoId",
  check_auth,
  VideosController.edit_video
);

router.delete(
  "/deleteVideo/:videoId",
  check_auth,
  VideosController.delete_video
);

module.exports = router;
