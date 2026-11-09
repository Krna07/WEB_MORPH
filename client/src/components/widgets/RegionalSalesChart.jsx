import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip
} from 'recharts';
import { regionalData } from '../../data/sampleData';

const formatX = (v) => `$${(v / 1000).toFixed(0)}k`;

export default function RegionalSalesChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Regional Sales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          layout="vertical"
          data={regionalData}
          margin={{ top: 10, right: 30, left: 80, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
          <XAxis type="number" tickFormatter={formatX} tick={{ fontSize: 12 }} />
          <YAxis type="category" dataKey="region" tick={{ fontSize: 12 }} width={80} />
          <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, 'Revenue']} />
          <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
