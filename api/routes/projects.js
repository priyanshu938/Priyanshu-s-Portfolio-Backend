const express = require("express");
const router = express.Router();
const check_auth = require("../middleware/check_auth");

const ProjectsController = require("../controllers/projects");

router.get("/getAllProjects", ProjectsController.get_all_projects);

router.post("/addProject", check_auth, ProjectsController.add_project);

router.patch("/editProject/:projectId", check_auth, ProjectsController.edit_project);

router.delete("/deleteProject/:projectId", check_auth, ProjectsController.delete_project);

module.exports = router;
