// kanban-board-backend/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: true
  },
  description: {
    type: String, 
    required: true
  },
  status:{
    type: String, 
    enum: ['todo', 'doing', 'done'], // Enum values
    required: true
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task