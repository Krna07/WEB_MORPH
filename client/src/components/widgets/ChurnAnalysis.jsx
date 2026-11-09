import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip
} from 'recharts';
import { customerGrowthData } from '../../data/sampleData';

const churnRate = customerGrowthData.map(d => ({
  month: d.month,
  rate: +((d.churned / d.customers) * 100).toFixed(2),
}));

const highRisk = [
  { name: 'Alex Turner', lastPurchase: '2024-10-15', probability: 87 },
  { name: 'Nina Patel', lastPurchase: '2024-10-22', probability: 82 },
  { name: 'Carlos Rivera', lastPurchase: '2024-11-01', probability: 76 },
  { name: 'Priya Sharma', lastPurchase: '2024-11-08', probability: 71 },
  { name: 'Tom Bradley', lastPurchase: '2024-11-14', probability: 65 },
];

export default function ChurnAnalysis() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Churn Analysis</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={churnRate} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis unit="%" tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => [`${v}%`, 'Churn Rate']} />
          <Line type="monotone" dataKey="rate" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">High-Risk Customers</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-1.5 font-medium">Customer</th>
              <th className="text-left py-1.5 font-medium">Last Purchase</th>
              <th className="text-right py-1.5 font-medium">Churn Prob.</th>
            </tr>
          </thead>
          <tbody>
            {highRisk.map(c => (
              <tr key={c.name} className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-1.5 text-gray-900 dark:text-white">{c.name}</td>
                <td className="py-1.5 text-gray-500 dark:text-gray-400">{c.lastPurchase}</td>
                <td className="py-1.5 text-right">
                  <span className={`font-medium ${c.probability >= 80 ? 'text-red-600' : 'text-amber-500'}`}>
                    {c.probability}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
