const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const taskValidator = require('../middleware/taskValidator');

router.get('/',taskController.getAllTasks);
router.post('/',taskValidator ,taskController.createTask);
router.put('/:id',taskValidator ,taskController.updateTask);
router.delete('/:id',taskController.deleteTask);

module.exports = router;