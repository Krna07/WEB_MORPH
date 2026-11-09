const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const verifyToken = require('../middleware/auth');
const Interaction = require('../models/Interaction');

// Component whitelist
const COMPONENT_WHITELIST = [
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
  'FailureAnalytics',
  'FailedTransactionTable',
  'ErrorDistribution',
  'ResolutionPanel',
  'CustomerSegmentation',
  'ChurnAnalysis',
  'CustomerLifetimeValue',
  'EngagementMetrics',
  'ProductRankingTable',
  'DecliningSalesChart',
  'InventoryStatus',
  'ProfitMarginChart',
  'RegionalMap',
  'CityPerformance',
  'SalesRepPerformance',
  'RegionalComparison',
];

// Fallback layouts keyed by intent
const FALLBACK_LAYOUTS = {
  transaction_investigation: {
    intent: 'transaction_investigation',
    taskTitle: 'Investigate Failed Transactions',
    description: 'Analyze today failed payment transactions and identify resolution paths.',
    layout: { type: 'investigation', columns: 2 },
    visibleComponents: [
      'FailureAnalytics',
      'FailedTransactionTable',
      'ErrorDistribution',
      'ResolutionPanel',
      'TransactionTable',
    ],
    hiddenComponents: ['RevenueChart', 'CustomerGrowthChart', 'MarketingAnalytics'],
    filters: { date: 'today', status: 'failed' },
    navigation: ['Investigation Overview', 'Failed Transactions', 'Failure Analysis', 'Resolution'],
    priority: ['failed_transactions', 'failure_reasons', 'resolution'],
  },
  revenue_analysis: {
    intent: 'revenue_analysis',
    taskTitle: 'Revenue Growth Analysis',
    description: 'Analyze this month revenue growth trends and regional performance.',
    layout: { type: 'analysis', columns: 2 },
    visibleComponents: [
      'RevenueCard',
      'RevenueChart',
      'SalesChart',
      'RegionalSalesChart',
      'ProductPerformance',
    ],
    hiddenComponents: ['NotificationPanel', 'MarketingAnalytics', 'TransactionTable'],
    filters: { period: 'this_month' },
    navigation: ['Revenue Overview', 'Monthly Trends', 'Regional Performance', 'Comparison'],
    priority: ['total_revenue', 'growth_rate', 'regional'],
  },
  customer_analysis: {
    intent: 'customer_analysis',
    taskTitle: 'Customer Churn Analysis',
    description: 'Identify customers who stopped purchasing and analyze churn patterns.',
    layout: { type: 'analysis', columns: 2 },
    visibleComponents: [
      'CustomerCard',
      'CustomerSegmentation',
      'ChurnAnalysis',
      'CustomerLifetimeValue',
      'EngagementMetrics',
    ],
    hiddenComponents: ['RevenueChart', 'SalesChart', 'MarketingAnalytics'],
    filters: { status: 'at_risk' },
    navigation: ['Customer Overview', 'Segments', 'Churn Analysis', 'Lifetime Value'],
    priority: ['churn_rate', 'at_risk', 'segments'],
  },
  product_performance: {
    intent: 'product_performance',
    taskTitle: 'Product Performance Review',
    description: 'Review product rankings, declining sales, inventory, and profit margins.',
    layout: { type: 'grid', columns: 2 },
    visibleComponents: [
      'ProductPerformance',
      'ProductRankingTable',
      'DecliningSalesChart',
      'InventoryStatus',
      'ProfitMarginChart',
    ],
    hiddenComponents: ['RevenueChart', 'CustomerGrowthChart', 'NotificationPanel'],
    filters: { sortBy: 'revenue' },
    navigation: ['Product Overview', 'Rankings', 'Declining Sales', 'Inventory', 'Margins'],
    priority: ['top_products', 'declining', 'inventory'],
  },
  regional_sales: {
    intent: 'regional_sales',
    taskTitle: 'Regional Sales Report',
    description: 'Analyze sales performance across all regions, cities, and sales representatives.',
    layout: { type: 'map', columns: 2 },
    visibleComponents: [
      'RegionalSalesChart',
      'RegionalMap',
      'CityPerformance',
      'SalesRepPerformance',
      'RegionalComparison',
    ],
    hiddenComponents: ['NotificationPanel', 'MarketingAnalytics', 'TransactionTable'],
    filters: { view: 'regional' },
    navigation: ['Regional Overview', 'Map View', 'City Performance', 'Sales Reps'],
    priority: ['top_regions', 'cities', 'reps'],
  },
};

// Default layout (12 components)
const DEFAULT_LAYOUT = {
  intent: 'default',
  taskTitle: 'Business Analytics Dashboard',
  description: 'Overview of all business analytics and performance metrics.',
  layout: { type: 'grid', columns: 3 },
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
  filters: {},
  navigation: ['Overview', 'Sales', 'Customers', 'Products', 'Transactions', 'Reports'],
  priority: ['revenue', 'orders', 'customers', 'conversion'],
};

