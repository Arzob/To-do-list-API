const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    title: String,
    description: String, 
    userId: mongoose.Schema.Types.ObjectId
});
module.exports = mongoose.model('Todo', todoSchema);