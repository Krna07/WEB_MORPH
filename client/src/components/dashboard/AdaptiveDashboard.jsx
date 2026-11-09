import { useState, useEffect, useRef } from 'react';
import { Sun, Moon, LogOut, History, Settings, Play } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AdaptiveNav from '../layout/AdaptiveNav';
import IntentBar from '../layout/IntentBar';
import TaskBanner from '../layout/TaskBanner';
import LoadingSkeleton from '../layout/LoadingSkeleton';
import BeforeAfterPanel from '../layout/BeforeAfterPanel';
import DashboardLayout from './DashboardLayout';
import { defaultLayout } from './componentRegistry';
import axios from '../../api/axios';

// Demo layouts used in demo mode (no API call needed)
const DEMO_LAYOUTS = [
  {
    intent: 'transaction_investigation',
    taskTitle: 'Investigate Failed Transactions',
    description: 'Analyzing today\'s failed payment transactions.',
    layout: { columns: 2 },
    visibleComponents: ['FailureAnalytics', 'FailedTransactionTable', 'ErrorDistribution', 'ResolutionPanel'],
  },
  {
    intent: 'revenue_analysis',
    taskTitle: 'Revenue Analysis',
    description: 'Reviewing monthly revenue growth and regional performance.',
    layout: { columns: 2 },
    visibleComponents: ['RevenueCard', 'RevenueChart', 'RegionalSalesChart', 'RegionalComparison'],
  },
  {
    intent: 'customer_analysis',
    taskTitle: 'Customer Analysis',
    description: 'Identifying churned and at-risk customers.',
    layout: { columns: 2 },
    visibleComponents: ['CustomerCard', 'CustomerSegmentation', 'ChurnAnalysis', 'CustomerLifetimeValue'],
  },
  {
    intent: 'product_performance',
    taskTitle: 'Product Performance',
    description: 'Products ranked by revenue and declining sales overview.',
    layout: { columns: 2 },
    visibleComponents: ['ProductRankingTable', 'DecliningSalesChart', 'InventoryStatus', 'ProfitMarginChart'],
  },
];

