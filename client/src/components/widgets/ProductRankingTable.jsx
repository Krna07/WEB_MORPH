import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { productData } from '../../data/sampleData';

export default function ProductRankingTable() {
  const [sortKey, setSortKey] = useState('revenue');
  const [sortDir, setSortDir] = useState('desc');

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const sorted = [...productData].sort((a, b) =>
    sortDir === 'asc' ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]
  );

  const SortIcon = ({ k }) =>
    sortKey === k
      ? sortDir === 'asc' ? <ChevronUp size={14} className="inline ml-0.5" /> : <ChevronDown size={14} className="inline ml-0.5" />
      : null;

  const cols = [
    { key: 'revenue', label: 'Revenue' },
    { key: 'units', label: 'Units' },
    { key: 'growth', label: 'Growth' },
    { key: 'margin', label: 'Margin' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Product Rankings</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2 px-2 font-medium">#</th>
              <th className="text-left py-2 px-2 font-medium">Product</th>
              {cols.map(({ key, label }) => (
                <th
                  key={key}
                  className="text-right py-2 px-2 font-medium cursor-pointer select-none hover:text-gray-900 dark:hover:text-white transition-colors"
                  onClick={() => handleSort(key)}
                >
                  {label}<SortIcon k={key} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => (
              <tr key={p.name} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="py-2 px-2 text-gray-400 font-mono">{i + 1}</td>
                <td className="py-2 px-2 text-gray-900 dark:text-white font-medium">{p.name}</td>
                <td className="py-2 px-2 text-right text-gray-700 dark:text-gray-300">${p.revenue.toLocaleString()}</td>
                <td className="py-2 px-2 text-right text-gray-700 dark:text-gray-300">{p.units.toLocaleString()}</td>
                <td className={`py-2 px-2 text-right font-medium ${p.growth >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {p.growth >= 0 ? '+' : ''}{p.growth}%
                </td>
                <td className="py-2 px-2 text-right text-gray-700 dark:text-gray-300">{p.margin}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