// Keyword-based intent detection
function detectIntent(prompt) {
  const lower = prompt.toLowerCase();

  if (
    lower.includes('transaction') ||
    lower.includes('failed') ||
    lower.includes('payment') ||
    lower.includes('failure')
  ) {
    return 'transaction_investigation';
  }
  if (lower.includes('revenue') || lower.includes('growth') || lower.includes('sales')) {
    return 'revenue_analysis';
  }
  if (lower.includes('customer') || lower.includes('churn') || lower.includes('retention')) {
    return 'customer_analysis';
  }
  if (lower.includes('product') || lower.includes('inventory') || lower.includes('margin')) {
    return 'product_performance';
  }
  if (
    lower.includes('region') ||
    lower.includes('regional') ||
    lower.includes('geography') ||
    lower.includes('city')
  ) {
    return 'regional_sales';
  }

  return 'default';
}

// Build layout from keyword detection
function getKeywordLayout(prompt) {
  const intent = detectIntent(prompt);
  if (intent === 'default') return DEFAULT_LAYOUT;
  return FALLBACK_LAYOUTS[intent];
}

// Gemini AI call with fallback
async function getAILayout(prompt) {
  if (!process.env.GEMINI_API_KEY) {
    return getKeywordLayout(prompt);
  }

  try {
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemPrompt = `You are a UI intent classifier for WebMorph business analytics dashboard. Analyze the user objective and return ONLY valid JSON (no markdown, no code blocks, no explanation). Schema: { "intent": "snake_case_string", "taskTitle": "string", "description": "string", "layout": { "type": "string", "columns": 2 }, "visibleComponents": ["4 to 8 component names from whitelist"], "hiddenComponents": ["array"], "filters": {}, "navigation": ["3 to 5 nav item strings"], "priority": ["array"] }. Whitelist: RevenueCard, OrdersCard, CustomerCard, ConversionCard, RevenueChart, SalesChart, CustomerGrowthChart, TransactionTable, RegionalSalesChart, ProductPerformance, NotificationPanel, MarketingAnalytics, FailureAnalytics, FailedTransactionTable, ErrorDistribution, ResolutionPanel, CustomerSegmentation, ChurnAnalysis, CustomerLifetimeValue, EngagementMetrics, ProductRankingTable, DecliningSalesChart, InventoryStatus, ProfitMarginChart, RegionalMap, CityPerformance, SalesRepPerformance, RegionalComparison. User objective: ${prompt}`;

    const result = await model.generateContent(systemPrompt);
    let text = result.response.text();

    // Strip markdown code blocks (```json ... ``` or ``` ... ```)
    text = text.replace(/```(?:json)?\s*/gi, '').replace(/```/g, '');

    // Extract JSON object from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in AI response');

    const parsed = JSON.parse(jsonMatch[0]);

    // Validate and filter visibleComponents against whitelist
    if (Array.isArray(parsed.visibleComponents)) {
      parsed.visibleComponents = parsed.visibleComponents.filter((c) =>
        COMPONENT_WHITELIST.includes(c)
      );
    }
    if (Array.isArray(parsed.hiddenComponents)) {
      parsed.hiddenComponents = parsed.hiddenComponents.filter((c) =>
        COMPONENT_WHITELIST.includes(c)
      );
    }

    return parsed;
  } catch (err) {
    console.error('Gemini AI error, falling back to keyword detection:', err.message);
    return getKeywordLayout(prompt);
  }
}

// Rate limiter: 10 requests per 15 minutes
const aiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many requests' },
});

// POST /api/ai/interpret
router.post('/interpret', verifyToken, aiRateLimit, async (req, res, next) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const layoutConfig = await getAILayout(prompt);
    res.json({ layoutConfig });
  } catch (err) {
    next(err);
  }
});

// POST /api/ai/generate-layout (also mounted as /api/layout/generate-layout)
router.post('/generate-layout', verifyToken, aiRateLimit, async (req, res, next) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const layoutConfig = await getAILayout(prompt);

    // Save interaction to DB
    const interaction = new Interaction({
      userId: req.userId,
      prompt,
      aiResponse: layoutConfig,
      layoutApplied: layoutConfig,
    });
    await interaction.save();

    res.json({ layoutConfig, interactionId: interaction._id });
  } catch (err) {
    next(err);
  }
});

// POST /api/ai/transform  (alias used by frontend via /api/layout/transform)
router.post('/transform', verifyToken, aiRateLimit, async (req, res, next) => {
  try {
    const prompt = req.body.query || req.body.prompt;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt or query is required' });
    }

    const layoutConfig = await getAILayout(prompt);

    // Save interaction to DB
    try {
      const interaction = new Interaction({
        userId: req.userId,
        prompt,
        aiResponse: layoutConfig,
        layoutApplied: layoutConfig,
      });
      await interaction.save();
      return res.json({ ...layoutConfig, interactionId: interaction._id });
    } catch {
      return res.json(layoutConfig);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
