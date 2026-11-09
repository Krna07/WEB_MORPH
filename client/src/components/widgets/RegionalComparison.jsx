import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from 'recharts';
import { regionalData } from '../../data/sampleData';

const compData = regionalData.map(r => ({
  region: r.region.split(' ')[0], // Shorten label for readability
  'This Month': r.revenue,
  'Last Month': Math.round(r.revenue * 0.91),
}));

const formatY = (v) => `$${(v / 1000).toFixed(0)}k`;

export default function RegionalComparison() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Regional Comparison: This Month vs Last Month
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={compData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="region" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={formatY} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, '']} />
          <Legend />
          <Bar dataKey="This Month" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Last Month" fill="#93c5fd" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
