import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip
} from 'recharts';
import { revenueData } from '../../data/sampleData';

const formatY = (v) => `$${(v / 1000).toFixed(0)}k`;

export default function RevenueChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Analytics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={revenueData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={formatY} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, 'Revenue']} />
          <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#revGrad)" />
          <Area type="monotone" dataKey="target" stroke="#94a3b8" strokeWidth={1} strokeDasharray="5 5" fill="none" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
