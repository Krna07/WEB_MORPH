import {
  ResponsiveContainer, ComposedChart, Area, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { customerGrowthData } from '../../data/sampleData';

export default function CustomerGrowthChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customer Growth</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={customerGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Area yAxisId="left" type="monotone" dataKey="customers" fill="#3b82f620" stroke="#3b82f6" strokeWidth={2} name="Customers" />
          <Line yAxisId="right" type="monotone" dataKey="churned" stroke="#ef4444" strokeWidth={2} dot={false} name="Churned" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
