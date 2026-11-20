import { AnimatePresence, motion } from 'framer-motion';
import { componentRegistry } from './componentRegistry';
import InsightBadge from '../common/InsightBadge';

const gridClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};

/**
 * DashboardLayout
 *
 * Props:
 *   componentKeys {string[]}  — ordered list of component names to render
 *   layoutConfig  {object}    — layout config (columns, etc.)
 *   insights      {object}    — optional map of componentName → { insight, highlight, badge }
 */
export default function DashboardLayout({ componentKeys = [], layoutConfig = {}, insights = {} }) {
  const columns = layoutConfig?.columns || 3;
  const gridClass = gridClasses[columns] || gridClasses[3];

  return (
    <div className={`grid ${gridClass} gap-6`}>
      <AnimatePresence mode="popLayout">
        {componentKeys.map(key => {
          const Component = componentRegistry[key];
          if (!Component) return null;
          const widgetInsight = insights?.[key];
          return (
            <motion.div
              key={key}
              layout
              initial={{opacity: 0, scale: 0.95, y: 20}}
              animate={{opacity: 1, scale: 1, y: 0}}
              exit={{opacity: 0, scale: 0.95, y: -20}}
              transition={{duration: 0.3, ease: 'easeOut'}}
            >
              <Component />
              {widgetInsight && (
                <InsightBadge
                  insight={widgetInsight.insight}
                  highlight={widgetInsight.highlight}
                  badge={widgetInsight.badge}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
