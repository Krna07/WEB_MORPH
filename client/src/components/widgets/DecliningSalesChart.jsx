import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from 'recharts';
import { revenueData } from '../../data/sampleData';

// Simulate monthly revenue for declining products based on their growth rates
const decliningProducts = [
  { name: 'iPad Air', baseRevenue: 98000, growthRate: -0.35 },
  { name: 'HomePod', baseRevenue: 42000, growthRate: -0.70 },
  { name: 'Apple TV', baseRevenue: 24000, growthRate: -0.23 },
];

const chartData = revenueData.map((d, i) => {
  const row = { month: d.month };
  decliningProducts.forEach(p => {
    row[p.name] = Math.round(p.baseRevenue / 12 * (1 + (p.growthRate / 100) * (i - 11)));
  });
  return row;
});

const COLORS = ['#ef4444', '#f97316', '#eab308'];

export default function DecliningSalesChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Declining Products</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, '']} />
          <Legend />
          {decliningProducts.map((p, i) => (
            <Line
              key={p.name}
              type="monotone"
              dataKey={p.name}
              stroke={COLORS[i]}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
