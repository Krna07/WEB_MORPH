import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Cell
} from 'recharts';

const reps = [
  { name: 'Alice', revenue: 284000 },
  { name: 'Bob', revenue: 241000 },
  { name: 'Carol', revenue: 218000 },
  { name: 'David', revenue: 196000 },
  { name: 'Emma', revenue: 184000 },
  { name: 'Frank', revenue: 162000 },
  { name: 'Grace', revenue: 148000 },
  { name: 'Henry', revenue: 132000 },
];

const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#f43f5e', '#f97316', '#eab308'];

export default function SalesRepPerformance() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sales Rep Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          layout="vertical"
          data={reps}
          margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
          <XAxis type="number" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 13 }} width={50} />
          <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, 'Revenue']} />
          <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
            {reps.map((rep, i) => (
              <Cell key={rep.name} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
