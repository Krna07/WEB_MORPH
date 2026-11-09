import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Edit3, CheckCircle } from 'lucide-react';
import api from '../../api/axios';

export default function FeedbackWidget({ interactionId, onFeedbackSubmit }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFeedback = async (feedback) => {
    if (!interactionId || submitted) return;
    setLoading(true);
    try {
      await api.post('/feedback', { interactionId, feedback });
    } catch (e) {
      // Silently fail - feedback is non-critical
    } finally {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => onFeedbackSubmit?.(), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 flex items-center justify-between"
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-green-600"
          >
            <CheckCircle size={18} />
            <span className="font-medium">Thanks for your feedback!</span>
          </motion.div>
        ) : (
          <motion.div
            key="prompt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 w-full"
          >
            <span className="text-gray-600 dark:text-gray-300 font-medium">
              Was this workspace helpful?
            </span>
            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => handleFeedback('helpful')}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm font-medium disabled:opacity-50"
              >
                <ThumbsUp size={14} /> Helpful
              </button>
              <button
                onClick={() => handleFeedback('not_helpful')}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors text-sm font-medium disabled:opacity-50"
              >
                <ThumbsDown size={14} /> Not Helpful
              </button>
              <button
                onClick={() => handleFeedback('customized')}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm font-medium disabled:opacity-50"
              >
                <Edit3 size={14} /> Customize
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
