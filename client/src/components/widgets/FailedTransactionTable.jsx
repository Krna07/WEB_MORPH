import { transactions } from '../../data/sampleData';

const reasonMap = {
  'Debit Card': 'Insufficient Funds',
  'Credit Card': 'Card Declined',
  'PayPal': 'Network Error',
};

const failed = transactions.filter(t => t.status === 'failed');

export default function FailedTransactionTable() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Failed Transactions
        <span className="ml-2 text-sm font-normal text-red-500">({failed.length} total)</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2 px-2 font-medium">ID</th>
              <th className="text-left py-2 px-2 font-medium">Customer</th>
              <th className="text-right py-2 px-2 font-medium">Amount</th>
              <th className="text-left py-2 px-2 font-medium">Date</th>
              <th className="text-left py-2 px-2 font-medium">Method</th>
              <th className="text-left py-2 px-2 font-medium">Reason</th>
              <th className="text-center py-2 px-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {failed.map(t => (
              <tr key={t.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="py-2 px-2 font-mono text-xs text-gray-500">{t.id}</td>
                <td className="py-2 px-2 text-gray-900 dark:text-white">{t.customer}</td>
                <td className="py-2 px-2 text-right text-gray-700 dark:text-gray-300">${t.amount.toFixed(2)}</td>
                <td className="py-2 px-2 text-gray-500 dark:text-gray-400">{t.date}</td>
                <td className="py-2 px-2 text-gray-700 dark:text-gray-300">{t.method}</td>
                <td className="py-2 px-2 text-gray-700 dark:text-gray-300">{reasonMap[t.method] || 'Unknown'}</td>
                <td className="py-2 px-2 text-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                    Failed
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
