import { useState, useEffect, useRef } from 'react';
import {
  Sun, Moon, LogOut, History, SlidersHorizontal, Play,
  Menu, Clock, Zap
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import AdaptiveNav from './AdaptiveNav';
import BeforeAfterPanel from './BeforeAfterPanel';
import IntentBar from './IntentBar';
import DashboardLayout from './DashboardLayout';
import { defaultLayout } from './componentRegistry';
import axios from '../../api/axios';
import FeedbackWidget from '../feedback/FeedbackWidget';
import LayoutHistory from '../history/LayoutHistory';
import PersonalizationPanel from '../personalization/PersonalizationPanel';
import LoadingSkeleton from '../common/LoadingSkeleton';

// ---------------------------------------------------------------------------
// Inline TaskBanner
// ---------------------------------------------------------------------------
function TaskBanner({ taskTitle, description, onReset, onShowComparison }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="mb-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex items-start justify-between gap-4"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
          <Zap size={16} className="text-white" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100">{taskTitle}</h3>
          {description && (
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-0.5">{description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={onShowComparison}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          Show Comparison
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-white dark:bg-gray-700 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors"
        >
          Return to Default
        </button>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Fallback layouts for demo mode
// ---------------------------------------------------------------------------
const FALLBACK_LAYOUTS = {
  transaction_investigation: {
    intent: 'transaction_investigation',
    taskTitle: 'Investigate Failed Transactions',
    description: 'Analyze today failed payment transactions and identify resolution paths.',
    layout: { type: 'investigation', columns: 2 },
    visibleComponents: ['FailureAnalytics', 'FailedTransactionTable', 'ErrorDistribution', 'ResolutionPanel', 'TransactionTable'],
    hiddenComponents: ['RevenueChart', 'CustomerGrowthChart', 'MarketingAnalytics'],
    navigation: ['Investigation Overview', 'Failed Transactions', 'Failure Analysis', 'Resolution'],
  },
  revenue_analysis: {
    intent: 'revenue_analysis',
    taskTitle: 'Revenue Growth Analysis',
    description: 'Analyze this month revenue growth trends and regional performance.',
    layout: { type: 'analysis', columns: 2 },
    visibleComponents: ['RevenueCard', 'RevenueChart', 'SalesChart', 'RegionalSalesChart', 'ProductPerformance'],
    hiddenComponents: ['NotificationPanel', 'MarketingAnalytics', 'TransactionTable'],
    navigation: ['Revenue Overview', 'Monthly Trends', 'Regional Performance', 'Comparison'],
  },
  customer_analysis: {
    intent: 'customer_analysis',
    taskTitle: 'Customer Churn Analysis',
    description: 'Identify customers who stopped purchasing and analyze churn patterns.',
    layout: { type: 'analysis', columns: 2 },
    visibleComponents: ['CustomerCard', 'CustomerSegmentation', 'ChurnAnalysis', 'CustomerLifetimeValue', 'EngagementMetrics'],
    hiddenComponents: ['RevenueChart', 'SalesChart', 'MarketingAnalytics'],
    navigation: ['Customer Overview', 'Segments', 'Churn Analysis', 'Lifetime Value'],
  },
  product_performance: {
    intent: 'product_performance',
    taskTitle: 'Product Performance Review',
    description: 'Review product rankings, declining sales, inventory, and profit margins.',
    layout: { type: 'grid', columns: 2 },
    visibleComponents: ['ProductPerformance', 'ProductRankingTable', 'DecliningSalesChart', 'InventoryStatus', 'ProfitMarginChart'],
    hiddenComponents: ['RevenueChart', 'CustomerGrowthChart', 'NotificationPanel'],
    navigation: ['Product Overview', 'Rankings', 'Declining Sales', 'Inventory', 'Margins'],
  },
  regional_sales: {
    intent: 'regional_sales',
    taskTitle: 'Regional Sales Report',
    description: 'Analyze sales performance across all regions, cities, and sales representatives.',
    layout: { type: 'map', columns: 2 },
    visibleComponents: ['RegionalSalesChart', 'RegionalMap', 'CityPerformance', 'SalesRepPerformance', 'RegionalComparison'],
    hiddenComponents: ['NotificationPanel', 'MarketingAnalytics', 'TransactionTable'],
    navigation: ['Regional Overview', 'Map View', 'City Performance', 'Sales Reps'],
  },
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function AdaptiveDashboard() {
  const { user, logout } = useAuth();

  // Detect mobile on first render
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const [layoutConfig, setLayoutConfig] = useState(null);
  const [previousLayout, setPreviousLayout] = useState(null);
  const [isTransformed, setIsTransformed] = useState(false);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showPersonalization, setShowPersonalization] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [interactionId, setInteractionId] = useState(null);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('wm_theme') === 'dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('Overview');

  const feedbackTimerRef = useRef(null);

  // Apply dark mode class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // On mount: restore saved preferences and default dashboard layout
  useEffect(() => {
    const restoreSaved = async () => {
      try {
        const [prefRes, dashRes] = await Promise.all([
          axios.get('/api/preferences'),
          axios.get('/api/dashboard'),
        ]);
        // Restore theme from saved preferences
        const savedTheme = prefRes.data?.theme;
        if (savedTheme === 'dark' && !isDark) {
          setIsDark(true);
          localStorage.setItem('wm_theme', 'dark');
        } else if (savedTheme === 'light' && isDark) {
          setIsDark(false);
          localStorage.setItem('wm_theme', 'light');
        }
        // Restore saved default layout if present
        const savedLayout = dashRes.data?.layoutConfig;
        if (savedLayout?.visibleComponents?.length) {
          // Only set as default, don't mark as "transformed"
          // We keep layoutConfig null so the default grid is used,
          // but we could persist column preference here if needed.
        }
      } catch {
        // Fail silently - app works without saved preferences
      }
    };
    restoreSaved();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Responsive: close sidebar when window becomes narrow
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setIsSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('wm_theme', next ? 'dark' : 'light');
  };

  const visibleComponents = layoutConfig?.visibleComponents || defaultLayout;

  // Core: apply a layout config
  const applyLayout = async (config, id) => {
    setPreviousLayout(visibleComponents);
    setLayoutConfig(config);
    setIsTransformed(true);
    setShowBeforeAfter(true);
    setInteractionId(id);
    setTaskTitle(config.taskTitle || '');
    setTaskDescription(config.description || '');
    setShowFeedback(true);
    if (config.navigation?.length) setActiveNavItem(config.navigation[0]);

    // Non-critical auto-save
    try {
      await axios.post('/api/workspaces', {
        title: config.taskTitle || 'Saved Layout',
        intent: config.intent || '',
        layoutConfig: config,
      });
    } catch {
      // swallow
    }

    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => setShowFeedback(false), 30000);
  };

  // Handle layout change from IntentBar (string) or direct config (object)
  const handleLayoutChange = async (queryOrConfig, incomingInteractionId) => {
    if (typeof queryOrConfig === 'string') {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.post('/api/ai/generate-layout', { prompt: queryOrConfig });
        const config = res.data?.layoutConfig || res.data;
        await applyLayout(config, config.interactionId || Date.now().toString());
      } catch {
        // Keyword fallback
        const q = queryOrConfig.toLowerCase();
        let matched = null;
        if (q.includes('fail') || q.includes('transaction')) matched = FALLBACK_LAYOUTS.transaction_investigation;
        else if (q.includes('revenue')) matched = FALLBACK_LAYOUTS.revenue_analysis;
        else if (q.includes('customer') || q.includes('churn')) matched = FALLBACK_LAYOUTS.customer_analysis;
        else if (q.includes('product')) matched = FALLBACK_LAYOUTS.product_performance;
        else if (q.includes('region') || q.includes('sales report')) matched = FALLBACK_LAYOUTS.regional_sales;

        if (matched) {
          await applyLayout(matched, Date.now().toString());
        } else {
          setError('Could not transform layout. Please try a different query.');
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      // Config object passed directly (demo mode, history restore)
      await applyLayout(queryOrConfig, incomingInteractionId || Date.now().toString());
    }
  };

  const handleReset = () => {
    setPreviousLayout(visibleComponents);
    setLayoutConfig(null);
    setIsTransformed(false);
    setShowBeforeAfter(false);
    setTaskTitle('');
    setTaskDescription('');
    setInteractionId(null);
    setShowFeedback(false);
    setActiveNavItem('Overview');
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
  };

  // Demo mode: cycle through 3 layouts then reset
  const runDemo = async () => {
    if (isDemoRunning) return;
    setIsDemoRunning(true);
    const sequence = ['transaction_investigation', 'revenue_analysis', 'regional_sales'];
    for (const intent of sequence) {
      await new Promise(r => setTimeout(r, 3000));
      handleLayoutChange(FALLBACK_LAYOUTS[intent], null);
    }
    await new Promise(r => setTimeout(r, 4000));
    handleReset();
    setIsDemoRunning(false);
  };

  // Nav items: array of strings when transformed, undefined otherwise
  const navItems = isTransformed && layoutConfig?.navigation
    ? layoutConfig.navigation
    : undefined;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <AdaptiveNav
        navItems={navItems}
        activeItem={activeNavItem}
        onItemClick={setActiveNavItem}
        onReset={isTransformed ? handleReset : undefined}
        taskTitle={taskTitle}
        isTransformed={isTransformed}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(o => !o)}
        userName={user?.name}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="flex-shrink-0 flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          {/* Left: hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(o => !o)}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
            {/* Center brand text — hidden on very small screens */}
            <span className="hidden sm:block text-lg font-bold text-gray-900 dark:text-white tracking-tight">
              WebMorph
            </span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1.5">
            {/* Demo button */}
            <button
              onClick={runDemo}
              disabled={isDemoRunning}
              title="Run demo mode"
              className="flex items-center gap-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Play size={14} />
              <span className="hidden sm:inline">{isDemoRunning ? 'Running…' : 'Demo'}</span>
            </button>

            {/* isDemoRunning badge */}
            <AnimatePresence>
              {isDemoRunning && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="hidden sm:inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                >
                  Demo mode
                </motion.span>
              )}
            </AnimatePresence>

            {/* History button */}
            <button
              onClick={() => { setShowHistory(o => !o); setShowPersonalization(false); }}
              title="Layout history"
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Clock size={18} />
            </button>

            {/* Settings button */}
            <button
              onClick={() => { setShowPersonalization(o => !o); setShowHistory(false); }}
              title="Settings"
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <SlidersHorizontal size={18} />
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title="Toggle theme"
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* User name + logout */}
            <div className="hidden sm:flex items-center gap-2 ml-1 pl-3 border-l border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">{user?.name || 'User'}</span>
              <button
                onClick={logout}
                title="Logout"
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors"
              >
                <LogOut size={18} />
              </button>
            </div>
            {/* Logout only on mobile */}
            <button
              onClick={logout}
              title="Logout"
              className="sm:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Task Banner */}
        <AnimatePresence>
          {isTransformed && (
            <TaskBanner
              key="task-banner"
              taskTitle={taskTitle}
              description={taskDescription}
              onReset={handleReset}
              onShowComparison={() => setShowBeforeAfter(o => !o)}
            />
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <IntentBar onLayoutChange={handleLayoutChange} isLoading={isLoading} />

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          {isLoading
            ? <LoadingSkeleton count={6} columns={3} />
            : (
              <DashboardLayout
                componentKeys={visibleComponents}
                layoutConfig={layoutConfig?.layout || { columns: 3 }}
              />
            )
          }

          {showFeedback && interactionId && (
            <FeedbackWidget
              interactionId={interactionId}
              onFeedbackSubmit={() => setShowFeedback(false)}
            />
          )}
        </main>
      </div>

      {/* Before/After Panel */}
      <AnimatePresence>
        {showBeforeAfter && (
          <BeforeAfterPanel
            key="before-after"
            previousLayout={previousLayout}
            currentLayout={layoutConfig}
            isVisible={showBeforeAfter}
            onClose={() => setShowBeforeAfter(false)}
          />
        )}
      </AnimatePresence>

      {/* Layout History Panel */}
      <LayoutHistory
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        onRestoreLayout={(config) => handleLayoutChange(config, null)}
      />

      {/* Personalization Panel */}
      <PersonalizationPanel
        isOpen={showPersonalization}
        onClose={() => setShowPersonalization(false)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
    </div>
  );
}
