import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis,
  Radar
} from 'recharts';

const stats = [
  { label: 'Avg Login Frequency', value: '4.2/week', icon: '📅' },
  { label: 'Feature Adoption', value: '68%', icon: '🚀' },
  { label: 'Support Ticket Rate', value: '2.1%', icon: '🎫' },
  { label: 'NPS Score', value: '72', icon: '⭐' },
];

const radarData = [
  { axis: 'Logins', value: 84 },
  { axis: 'Features', value: 68 },
  { axis: 'Support', value: 79 },
  { axis: 'Retention', value: 91 },
  { axis: 'Satisfaction', value: 72 },
];

export default function EngagementMetrics() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Engagement Metrics</h2>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {stats.map(s => (
          <div key={s.label} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{s.value}</p>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <RadarChart data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="axis" tick={{ fontSize: 12 }} />
          <Radar name="Score" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
