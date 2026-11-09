const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const User = require('../models/User');

// GET /api/preferences
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.preferences);
  } catch (err) {
    next(err);
  }
});

// PUT /api/preferences
router.put('/', verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Merge incoming preferences with existing
    user.preferences = { ...user.preferences, ...req.body };
    user.markModified('preferences');
    await user.save();

    res.json(user.preferences);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
