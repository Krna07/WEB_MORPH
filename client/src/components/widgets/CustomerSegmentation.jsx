import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { kpiData } from '../../data/sampleData';

const total = kpiData.activeCustomers; // 3847

const segments = [
  { name: 'Regular', percent: 50, color: '#3b82f6' },
  { name: 'Premium', percent: 20, color: '#8b5cf6' },
  { name: 'At-Risk', percent: 20, color: '#f59e0b' },
  { name: 'Churned', percent: 10, color: '#ef4444' },
];

const data = segments.map(s => ({
  ...s,
  value: Math.round(total * s.percent / 100),
}));

export default function CustomerSegmentation() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customer Segmentation</h2>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {data.map((seg, i) => (
              <Cell key={i} fill={seg.color} />
            ))}
          </Pie>
          <Tooltip formatter={(v, name) => [`${v.toLocaleString()} customers`, name]} />
          <Legend formatter={(name) => {
            const seg = data.find(d => d.name === name);
            return `${name} (${seg?.value?.toLocaleString()})`;
          }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
