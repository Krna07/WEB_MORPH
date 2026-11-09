import {
  ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip
} from 'recharts';

const clvData = [
  { segment: 'Premium', clv: 4800 },
  { segment: 'Regular', clv: 1200 },
  { segment: 'At-Risk', clv: 380 },
  { segment: 'Churned', clv: 90 },
];

const COLORS = ['#8b5cf6', '#3b82f6', '#f59e0b', '#ef4444'];

export default function CustomerLifetimeValue() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customer Lifetime Value</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={clvData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="segment" tick={{ fontSize: 13 }} />
          <YAxis tickFormatter={(v) => `$${v.toLocaleString()}`} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, 'Avg CLV']} />
          <Bar dataKey="clv" radius={[4, 4, 0, 0]}>
            {clvData.map((entry, i) => (
              <Cell key={entry.segment} fill={COLORS[i]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
