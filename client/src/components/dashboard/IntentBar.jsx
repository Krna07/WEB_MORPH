import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const SUGGESTIONS = [
  'Investigate failed transactions',
  'Analyze revenue growth this month',
  'Find customers who stopped purchasing',
  'Review product performance',
  'Prepare regional sales report'
];

export default function IntentBar({ onLayoutChange, isLoading }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  const busy = isLoading || submitting;

  const handleSubmit = async (prompt) => {
    if (!prompt.trim() || busy) return;
    setError('');
    setSubmitting(true);
    try {
      const res = await api.post('/ai/generate-layout', { prompt, userId: user?.id });
      onLayoutChange(res.data.layoutConfig, res.data.interactionId);
      setValue('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze intent. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChip = (suggestion) => {
    setValue(suggestion);
    handleSubmit(suggestion);
  };

  return (
    <div className="mb-6">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500">
          <Sparkles size={20} />
        </div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit(value)}
          disabled={busy}
          placeholder="What would you like to accomplish today?"
          className="w-full pl-12 pr-32 py-4 text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:border-blue-500 transition-all shadow-sm"
        />
        <button
          onClick={() => handleSubmit(value)}
          disabled={busy || !value.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-medium flex items-center gap-2 transition-colors"
        >
          {busy ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
          {busy ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      <div className="flex flex-wrap gap-2 mt-3">
        {SUGGESTIONS.map((s) => (
          <motion.button
            key={s}
            onClick={() => handleChip(s)}
            disabled={busy}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-300 rounded-full transition-colors disabled:opacity-50"
          >
            {s}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
