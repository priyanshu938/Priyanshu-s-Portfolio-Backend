const express = require("express");
const router = express.Router();
const check_auth = require("../middleware/check_auth");

const SkillsController = require("../controllers/skills");

router.get("/getAllSkills", SkillsController.get_all_skills);

router.post("/addSkill", check_auth, SkillsController.add_skill);

router.patch("/editSkill/:skillId", check_auth, SkillsController.edit_skill);

router.delete("/deleteSkill/:skillId", check_auth, SkillsController.delete_skill);

module.exports = router;
