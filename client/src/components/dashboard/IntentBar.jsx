import { useState, useCallback } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { useAIStream } from '../../api/useAIStream';
import AIThinkingPanel from './AIThinkingPanel';

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
  const [pendingPrompt, setPendingPrompt] = useState('');
  const [pendingLayoutConfig, setPendingLayoutConfig] = useState(null);
  const { user } = useAuth();

  const busy = isLoading || submitting;

  const handleStreamDone = useCallback((layoutConfig) => {
    setPendingLayoutConfig(layoutConfig);
  }, []);

  const handleStreamError = useCallback((msg) => {
    setError(msg || 'Streaming failed. Please try again.');
    setSubmitting(false);
  }, []);

  const { startStream, isStreaming, streamText, isDone, error: streamError, abort, isSSESupported } =
    useAIStream({
      onDone: handleStreamDone,
      onError: handleStreamError,
    });

  // Called by AIThinkingPanel after its 800ms delay
  const handleThinkingComplete = useCallback(() => {
    if (pendingLayoutConfig) {
      onLayoutChange(pendingLayoutConfig, null);
      setPendingLayoutConfig(null);
    }
    setSubmitting(false);
    setValue('');
  }, [pendingLayoutConfig, onLayoutChange]);

  const handleRetry = useCallback(() => {
    if (pendingPrompt) {
      handleSubmit(pendingPrompt);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingPrompt]);

  const handleSubmit = async (prompt) => {
    if (!prompt.trim() || busy) return;
    setError('');
    setPendingPrompt(prompt);
    setPendingLayoutConfig(null);
    setSubmitting(true);

    // Try SSE streaming first if supported
    if (isSSESupported) {
      const started = startStream(prompt);
      if (started) return; // stream running, AIThinkingPanel takes over
    }

    // Fallback: original axios POST
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

  const showThinkingPanel = isStreaming || isDone || !!streamError;

  return (
    <div className="mb-6">
      <AIThinkingPanel
        isStreaming={isStreaming}
        isDone={isDone}
        isError={!!streamError}
        errorMsg={streamError}
        streamText={streamText}
        onComplete={handleThinkingComplete}
        onRetry={handleRetry}
      />

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500">
          <Sparkles size={20} />
        </div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit(value)}
          disabled={busy || isStreaming}
          placeholder="What would you like to accomplish today?"
          className="w-full pl-12 pr-32 py-4 text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:border-blue-500 transition-all shadow-sm"
        />
        <button
          onClick={() => handleSubmit(value)}
          disabled={busy || isStreaming || !value.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-medium flex items-center gap-2 transition-colors"
        >
          {busy || isStreaming ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
          {busy || isStreaming ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      <div className="flex flex-wrap gap-2 mt-3">
        {SUGGESTIONS.map((s) => (
          <motion.button
            key={s}
            onClick={() => handleChip(s)}
            disabled={busy || isStreaming}
            whileHover={{scale: 1.03}}
            whileTap={{scale: 0.97}}
            className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-300 rounded-full transition-colors disabled:opacity-50"
          >
            {s}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
