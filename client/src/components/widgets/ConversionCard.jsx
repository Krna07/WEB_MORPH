import { Target, TrendingUp, TrendingDown } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { kpiData, revenueData } from '../../data/sampleData';

const sparkData = revenueData.slice(6).map(d => ({
  ...d,
  rate: +(2.8 + Math.random() * 1.2).toFixed(2)
}));

export default function ConversionCard() {
  const { conversionRate, conversionGrowth } = kpiData;
  const isPositive = conversionGrowth >= 0;

  return (
    <div className="rounded-xl shadow-lg p-6 bg-white dark:bg-gray-800 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Conversion Rate</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
            {conversionRate}%
          </p>
          <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{isPositive ? '+' : ''}{conversionGrowth}% vs last month</span>
          </div>
        </div>
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
          <Target size={22} className="text-amber-600 dark:text-amber-400" />
        </div>
      </div>
      <div className="h-16 w-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparkData}>
            <defs>
              <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="rate" stroke="#f59e0b" strokeWidth={2} fill="url(#convGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
