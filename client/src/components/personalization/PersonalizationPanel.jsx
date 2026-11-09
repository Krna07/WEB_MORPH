import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sun, Moon, Pin, EyeOff, CheckCircle, Save } from 'lucide-react';
import api from '../../api/axios';

const TABS = ['Appearance', 'Components', 'Layout'];

const ACCENT_COLORS = [
  { name: 'blue', bg: 'bg-blue-500', value: 'blue' },
  { name: 'purple', bg: 'bg-purple-500', value: 'purple' },
  { name: 'green', bg: 'bg-green-500', value: 'green' },
  { name: 'orange', bg: 'bg-orange-500', value: 'orange' },
  { name: 'pink', bg: 'bg-pink-500', value: 'pink' },
];

const DEFAULT_COMPONENTS = [
  'RevenueCard', 'OrdersCard', 'CustomerCard', 'ConversionCard',
  'RevenueChart', 'SalesChart', 'CustomerGrowthChart', 'TransactionTable',
  'RegionalSalesChart', 'ProductPerformance', 'NotificationPanel', 'MarketingAnalytics',
];

export default function PersonalizationPanel({ isOpen, onClose, isDark, onToggleTheme }) {
  const [activeTab, setActiveTab] = useState('Appearance');
  const [preferences, setPreferences] = useState({
    accentColor: 'blue',
    pinnedComponents: [],
    hiddenComponents: [],
  });
  const [columnCount, setColumnCount] = useState(3);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    api
      .get('/preferences')
      .then((res) => {
        const prefs = res.data || {};
        setPreferences({
          accentColor: prefs.accentColor || 'blue',
          pinnedComponents: prefs.pinnedComponents || [],
          hiddenComponents: prefs.hiddenComponents || [],
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isOpen]);

  const togglePin = (key) => {
    setPreferences((prev) => {
      const pinned = prev.pinnedComponents.includes(key)
        ? prev.pinnedComponents.filter((c) => c !== key)
        : [...prev.pinnedComponents, key];
      // Can't be both pinned and hidden
      const hidden = prev.hiddenComponents.filter((c) => c !== key);
      return { ...prev, pinnedComponents: pinned, hiddenComponents: hidden };
    });
  };

  const toggleHide = (key) => {
    setPreferences((prev) => {
      const hidden = prev.hiddenComponents.includes(key)
        ? prev.hiddenComponents.filter((c) => c !== key)
        : [...prev.hiddenComponents, key];
      // Can't be both pinned and hidden
      const pinned = prev.pinnedComponents.filter((c) => c !== key);
      return { ...prev, hiddenComponents: hidden, pinnedComponents: pinned };
    });
  };

  const handleSavePreferences = async () => {
    setSaving(true);
    try {
      await api.put('/preferences', {
        pinnedComponents: preferences.pinnedComponents,
        hiddenComponents: preferences.hiddenComponents,
        accentColor: preferences.accentColor,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch {
      // swallow
    } finally {
      setSaving(false);
    }
  };

  const handleSaveLayout = async () => {
    setSaving(true);
    try {
      await api.put('/dashboard/layout', {
        layoutConfig: {
          layout: { type: 'grid', columns: columnCount },
          visibleComponents: DEFAULT_COMPONENTS,
          hiddenComponents: [],
        },
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch {
      // swallow
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="personalization-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-30"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="personalization-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-800 shadow-2xl border-l border-gray-200 dark:border-gray-700 z-40 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                Personalization
              </h3>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
                    activeTab === tab
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-10 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <>
                  {/* Appearance Tab */}
                  {activeTab === 'Appearance' && (
                    <div className="space-y-6">
                      {/* Theme toggle */}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                          Theme
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => !isDark && onToggleTheme?.()}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                              !isDark
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                          >
                            <Sun size={16} /> Light
                          </button>
                          <button
                            onClick={() => isDark && onToggleTheme?.()}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                              isDark
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                          >
                            <Moon size={16} /> Dark
                          </button>
                        </div>
                      </div>

                      {/* Accent color */}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                          Accent Color
                        </p>
                        <div className="flex gap-2">
                          {ACCENT_COLORS.map((color) => (
                            <button
                              key={color.value}
                              onClick={() => {
                                setPreferences((p) => ({ ...p, accentColor: color.value }));
                                api.put('/preferences', { accentColor: color.value }).catch(() => {});
                              }}
                              title={color.name}
                              className={`w-8 h-8 rounded-full ${color.bg} transition-transform hover:scale-110 ${
                                preferences.accentColor === color.value
                                  ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-offset-gray-800 scale-110'
                                  : ''
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Components Tab */}
                  {activeTab === 'Components' && (
                    <div className="space-y-4">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Pin components to always include them. Hide to always exclude.
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {DEFAULT_COMPONENTS.map((key) => {
                          const isPinned = preferences.pinnedComponents.includes(key);
                          const isHidden = preferences.hiddenComponents.includes(key);
                          return (
                            <div
                              key={key}
                              className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/60"
                            >
                              <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                              <div className="flex gap-1 flex-shrink-0">
                                <button
                                  onClick={() => togglePin(key)}
                                  title="Pin"
                                  className={`p-1.5 rounded-lg transition-colors ${
                                    isPinned
                                      ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                                      : 'text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                                  }`}
                                >
                                  <Pin size={12} />
                                </button>
                                <button
                                  onClick={() => toggleHide(key)}
                                  title="Hide"
                                  className={`p-1.5 rounded-lg transition-colors ${
                                    isHidden
                                      ? 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400'
                                      : 'text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                                  }`}
                                >
                                  <EyeOff size={12} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <button
                        onClick={handleSavePreferences}
                        disabled={saving}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
                      >
                        {saveSuccess ? (
                          <>
                            <CheckCircle size={16} /> Saved!
                          </>
                        ) : (
                          <>
                            <Save size={16} /> Save Components
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Layout Tab */}
                  {activeTab === 'Layout' && (
                    <div className="space-y-6">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                          Default Column Count
                        </p>
                        <div className="flex gap-2">
                          {[1, 2, 3].map((n) => (
                            <button
                              key={n}
                              onClick={() => setColumnCount(n)}
                              className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                                columnCount === n
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                  : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                              }`}
                            >
                              {n} Col{n > 1 ? 's' : ''}
                            </button>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={handleSaveLayout}
                        disabled={saving}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
                      >
                        {saveSuccess ? (
                          <>
                            <CheckCircle size={16} /> Saved!
                          </>
                        ) : (
                          <>
                            <Save size={16} /> Save Default Layout
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
