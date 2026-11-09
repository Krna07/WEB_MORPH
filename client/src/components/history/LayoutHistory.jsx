import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, History } from 'lucide-react';
import api from '../../api/axios';
import EmptyState from '../common/EmptyState';

const INTENT_BADGE_COLORS = {
  transaction_investigation: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  revenue_analysis: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  customer_analysis: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  product_performance: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  regional_sales: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
};

const formatTime = (timestamp) => {
  const diff = Date.now() - new Date(timestamp).getTime();
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return new Date(timestamp).toLocaleDateString();
};

export default function LayoutHistory({ isOpen, onClose, onRestoreLayout }) {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    api
      .get('/workspaces')
      .then((res) => setWorkspaces(res.data))
      .catch(() => setWorkspaces([]))
      .finally(() => setLoading(false));
  }, [isOpen]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    setDeletingId(id);
    try {
      await api.delete(`/workspaces/${id}`);
      setWorkspaces((prev) => prev.filter((w) => w._id !== id));
    } catch {
      // swallow
    } finally {
      setDeletingId(null);
    }
  };

  const handleRestore = (workspace) => {
    onRestoreLayout(workspace.layoutConfig);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="history-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-30"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="history-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-800 shadow-2xl border-l border-gray-200 dark:border-gray-700 z-40 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                Workspace History
              </h3>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-16 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : workspaces.length === 0 ? (
                <EmptyState
                  icon={History}
                  title="No saved workspaces"
                  description="Transformed workspaces will appear here so you can restore them later."
                />
              ) : (
                <div className="space-y-2">
                  {workspaces.map((workspace) => {
                    const badgeClass =
                      INTENT_BADGE_COLORS[workspace.layoutConfig?.intent] ||
                      'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';

                    return (
                      <motion.button
                        key={workspace._id}
                        layout
                        onClick={() => handleRestore(workspace)}
                        className="w-full text-left px-3 py-3 rounded-lg bg-gray-50 dark:bg-gray-700/60 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-transparent hover:border-blue-200 dark:hover:border-blue-700 transition-all group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                              {workspace.title || workspace.layoutConfig?.taskTitle || 'Untitled'}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              {workspace.layoutConfig?.intent && (
                                <span
                                  className={`inline-block px-1.5 py-0.5 rounded text-xs font-medium ${badgeClass}`}
                                >
                                  {workspace.layoutConfig.intent.replace(/_/g, ' ')}
                                </span>
                              )}
                              <span className="text-xs text-gray-400 dark:text-gray-500">
                                {formatTime(workspace.timestamp || workspace.createdAt)}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => handleDelete(e, workspace._id)}
                            disabled={deletingId === workspace._id}
                            className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all disabled:opacity-50"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
