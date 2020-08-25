const express = require('express');
const router = express.Router();

const {
    create,
    projectsList,
    updateProject,
     projectById,
    readProject,
    updateTodoRepo,
    deleteTodoFromRepo,
    deleteProjectFromRepo,
    removeProject
    
    /*removeProject, */
} = require('../controllers/project');
const {
    requireSignin,
    isAuth
} = require('../controllers/auth');
const {
    userById
} = require('../controllers/user');

router.post("/project/create/:userId", requireSignin, isAuth, create);
 router.put("/project/:projectId/:userId", requireSignin, isAuth, updateProject);
 router.put("/updateTodoRepo/:projectId",  updateTodoRepo);
 router.put("/deleteTodoFromRepo/:projectId",  deleteTodoFromRepo); 
 router.put("/deleteProjectFromRepo/:userId",  deleteProjectFromRepo); 
router.delete("/project/:projectId/:userId", requireSignin, isAuth, removeProject);
router.get("/projects", projectsList);
router.get("/project/:projectId",readProject)
 
router.param("projectId", projectById);
router.param("userId", userById);
module.exports = router;