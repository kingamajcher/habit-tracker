const mongoose = require('mongoose');

const habitLogSchema = new mongoose.Schema({
  habit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['done', 'not done'],
    default: 'not done',
  }
});

const HabitLog = mongoose.model('HabitLog', habitLogSchema);
module.exports = HabitLog;
