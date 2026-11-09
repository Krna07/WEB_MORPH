import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { transactions } from '../../data/sampleData';

const PAGE_SIZE = 10;

const tabs = ['All', 'Completed', 'Failed', 'Pending'];

const statusStyle = {
  completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
};

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function TransactionTable() {
  const [activeTab, setActiveTab] = useState('All');
  const [page, setPage] = useState(1);

  const filtered = activeTab === 'All'
    ? transactions
    : transactions.filter(t => t.status === activeTab.toLowerCase());

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleTab = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Transactions</h2>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-4 border-b border-gray-200 dark:border-gray-700">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => handleTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === tab
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2 px-2 font-medium">ID</th>
              <th className="text-left py-2 px-2 font-medium">Customer</th>
              <th className="text-right py-2 px-2 font-medium">Amount</th>
              <th className="text-center py-2 px-2 font-medium">Status</th>
              <th className="text-left py-2 px-2 font-medium">Date</th>
              <th className="text-left py-2 px-2 font-medium">Method</th>
              <th className="text-left py-2 px-2 font-medium">Category</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(t => (
              <tr key={t.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="py-2 px-2 font-mono text-xs text-gray-400">{t.id}</td>
                <td className="py-2 px-2 text-gray-900 dark:text-white">{t.customer}</td>
                <td className="py-2 px-2 text-right font-medium text-gray-900 dark:text-white">
                  ${t.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
                <td className="py-2 px-2 text-center">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[t.status]}`}>
                    {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                  </span>
                </td>
                <td className="py-2 px-2 text-gray-500 dark:text-gray-400">{formatDate(t.date)}</td>
                <td className="py-2 px-2 text-gray-700 dark:text-gray-300">{t.method}</td>
                <td className="py-2 px-2 text-gray-500 dark:text-gray-400">{t.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
          <span>
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-2">{page} / {totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
