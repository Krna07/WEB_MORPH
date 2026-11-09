const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  preferences: {
    type: mongoose.Schema.Types.Mixed,
    default: {
      theme: 'light',
      pinnedComponents: [],
      hiddenComponents: [],
    },
  },
  defaultLayout: {
    type: [String],
    default: [
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
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook: hash password if modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method: compare password
userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema);
