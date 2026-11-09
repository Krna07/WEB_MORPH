export default function LoadingSkeleton({ count = 6, columns = 3 }) {
  const gridClass =
    columns === 1
      ? 'grid-cols-1'
      : columns === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid ${gridClass} gap-6`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow animate-pulse">
          <div className="flex justify-between mb-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          </div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4" />
          <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded" />
        </div>
      ))}
    </div>
  );
}