export default function AdaptiveDashboard() {
  const { user, logout } = useAuth();

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const feedbackTimerRef = useRef(null);

  // Apply dark mode on mount and on change
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('wm_theme', next ? 'dark' : 'light');
  };

  const visibleComponents = layoutConfig?.visibleComponents || defaultLayout;

  const handleLayoutChange = async (queryOrConfig, incomingInteractionId) => {
    // If called with a string (from IntentBar), send to API
    if (typeof queryOrConfig === 'string') {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.post('/api/layout/transform', { query: queryOrConfig });
        const config = res.data;
        applyLayout(config, config.interactionId || Date.now().toString());
      } catch (err) {
        // Fallback: try keyword matching
        const q = queryOrConfig.toLowerCase();
        const fallback = DEMO_LAYOUTS.find(l =>
          l.intent.includes(q.split(' ')[0]) ||
          q.includes('fail') && l.intent === 'transaction_investigation' ||
          q.includes('revenue') && l.intent === 'revenue_analysis' ||
          q.includes('customer') && l.intent === 'customer_analysis' ||
          q.includes('product') && l.intent === 'product_performance'
        );
        if (fallback) {
          applyLayout(fallback, Date.now().toString());
        } else {
          setError('Could not transform layout. Please try a different query.');
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      // Called with a config object (demo mode)
      applyLayout(queryOrConfig, incomingInteractionId || Date.now().toString());
    }
  };

  const applyLayout = async (config, id) => {
    setPreviousLayout(visibleComponents);
    setLayoutConfig(config);
    setIsTransformed(true);
    setShowBeforeAfter(true);
    setInteractionId(id);
    setTaskTitle(config.taskTitle || '');
    setTaskDescription(config.description || '');
    setShowFeedback(true);

    // Auto-save workspace
    try {
      await axios.post('/api/workspaces', {
        name: config.taskTitle || 'Saved Layout',
        layoutConfig: config,
      });
    } catch {
      // Non-critical: swallow save errors
    }

    // Hide feedback after 30s
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => setShowFeedback(false), 30000);
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
  };

  const handleRestoreLayout = (savedConfig) => {
    applyLayout(savedConfig, Date.now().toString());
    setShowHistory(false);
  };

  // Demo mode: cycle through 4 layouts with 3s intervals
  const runDemo = async () => {
    if (isDemoMode) return;
    setIsDemoMode(true);
    handleReset();

    for (let i = 0; i < DEMO_LAYOUTS.length; i++) {
      await new Promise(resolve => setTimeout(resolve, i === 0 ? 500 : 3000));
      applyLayout(DEMO_LAYOUTS[i], `demo-${i}`);
    }

    setIsDemoMode(false);
  };

  const navItems = isTransformed && layoutConfig?.navigation
    ? layoutConfig.navigation.map(label => ({ key: label.toLowerCase().replace(/\s+/g, '_'), label }))
    : undefined;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <AdaptiveNav
        navItems={navItems}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(o => !o)}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Bar */}
        <header className="flex-shrink-0 flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Welcome back, <span className="text-blue-600">{user?.name || 'User'}</span>
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {isTransformed ? taskTitle : 'Overview Dashboard'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Demo button */}
            <button
              onClick={runDemo}
              disabled={isDemoMode}
              title="Run demo mode"
              className="flex items-center gap-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Play size={14} /> {isDemoMode ? 'Demo running…' : 'Demo'}
            </button>

            {/* History button */}
            <button
              onClick={() => setShowHistory(o => !o)}
              title="Layout history"
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <History size={18} />
            </button>

            {/* Settings button */}
            <button
              onClick={() => setShowPersonalization(o => !o)}
              title="Settings"
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Settings size={18} />
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title="Toggle theme"
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Logout */}
            <button
              onClick={logout}
              title="Logout"
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Task banner */}
          {isTransformed && (
            <TaskBanner
              taskTitle={taskTitle}
              description={taskDescription}
              onReset={handleReset}
              showComparison={!!previousLayout}
              onToggleComparison={() => setShowBeforeAfter(o => !o)}
            />
          )}

          {/* Intent input */}
          <IntentBar onLayoutChange={handleLayoutChange} isLoading={isLoading} />

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Grid */}
          {isLoading
            ? <LoadingSkeleton count={6} columns={layoutConfig?.layout?.columns || 3} />
            : <DashboardLayout
                componentKeys={visibleComponents}
                layoutConfig={layoutConfig?.layout || { columns: 3 }}
              />
          }

          {/* Inline feedback (Phase 5 placeholder) */}
          {interactionId && showFeedback && (
            <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Was this layout helpful?</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFeedback(false)}
                  className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 transition-colors"
                >
                  👍 Yes
                </button>
                <button
                  onClick={() => setShowFeedback(false)}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 transition-colors"
                >
                  👎 No
                </button>
                <button
                  onClick={() => setShowFeedback(false)}
                  className="px-2 py-1.5 rounded-lg text-gray-400 hover:text-gray-600 transition-colors text-xs"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Before/After Panel */}
      <BeforeAfterPanel
        previousLayout={previousLayout}
        currentLayout={layoutConfig}
        isVisible={showBeforeAfter}
        onClose={() => setShowBeforeAfter(false)}
      />

      {/* Layout History Panel (placeholder until Phase 5) */}
      {showHistory && (
        <div className="fixed inset-y-0 right-0 w-72 bg-white dark:bg-gray-800 shadow-2xl border-l border-gray-200 dark:border-gray-700 z-40 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Layout History</h3>
            <button onClick={() => setShowHistory(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 text-xs">✕</button>
          </div>
          <div className="flex-1 p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">History will be available in Phase 5.</p>
            {DEMO_LAYOUTS.map((l, i) => (
              <button
                key={i}
                onClick={() => handleRestoreLayout(l)}
                className="w-full text-left mt-2 px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm text-gray-700 dark:text-gray-300 transition-colors"
              >
                {l.taskTitle}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Personalization Panel (placeholder until Phase 5) */}
      {showPersonalization && (
        <div className="fixed inset-y-0 right-0 w-72 bg-white dark:bg-gray-800 shadow-2xl border-l border-gray-200 dark:border-gray-700 z-40 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Settings</h3>
            <button onClick={() => setShowPersonalization(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 text-xs">✕</button>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDark ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${isDark ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Full personalization panel coming in Phase 5.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
