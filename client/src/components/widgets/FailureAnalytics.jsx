import { AlertTriangle } from 'lucide-react';

const stats = [
  { label: 'Failed Today', value: '6', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
  { label: 'Failure Rate', value: '8.2%', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  { label: 'Avg Failed Amount', value: '$588', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
  { label: 'Recovery Rate', value: '34%', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
];

export default function FailureAnalytics() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={20} className="text-red-500" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Failure Analytics</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {stats.map(({ label, value, color, bg }) => (
          <div key={label} className={`${bg} rounded-lg p-4`}>
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
