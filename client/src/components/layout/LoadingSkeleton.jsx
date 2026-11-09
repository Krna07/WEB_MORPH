const gridClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};

export default function LoadingSkeleton({ count = 6, columns = 3 }) {
  const gridClass = gridClasses[columns] || gridClasses[3];
  return (
    <div className={`grid ${gridClass} gap-6`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse"
        >
          <div className="flex justify-between mb-4">
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24" />
              <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-32" />
            </div>
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
          </div>
          <div className="h-24 bg-gray-100 dark:bg-gray-700 rounded-lg" />
        </div>
      ))}
    </div>
  );
}
