// kanban-board-backend/routes.js
const express = require('express');
const router = express.Router();
const {createTask, getAllTasks, updateTask, deleteTask} = require('./controllers/taskController');

router.get('',(req,res) => {
    res.send('Welcome')
})
// Create a new task
router.post('/tasks', createTask);

// Get all tasks
router.get('/tasks', getAllTasks);

// Update a task
router.put('/tasks/:id', updateTask);

// Delete a task
router.delete('/tasks/:id', deleteTask);

module.exports = router;



