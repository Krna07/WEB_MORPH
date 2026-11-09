import { ShoppingCart, TrendingUp, TrendingDown } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar } from 'recharts';
import { kpiData, revenueData } from '../../data/sampleData';

const sparkData = revenueData.slice(6).map(d => ({ ...d, orders: Math.round(d.revenue / 15) }));

export default function OrdersCard() {
  const { totalOrders, orderGrowth } = kpiData;
  const isPositive = orderGrowth >= 0;

  return (
    <div className="rounded-xl shadow-lg p-6 bg-white dark:bg-gray-800 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
            {totalOrders.toLocaleString()}
          </p>
          <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{isPositive ? '+' : ''}{orderGrowth}% vs last month</span>
          </div>
        </div>
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
          <ShoppingCart size={22} className="text-green-600 dark:text-green-400" />
        </div>
      </div>
      <div className="h-16 w-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sparkData}>
            <Bar dataKey="orders" fill="#22c55e" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
