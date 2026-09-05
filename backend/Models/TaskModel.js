const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    required: true
  }
});

const TaskModel = mongoose.model('todos', taskSchema);

module.exports = TaskModel;