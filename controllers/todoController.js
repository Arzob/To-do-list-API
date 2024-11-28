const Todo = require('../models/todo');

// Create a new To-Do item
exports.createTodo = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTodo = await Todo.create({ title, description, userId: req.userId });
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating to-do item' });
  }
};

// Get all To-Do items for a user
exports.getTodos = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const todos = await Todo.find({ userId: req.userId })
                            .skip((page - 1) * limit)
                            .limit(Number(limit));
    const total = await Todo.countDocuments({ userId: req.userId });
    res.json({ data: todos, page, limit, total });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching to-do items' });
  }
};

// Update a To-Do item
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, description },
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: 'To-Do not found or not authorized' });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating to-do item' });
  }
};

// Delete a To-Do item
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.userId });
    if (!todo) return res.status(404).json({ message: 'To-Do not found or not authorized' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting to-do item' });
  }
};
