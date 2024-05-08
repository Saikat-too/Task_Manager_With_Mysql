// Script File for managing Task
const Task = require('../models/Task');

const createTask = async (req, res) => {
  const { title, description, status } = req.body;
  const userId = req.userId;

  try {
    const newTask = new Task(title, description, status, userId);
    const insertedId = await newTask.save();
    res.status(201).json({ id: insertedId, title, description, status });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

const getAllTasks = async (req, res) => {
  const userId = req.userId;

  try {
    const tasks = await Task.findAll(userId);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

const getTaskById = async (req, res) => {
    const userId = req.userId;
    const taskId = req.params.id;
  
    try {
      const task = await Task.findById(taskId, userId);
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve task' });
    }
  };
  
  const updateTask = async (req, res) => {
    const userId = req.userId;
    const taskId = req.params.id;
    const { title, description, status } = req.body;
  
    try {
      const updates = { title, description, status };
      const affectedRows = await Task.updateTask(taskId, userId, updates);
  
      if (affectedRows === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.json({ message: 'Task updated successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  };
  
  const deleteTask = async (req, res) => {
    const userId = req.userId;
    const taskId = req.params.id;
  
    try {
      const affectedRows = await Task.deleteTask(taskId, userId);
  
      if (affectedRows === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.json({ message: 'Task deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  };
  
  module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
  };