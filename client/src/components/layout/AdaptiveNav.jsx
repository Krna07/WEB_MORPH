import { useState } from 'react';
import {
  LayoutDashboard, TrendingUp, Users, ShoppingBag,
  CreditCard, BarChart2, Settings, ChevronLeft, ChevronRight, Zap
} from 'lucide-react';

const defaultNavItems = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'sales', label: 'Sales', icon: TrendingUp },
  { key: 'customers', label: 'Customers', icon: Users },
  { key: 'products', label: 'Products', icon: ShoppingBag },
  { key: 'transactions', label: 'Transactions', icon: CreditCard },
  { key: 'reports', label: 'Reports', icon: BarChart2 },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export default function AdaptiveNav({ navItems, isOpen, onToggle }) {
  const items = navItems?.length ? navItems : defaultNavItems;
  const [active, setActive] = useState('overview');

  return (
    <aside
      className={`flex-shrink-0 flex flex-col bg-gray-900 text-white transition-all duration-300 ${
        isOpen ? 'w-56' : 'w-16'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-gray-800">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
          <Zap size={16} className="text-white" />
        </div>
        {isOpen && <span className="font-bold text-lg tracking-tight">WebMorph</span>}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
        {items.map(item => {
          const Icon = item.icon || LayoutDashboard;
          const key = item.key || item;
          const label = item.label || item;
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              title={!isOpen ? label : undefined}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors rounded-none ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {isOpen && <span className="truncate">{label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center py-3 border-t border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </aside>
  );
}
