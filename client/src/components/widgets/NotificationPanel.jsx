import { useState } from 'react';
import { AlertTriangle, CheckCircle, Info, Bell } from 'lucide-react';
import { notifications as initialNotifications } from '../../data/sampleData';

const iconMap = {
  warning: <AlertTriangle size={16} className="text-amber-500" />,
  success: <CheckCircle size={16} className="text-green-500" />,
  info: <Info size={16} className="text-blue-500" />,
};

export default function NotificationPanel() {
  const [notes, setNotes] = useState(initialNotifications);

  const unreadCount = notes.filter(n => !n.read).length;

  const markAllRead = () => setNotes(notes.map(n => ({ ...n, read: true })));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell size={20} className="text-gray-600 dark:text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h2>
          {unreadCount > 0 && (
            <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Mark all read
          </button>
        )}
      </div>

      <ul className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {notes.map(n => (
          <li
            key={n.id}
            className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
              !n.read
                ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800'
                : 'bg-gray-50 dark:bg-gray-700/50'
            }`}
          >
            <span className="mt-0.5 flex-shrink-0">{iconMap[n.type]}</span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${!n.read ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                {n.message}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{n.time}</p>
            </div>
            {!n.read && (
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
