import { AnimatePresence, motion } from 'framer-motion';
import { componentRegistry } from './componentRegistry';

const gridClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};

export default function DashboardLayout({ componentKeys = [], layoutConfig = {} }) {
  const columns = layoutConfig?.columns || 3;
  const gridClass = gridClasses[columns] || gridClasses[3];

  return (
    <div className={`grid ${gridClass} gap-6`}>
      <AnimatePresence mode="popLayout">
        {componentKeys.map(key => {
          const Component = componentRegistry[key];
          if (!Component) return null;
          return (
            <motion.div
              key={key}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Component />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
