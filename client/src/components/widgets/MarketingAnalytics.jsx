import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { marketingData } from '../../data/sampleData';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

export default function MarketingAnalytics() {
  const { channels } = marketingData;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Marketing Analytics</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={channels}
                dataKey="spend"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {channels.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, 'Spend']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 min-w-0 overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 font-medium">Channel</th>
                <th className="text-right py-2 font-medium">Spend</th>
                <th className="text-right py-2 font-medium">Conv.</th>
                <th className="text-right py-2 font-medium">ROI</th>
              </tr>
            </thead>
            <tbody>
              {channels.map((ch, i) => (
                <tr key={ch.name} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-2 text-gray-900 dark:text-white flex items-center gap-2">
                    <span
                      className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: COLORS[i % COLORS.length] }}
                    />
                    {ch.name}
                  </td>
                  <td className="py-2 text-right text-gray-700 dark:text-gray-300">${ch.spend.toLocaleString()}</td>
                  <td className="py-2 text-right text-gray-700 dark:text-gray-300">{ch.conversions.toLocaleString()}</td>
                  <td className="py-2 text-right font-medium text-green-600">{ch.roi}x</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
