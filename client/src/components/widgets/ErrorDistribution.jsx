import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Insufficient Funds', value: 40 },
  { name: 'Card Declined', value: 25 },
  { name: 'Network Error', value: 20 },
  { name: 'Other', value: 15 },
];

const COLORS = ['#ef4444', '#f97316', '#eab308', '#94a3b8'];

export default function ErrorDistribution() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Error Distribution</h2>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ name, value }) => `${value}%`}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => [`${v}%`, 'Share']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
