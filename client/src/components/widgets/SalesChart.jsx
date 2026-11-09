import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from 'recharts';
import { salesData } from '../../data/sampleData';

export default function SalesChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sales Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={salesData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="week" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="Electronics" fill="#3b82f6" radius={[2, 2, 0, 0]} />
          <Bar dataKey="Clothing" fill="#10b981" radius={[2, 2, 0, 0]} />
          <Bar dataKey="Food" fill="#f59e0b" radius={[2, 2, 0, 0]} />
          <Bar dataKey="Furniture" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
