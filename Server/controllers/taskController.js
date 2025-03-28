const { Task, Subtask } = require('../models/Task');

// Get all tasks with subtasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ include: ['subtasks'] });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new task
const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = await Task.create({ title, description });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a task by ID
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a subtask
const updateSubtask = async (req, res) => {
  const { taskId, subtaskId } = req.params;
  const { title, completed } = req.body;

  try {
    const [updated] = await Subtask.update(
      { title },
      { where: { id: subtaskId, TaskId: taskId } }
    );

    if (updated) {
      const updatedSubtask = await Subtask.findByPk(subtaskId);
      return res.json(updatedSubtask);
    }

    return res.status(404).send('Subtask not found');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a subtask
const deleteSubtask = async (req, res) => {
  const { taskId, subtaskId } = req.params;

  try {
    const deleted = await Subtask.destroy({
      where: { id: subtaskId, TaskId: taskId },
    });

    if (deleted) {
      return res.status(204).send();
    }
    return res.status(404).send('Subtask not found');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

// Add a subtask to a task
const addSubtask = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const subtask = await Subtask.create({ title, TaskId: task.id });
    res.status(201).json(subtask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  addSubtask,
  updateSubtask,
  deleteSubtask,
};