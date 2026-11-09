const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const Interaction = require('../models/Interaction');

// POST /api/feedback
router.post('/', verifyToken, async (req, res, next) => {
  try {
    const { interactionId, feedback } = req.body;

    if (!interactionId || !feedback) {
      return res.status(400).json({ error: 'interactionId and feedback are required' });
    }

    await Interaction.findByIdAndUpdate(interactionId, { feedback });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// GET /api/feedback/history
router.get('/history', verifyToken, async (req, res, next) => {
  try {
    const history = await Interaction.find({ userId: req.userId })
      .sort({ timestamp: -1 })
      .limit(20);

    res.json(history);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
