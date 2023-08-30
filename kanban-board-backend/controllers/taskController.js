const Task = require('../models/Task')

const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newTask = new Task({ title, description, status });
    await newTask.save();
    console.log('Received data:', title, description, status);
    res.status(201).json(newTask);
  } catch (err) {
    console.error('Error saving task:', err); 
    res.status(500).json({ message: err.message });
  }
};




const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, title, description } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status, title, description },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {createTask, getAllTasks, updateTask, deleteTask}



