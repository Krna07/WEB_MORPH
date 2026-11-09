import {
  ResponsiveContainer, ComposedChart, Bar, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { productData } from '../../data/sampleData';

const formatRevenue = (v) => `$${(v / 1000).toFixed(0)}k`;

export default function ProductPerformance() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Product Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={productData} margin={{ top: 10, right: 30, left: 0, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11 }}
            angle={-35}
            textAnchor="end"
            interval={0}
          />
          <YAxis yAxisId="left" tickFormatter={formatRevenue} tick={{ fontSize: 12 }} />
          <YAxis yAxisId="right" orientation="right" unit="%" tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(v, name) =>
              name === 'revenue' ? [`$${v.toLocaleString()}`, 'Revenue'] : [`${v}%`, 'Margin']
            }
          />
          <Legend />
          <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} name="revenue" />
          <Line yAxisId="right" type="monotone" dataKey="margin" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} name="margin" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
