import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line } from 'recharts';
import { kpiData, revenueData } from '../../data/sampleData';

const sparkData = revenueData.slice(6); // last 6 months

export default function RevenueCard() {
  const { totalRevenue, revenueGrowth } = kpiData;
  const isPositive = revenueGrowth >= 0;

  return (
    <div className="rounded-xl shadow-lg p-6 bg-white dark:bg-gray-800 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
            ${totalRevenue.toLocaleString()}
          </p>
          <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{isPositive ? '+' : ''}{revenueGrowth}% vs last month</span>
          </div>
        </div>
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
          <DollarSign size={22} className="text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      <div className="h-16 w-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparkData}>
            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
