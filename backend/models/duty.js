const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  date:{type: String, required: true},
  startTime: { type: String },
  endTime: { type: String },
  isChecked: { type: Boolean, default: false },
  station: { type: String, required: true }
});

module.exports = mongoose.model('Task', TaskSchema);
