import { Layers, X } from 'lucide-react';

export default function TaskBanner({ taskTitle, description, onReset, showComparison, onToggleComparison }) {
  return (
    <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
          <Layers size={16} className="text-white" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100">{taskTitle}</h3>
          {description && <p className="text-sm text-blue-700 dark:text-blue-300 mt-0.5">{description}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {showComparison && (
          <button
            onClick={onToggleComparison}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Before/After
          </button>
        )}
        {onReset && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-white dark:bg-gray-700 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600"
          >
            <X size={12} /> Reset
          </button>
        )}
      </div>
    </div>
  );
}
