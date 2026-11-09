const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  intent: {
    type: String,
  },
  prompt: {
    type: String,
  },
  layoutConfig: {
    type: mongoose.Schema.Types.Mixed,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Workspace', workspaceSchema);
