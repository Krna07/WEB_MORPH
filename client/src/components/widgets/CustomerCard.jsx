import { Users, TrendingUp, TrendingDown } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line } from 'recharts';
import { kpiData, customerGrowthData } from '../../data/sampleData';

const sparkData = customerGrowthData.slice(6);

export default function CustomerCard() {
  const { activeCustomers, customerGrowth } = kpiData;
  const isPositive = customerGrowth >= 0;

  return (
    <div className="rounded-xl shadow-lg p-6 bg-white dark:bg-gray-800 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Customers</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
            {activeCustomers.toLocaleString()}
          </p>
          <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{isPositive ? '+' : ''}{customerGrowth}% vs last month</span>
          </div>
        </div>
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
          <Users size={22} className="text-purple-600 dark:text-purple-400" />
        </div>
      </div>
      <div className="h-16 w-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparkData}>
            <Line type="monotone" dataKey="customers" stroke="#a855f7" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
