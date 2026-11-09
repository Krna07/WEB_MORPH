import { TrendingUp, TrendingDown } from 'lucide-react';
import { regionalData } from '../../data/sampleData';

function borderColor(growth) {
  if (growth >= 25) return 'border-blue-600';
  if (growth >= 15) return 'border-blue-400';
  if (growth >= 10) return 'border-blue-300';
  return 'border-blue-200';
}

export default function RegionalMap() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Regional Performance Map</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {regionalData.map(r => (
          <div
            key={r.region}
            className={`rounded-lg border-l-4 ${borderColor(r.growth)} bg-gray-50 dark:bg-gray-700 p-4`}
          >
            <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{r.region}</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
              ${(r.revenue / 1000).toFixed(0)}k
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{r.orders.toLocaleString()} orders</p>
            <div className={`flex items-center gap-0.5 mt-1 text-sm font-medium ${r.growth >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              {r.growth >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{r.growth >= 0 ? '+' : ''}{r.growth}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
