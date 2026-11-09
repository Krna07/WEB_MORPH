import { X, ArrowRight } from 'lucide-react';

export default function BeforeAfterPanel({ previousLayout, currentLayout, isVisible, onClose }) {
  if (!isVisible) return null;

  const before = previousLayout || [];
  const after = currentLayout?.visibleComponents || [];

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-800 shadow-2xl border-l border-gray-200 dark:border-gray-700 z-40 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Layout Change</h3>
        <button onClick={onClose} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
          <X size={16} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Before</p>
          <ul className="space-y-1">
            {before.map(k => (
              <li key={k} className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-3 py-1.5 rounded-lg">
                {k}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center">
          <ArrowRight size={20} className="text-blue-500" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">After</p>
          <ul className="space-y-1">
            {after.map(k => (
              <li key={k} className="text-sm text-gray-900 dark:text-white bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg">
                {k}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
