import { CheckCircle } from 'lucide-react';

const items = [
  { text: 'Contact customers with failed Debit Card transactions — likely insufficient funds', priority: 'High' },
  { text: 'Retry Card Declined transactions after 24h', priority: 'High' },
  { text: 'Enable automatic retry for Network Error transactions', priority: 'Medium' },
  { text: 'Send payment failure notification emails to affected customers', priority: 'Medium' },
  { text: 'Offer alternative payment methods to affected customers', priority: 'Low' },
];

const priorityColors = {
  High: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Low: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
};

export default function ResolutionPanel() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resolution Recommendations</h2>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
            <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">{item.text}</span>
            <span className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${priorityColors[item.priority]}`}>
              {item.priority}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
