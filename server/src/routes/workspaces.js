const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const Workspace = require('../models/Workspace');

// POST /api/workspaces
router.post('/', verifyToken, async (req, res, next) => {
  try {
    const { title, intent, prompt, layoutConfig } = req.body;

    const workspace = new Workspace({
      userId: req.userId,
      title,
      intent,
      prompt,
      layoutConfig,
    });
    await workspace.save();

    res.status(201).json(workspace);
  } catch (err) {
    next(err);
  }
});

// GET /api/workspaces
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const workspaces = await Workspace.find({ userId: req.userId }).sort({ timestamp: -1 });
    res.json(workspaces);
  } catch (err) {
    next(err);
  }
});

// GET /api/workspaces/:id
router.get('/:id', verifyToken, async (req, res, next) => {
  try {
    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({ error: 'Workspace not found' });
    }

    if (workspace.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(workspace);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/workspaces/:id
router.delete('/:id', verifyToken, async (req, res, next) => {
  try {
    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({ error: 'Workspace not found' });
    }

    if (workspace.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await workspace.deleteOne();

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
