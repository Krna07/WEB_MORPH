import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, X, WifiOff, KeyRound, Gauge, ShieldAlert, Bot } from 'lucide-react';

const WARNING_CONFIG = {
  no_api_key: {
    icon: KeyRound,
    title: 'Gemini API Key Missing',
    color: 'yellow',
  },
  invalid_api_key: {
    icon: KeyRound,
    title: 'Invalid Gemini API Key',
    color: 'red',
  },
  quota_exceeded: {
    icon: Gauge,
    title: 'Gemini Quota Exceeded',
    color: 'orange',
  },
  network_error: {
    icon: WifiOff,
    title: 'Cannot Reach Gemini API',
    color: 'red',
  },
  safety_blocked: {
    icon: ShieldAlert,
    title: 'Gemini Request Blocked',
    color: 'orange',
  },
  api_error: {
    icon: AlertTriangle,
    title: 'Gemini AI Error',
    color: 'yellow',
  },
};

const COLOR_CLASSES = {
  yellow: {
    wrapper: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700',
    icon: 'text-yellow-600 dark:text-yellow-400',
    iconBg: 'bg-yellow-100 dark:bg-yellow-900/40',
    title: 'text-yellow-800 dark:text-yellow-200',
    message: 'text-yellow-700 dark:text-yellow-300',
    badge: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300',
    close: 'text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-200',
  },
  red: {
    wrapper: 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700',
    icon: 'text-red-600 dark:text-red-400',
    iconBg: 'bg-red-100 dark:bg-red-900/40',
    title: 'text-red-800 dark:text-red-200',
    message: 'text-red-700 dark:text-red-300',
    badge: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
    close: 'text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200',
  },
  orange: {
    wrapper: 'bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700',
    icon: 'text-orange-600 dark:text-orange-400',
    iconBg: 'bg-orange-100 dark:bg-orange-900/40',
    title: 'text-orange-800 dark:text-orange-200',
    message: 'text-orange-700 dark:text-orange-300',
    badge: 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300',
    close: 'text-orange-500 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-200',
  },
};

/**
 * AIWarningToast
 *
 * Props:
 *  - warning: { aiWarning: string, aiWarningMessage: string } | null
 *  - onDismiss: () => void
 */
export default function AIWarningToast({ warning, onDismiss }) {
  if (!warning?.aiWarning) return null;

  const config = WARNING_CONFIG[warning.aiWarning] || WARNING_CONFIG.api_error;
  const colors = COLOR_CLASSES[config.color];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {warning && (
        <motion.div
          key="ai-warning-toast"
          initial={{ opacity: 0, y: -16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.97 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`mb-4 flex items-start gap-3 p-4 rounded-xl border ${colors.wrapper} shadow-sm`}
          role="alert"
        >
          {/* Icon */}
          <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${colors.iconBg} flex items-center justify-center`}>
            <Icon size={16} className={colors.icon} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className={`text-sm font-semibold ${colors.title}`}>{config.title}</p>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colors.badge}`}>
                <Bot size={10} />
                Using keyword fallback
              </span>
            </div>
            <p className={`mt-0.5 text-sm ${colors.message}`}>{warning.aiWarningMessage}</p>
          </div>

          {/* Dismiss */}
          <button
            onClick={onDismiss}
            className={`flex-shrink-0 p-1 rounded-lg transition-colors ${colors.close}`}
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
