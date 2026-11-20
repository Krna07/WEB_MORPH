import { motion } from 'framer-motion';

const HIGHLIGHT_STYLES = {
  critical: 'border-red-500 bg-red-50 dark:bg-red-950/30',
  warning:  'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30',
  positive: 'border-green-500 bg-green-50 dark:bg-green-950/30',
  info:     'border-blue-500 bg-blue-50 dark:bg-blue-950/30',
};

const BADGE_STYLES = {
  critical: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300',
  warning:  'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300',
  positive: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
  info:     'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
};

/**
 * InsightBadge — rendered below a widget when AI has generated an insight.
 *
 * Props:
 *   insight   {string}  1-2 sentence insight text
 *   highlight {string}  'critical' | 'warning' | 'positive' | 'info'
 *   badge     {string}  short label e.g. '↓ 23%' or '847 failed'
 */
export default function InsightBadge({ insight, highlight = 'info', badge }) {
  if (!insight) return null;

  const borderBg = HIGHLIGHT_STYLES[highlight] || HIGHLIGHT_STYLES.info;
  const badgeStyle = BADGE_STYLES[highlight] || BADGE_STYLES.info;

  return (
    <motion.div
      initial={{opacity: 0, y: 8}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.25, delay: 0.2}}
      className={`mt-2 flex items-start gap-3 rounded-xl border-l-4 px-3 py-2 ${borderBg}`}
    >
      <p className="flex-1 text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
        {insight}
      </p>
      {badge && (
        <span className={`flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${badgeStyle}`}>
          {badge}
        </span>
      )}
    </motion.div>
  );
}
