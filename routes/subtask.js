const express = require('express');
const router = express.Router();

const {
    createSubtask,
    removeSubtask,
    readSubtask,
    subtaskById
} = require('../controllers/subtask');
const { todoById } = require('../controllers/todo')

router.post("/subtask", createSubtask);
router.delete("/subtask", removeSubtask);
router.get("/subtask/:subtaskId", readSubtask);

router.param("subtaskId", subtaskById);
module.exports = router;