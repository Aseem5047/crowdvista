const express = require("express");
const { addProject, getUserProjects, getAllProjects, getProjectsById, editGivenProject, deleteProject, likeProject, commentProject, updateFunds, getTimelinePosts, getPostsBySearch } = require("../Controllers/ProjectController");

const router = express.Router();

router.get("/search", getPostsBySearch);
router.post('/addNew', addProject);
router.get('/userProjects', getUserProjects);
router.get('/:projectId', getProjectsById);
router.put('/edit', editGivenProject);
router.put('/updateFunds', updateFunds);
router.get('/', getAllProjects);
router.delete("/:id", deleteProject);
router.put("/:id/like", likeProject);
router.post('/:id/comment', commentProject);
router.get("/:id/timeline", getTimelinePosts);


module.exports = router;
