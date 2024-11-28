const express = require('express');
const todoController = require('../controllers/todoController');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/', userController.authenticate, todoController.createTodo);
router.get('/', userController.authenticate, todoController.getTodos);
router.put('/:id', userController.authenticate, todoController.updateTodo);
router.delete('/:id', userController.authenticate, todoController.deleteTodo);

module.exports = router;
