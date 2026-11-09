import { useState } from 'react';
import { Search, Sparkles, Loader2 } from 'lucide-react';

const SUGGESTIONS = [
  'Investigate today\'s failed transactions',
  'Analyze revenue growth this month',
  'Find customers who stopped purchasing',
  'Compare this month vs last month performance',
  'Show declining products',
  'Prepare a regional sales report',
];

export default function IntentBar({ onLayoutChange, isLoading }) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    onLayoutChange && onLayoutChange(query);
    setShowSuggestions(false);
  };

  const handleSuggestion = (s) => {
    setQuery(s);
    setShowSuggestions(false);
    onLayoutChange && onLayoutChange(s);
  };

  return (
    <div className="relative mb-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Sparkles size={18} className="text-blue-500" />
        </div>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder="What would you like to accomplish today? e.g. 'Investigate failed transactions'"
          className="w-full pl-11 pr-24 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute inset-y-0 right-2 my-auto h-9 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5"
        >
          {isLoading
            ? <><Loader2 size={14} className="animate-spin" /> Analyzing</>
            : <><Search size={14} /> Analyze</>
          }
        </button>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && !query && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-20 overflow-hidden">
          <p className="px-4 py-2 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
            Try these
          </p>
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onMouseDown={() => handleSuggestion(s)}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
            >
              <Sparkles size={13} className="text-blue-400 flex-shrink-0" />
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
