const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const Dashboard = require('../models/Dashboard');

const DEFAULT_LAYOUT_CONFIG = {
  visibleComponents: [
    'RevenueCard',
    'OrdersCard',
    'CustomerCard',
    'ConversionCard',
    'RevenueChart',
    'SalesChart',
    'CustomerGrowthChart',
    'TransactionTable',
    'RegionalSalesChart',
    'ProductPerformance',
    'NotificationPanel',
    'MarketingAnalytics',
  ],
  hiddenComponents: [],
  layout: { type: 'grid', columns: 3 },
};

// GET /api/dashboard
router.get('/', verifyToken, async (req, res, next) => {
  try {
    let dashboard = await Dashboard.findOne({ userId: req.userId, isDefault: true });

    if (!dashboard) {
      dashboard = new Dashboard({
        userId: req.userId,
        name: 'My Dashboard',
        layoutConfig: DEFAULT_LAYOUT_CONFIG,
        isDefault: true,
      });
      await dashboard.save();
    }

    res.json(dashboard);
  } catch (err) {
    next(err);
  }
});

// PUT /api/dashboard/layout
router.put('/layout', verifyToken, async (req, res, next) => {
  try {
    const { layoutConfig } = req.body;

    const dashboard = await Dashboard.findOneAndUpdate(
      { userId: req.userId, isDefault: true },
      { layoutConfig, updatedAt: Date.now() },
      { upsert: true, new: true }
    );

    res.json(dashboard);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
