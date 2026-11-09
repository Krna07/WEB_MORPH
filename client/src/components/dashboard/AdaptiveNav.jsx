import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart2, Users, ShoppingCart, Package, CreditCard,
  FileText, Settings, RotateCcw, Zap, ChevronLeft, ChevronRight
} from 'lucide-react';

const DEFAULT_NAV = [
  { label: 'Overview', icon: BarChart2 },
  { label: 'Sales', icon: ShoppingCart },
  { label: 'Customers', icon: Users },
  { label: 'Products', icon: Package },
  { label: 'Transactions', icon: CreditCard },
  { label: 'Reports', icon: FileText },
  { label: 'Settings', icon: Settings },
];

export default function AdaptiveNav({
  navItems,
  activeItem,
  onItemClick,
  onReset,
  taskTitle,
  isTransformed,
  isOpen,
  onToggle,
  userName,
}) {
  // Determine which items to render
  // When isTransformed=true and navItems are provided (array of strings), use them
  // When isTransformed=false, use DEFAULT_NAV with icons
  const items = isTransformed && navItems?.length
    ? navItems.map(item =>
        typeof item === 'string'
          ? { label: item, key: item.toLowerCase().replace(/\s+/g, '_'), icon: null }
          : { label: item.label, key: item.key || item.label.toLowerCase().replace(/\s+/g, '_'), icon: item.icon || null }
      )
    : DEFAULT_NAV.map(n => ({ ...n, key: n.label.toLowerCase() }));

  // User initials from userName
  const initials = userName
    ? userName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  return (
    <aside
      className={`flex-shrink-0 flex flex-col bg-gray-900 dark:bg-gray-950 text-white transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-800 dark:border-gray-700">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
          <Zap size={16} className="text-white" />
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.span
              key="brand-text"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="font-bold text-lg tracking-tight whitespace-nowrap"
            >
              WebMorph
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Task Workspace Badge */}
      <AnimatePresence>
        {isTransformed && isOpen && (
          <motion.div
            key="task-badge"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="px-4 py-2 bg-blue-900/40 border-b border-blue-800/50"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Task Workspace
            </span>
            {taskTitle && (
              <p className="text-xs text-blue-300 mt-0.5 truncate">{taskTitle}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav Items */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {items.map(item => {
            const Icon = item.icon;
            const isActive = activeItem === item.label || activeItem === item.key;
            return (
              <motion.button
                key={item.key}
                layout
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                onClick={() => onItemClick?.(item.label)}
                title={!isOpen ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-400 hover:bg-gray-800 dark:hover:bg-gray-800 hover:text-white'
                }`}
              >
                {Icon
                  ? <Icon size={18} className="flex-shrink-0" />
                  : (
                    <span className="w-[18px] h-[18px] flex-shrink-0 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    </span>
                  )
                }
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      key={`label-${item.key}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="truncate text-left"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </nav>

      {/* Bottom: Reset + User Avatar */}
      <div className="border-t border-gray-800 dark:border-gray-700">
        {/* Reset button — only when transformed */}
        <AnimatePresence>
          {isTransformed && onReset && (
            <motion.button
              key="reset-btn"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onReset}
              title={!isOpen ? 'Reset layout' : undefined}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-orange-400 hover:bg-gray-800 dark:hover:bg-gray-800 hover:text-orange-300 transition-colors"
            >
              <RotateCcw size={18} className="flex-shrink-0" />
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    key="reset-label"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="truncate"
                  >
                    Return to Default
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          )}
        </AnimatePresence>

        {/* User Avatar */}
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">
            {initials}
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.span
                key="user-name"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-sm text-gray-300 truncate"
              >
                {userName || 'User'}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center py-3 border-t border-gray-800 dark:border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors"
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>
    </aside>
  );
}
