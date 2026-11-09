import {
  ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip
} from 'recharts';
import { productData } from '../../data/sampleData';

function barColor(margin) {
  if (margin > 30) return '#22c55e';
  if (margin >= 20) return '#eab308';
  return '#ef4444';
}

export default function ProfitMarginChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Profit Margins</h2>
      <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-green-500 inline-block" /> &gt;30%</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-yellow-400 inline-block" /> 20–30%</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-red-500 inline-block" /> &lt;20%</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={productData} margin={{ top: 10, right: 20, left: 0, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-35} textAnchor="end" interval={0} />
          <YAxis unit="%" tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => [`${v}%`, 'Margin']} />
          <Bar dataKey="margin" radius={[4, 4, 0, 0]}>
            {productData.map(p => (
              <Cell key={p.name} fill={barColor(p.margin)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
