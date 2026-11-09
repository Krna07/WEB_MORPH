import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BeforeAfterPanel({ previousLayout, currentLayout, isVisible, onClose }) {
  const before = previousLayout || [];
  const after = currentLayout?.visibleComponents || [];

  // Compute diff
  const added = after.filter(c => !before.includes(c));
  const removed = before.filter(c => !after.includes(c));
  const retained = after.filter(c => before.includes(c));

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bap-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 dark:bg-black/50 z-40"
          />

          {/* Panel */}
          <motion.div
            key="bap-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-96 bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-200 dark:border-gray-700 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Dashboard Transformation</h3>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Intent Badge */}
              {currentLayout?.intent && (
                <div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                    {currentLayout.intent.replace(/_/g, ' ')}
                  </span>
                </div>
              )}

              {/* Description */}
              {currentLayout?.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {currentLayout.description}
                </p>
              )}

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{added.length}</p>
                  <p className="text-xs text-green-700 dark:text-green-500 font-medium mt-0.5">Added</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">{removed.length}</p>
                  <p className="text-xs text-red-700 dark:text-red-500 font-medium mt-0.5">Removed</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{retained.length}</p>
                  <p className="text-xs text-blue-700 dark:text-blue-500 font-medium mt-0.5">Retained</p>
                </div>
              </div>

              {/* Before / After columns */}
              <div className="grid grid-cols-2 gap-4">
                {/* Before */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                    Before
                  </p>
                  <ul className="space-y-1.5">
                    {before.map(key => {
                      const isRemoved = removed.includes(key);
                      return (
                        <li
                          key={key}
                          className={`text-xs px-2.5 py-1.5 rounded-lg ${
                            isRemoved
                              ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 line-through'
                              : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {key}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* After */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                    After
                  </p>
                  <ul className="space-y-1.5">
                    {after.map(key => {
                      const isAdded = added.includes(key);
                      return (
                        <li
                          key={key}
                          className={`text-xs px-2.5 py-1.5 rounded-lg ${
                            isAdded
                              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-medium'
                              : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {key}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
