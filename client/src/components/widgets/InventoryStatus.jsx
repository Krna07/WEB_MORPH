const inventory = [
  { name: 'MacBook Pro', stock: 284 },
  { name: 'iPhone 15', stock: 248 },
  { name: 'AirPods Pro', stock: 680 },
  { name: 'iPad Air', stock: 142 },
  { name: 'Apple Watch', stock: 320 },
  { name: 'HomePod', stock: 12 },
  { name: 'Mac Mini', stock: 68 },
  { name: 'Apple TV', stock: 94 },
];

const MAX_STOCK = 700;

function getStatus(stock) {
  if (stock < 50) return { label: 'Low Stock', classes: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' };
  if (stock < 100) return { label: 'Medium', classes: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' };
  return { label: 'OK', classes: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' };
}

function barColor(stock) {
  if (stock < 50) return 'bg-red-500';
  if (stock < 100) return 'bg-amber-500';
  return 'bg-green-500';
}

export default function InventoryStatus() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Inventory Status</h2>
      <div className="space-y-4">
        {inventory.map(item => {
          const status = getStatus(item.stock);
          const pct = Math.min(100, Math.round((item.stock / MAX_STOCK) * 100));
          return (
            <div key={item.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.stock} units</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status.classes}`}>
                    {status.label}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${barColor(item.stock)}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
