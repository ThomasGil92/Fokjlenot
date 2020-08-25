const express = require('express');
const router = express.Router();

const {
    createTodo,
    todoById,
    todosList,
    updateTodo,
    readTodo,
    removeTodo,
    updateBgColor,
    addTodoSubtaskList,
    removeSubtaskId
    /* read,
   
    listCategories,
     
    
    
    listSearch,
    listBySearch
     listSearch */
} = require('../controllers/todo');
const {
    requireSignin,
    isAuth
} = require('../controllers/auth');
const {
    userById
} = require('../controllers/user');


router.post("/todo/create/:userId", requireSignin, isAuth, createTodo);
router.put('/todo/:todoId', updateTodo);
router.put('/subtaskList/:todoId', addTodoSubtaskList);
router.put('/todoColor/:todoId', updateBgColor);
router.get('/todo/:todoId', readTodo);
router.get("/todos/:userId", requireSignin, isAuth, todosList);
router.delete('/todo/:todoId/:userId', requireSignin, isAuth, removeTodo);
router.delete('/subtaskList/:todoId', removeSubtaskId);
/*
router.get('/todos/categories', listCategories);
router.get("/category/:id", read);

router.get("/todos/search", listSearch);
router.post("/todos/by/search", listBySearch);
router.get('/todos/related/:todoId', listRelated);


router.get('/todo/photo/:todoId',photo); */


router.param("todoId", todoById);
router.param("userId", userById);
module.exports = router;