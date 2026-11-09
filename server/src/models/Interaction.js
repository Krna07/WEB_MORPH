const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  aiResponse: {
    type: mongoose.Schema.Types.Mixed,
  },
  layoutApplied: {
    type: mongoose.Schema.Types.Mixed,
  },
  feedback: {
    type: String,
    enum: ['helpful', 'not_helpful', 'customized', null],
    default: null,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Interaction', interactionSchema);
