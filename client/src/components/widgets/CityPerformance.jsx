import { TrendingUp, TrendingDown } from 'lucide-react';

const cities = [
  { city: 'New York', revenue: 84000, orders: 580, growth: 14.2 },
  { city: 'London', revenue: 72000, orders: 490, growth: 9.8 },
  { city: 'Tokyo', revenue: 68000, orders: 460, growth: 18.4 },
  { city: 'Los Angeles', revenue: 61000, orders: 410, growth: 11.7 },
  { city: 'Sydney', revenue: 54000, orders: 365, growth: 16.3 },
  { city: 'Toronto', revenue: 48000, orders: 320, growth: 8.2 },
  { city: 'Singapore', revenue: 44000, orders: 295, growth: 22.6 },
  { city: 'Dubai', revenue: 38000, orders: 254, growth: 19.1 },
  { city: 'Berlin', revenue: 34000, orders: 228, growth: -3.4 },
  { city: 'Paris', revenue: 31000, orders: 208, growth: 5.9 },
];

export default function CityPerformance() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Cities by Revenue</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2 px-2 font-medium">#</th>
              <th className="text-left py-2 px-2 font-medium">City</th>
              <th className="text-right py-2 px-2 font-medium">Revenue</th>
              <th className="text-right py-2 px-2 font-medium">Orders</th>
              <th className="text-right py-2 px-2 font-medium">Growth</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((c, i) => (
              <tr key={c.city} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="py-2 px-2 text-gray-400 font-mono">{i + 1}</td>
                <td className="py-2 px-2 font-medium text-gray-900 dark:text-white">{c.city}</td>
                <td className="py-2 px-2 text-right text-gray-700 dark:text-gray-300">${(c.revenue / 1000).toFixed(0)}k</td>
                <td className="py-2 px-2 text-right text-gray-500 dark:text-gray-400">{c.orders}</td>
                <td className={`py-2 px-2 text-right font-medium ${c.growth >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  <span className="inline-flex items-center gap-0.5">
                    {c.growth >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                    {c.growth >= 0 ? '+' : ''}{c.growth}%
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
