require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');
const feedbackRoutes = require('./routes/feedback');
const workspacesRoutes = require('./routes/workspaces');
const preferencesRoutes = require('./routes/preferences');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/layout', aiRoutes); // alias: /api/layout/transform maps to /api/ai/generate-layout behaviour
app.use('/api/feedback', feedbackRoutes);
app.use('/api/workspaces', workspacesRoutes);
app.use('/api/preferences', preferencesRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`WebMorph server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
