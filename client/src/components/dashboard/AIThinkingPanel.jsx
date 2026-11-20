import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

/**
 * AIThinkingPanel — slides in while the AI is streaming its response.
 *
 * Props:
 *   isStreaming {boolean}      — true while SSE chunks are arriving
 *   isDone      {boolean}      — true when layout config is ready
 *   isError     {boolean}      — true on error state
 *   errorMsg    {string}       — error message text
 *   streamText  {string}       — accumulated streaming text
 *   onComplete  {function}     — called ~800ms after isDone=true so dashboard can transform
 *   onRetry     {function}     — called when user clicks retry on error
 */
export default function AIThinkingPanel({
  isStreaming,
  isDone,
  isError,
  errorMsg,
  streamText,
  onComplete,
  onRetry,
}) {
  const isVisible = isStreaming || isDone || isError;
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const doneTimerRef = useRef(null);

  // Animate progress bar: 0→60% while streaming, 60→90% when done generating
  useEffect(() => {
    if (isStreaming && !isDone) {
      setProgress(0);
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 60) {
            clearInterval(intervalRef.current);
            return 60;
          }
          return p + 1;
        });
      }, 80);
    }
    return () => clearInterval(intervalRef.current);
  }, [isStreaming, isDone]);

  useEffect(() => {
    if (isDone) {
      clearInterval(intervalRef.current);
      // Animate 60→90%
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 90) {
            clearInterval(intervalRef.current);
            return 90;
          }
          return p + 2;
        });
      }, 30);

      // After 800ms jump to 100% and call onComplete
      doneTimerRef.current = setTimeout(() => {
        clearInterval(intervalRef.current);
        setProgress(100);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 300);
      }, 800);
    }
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(doneTimerRef.current);
    };
  }, [isDone, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="ai-thinking-panel"
          initial={{opacity: 0, y: -24, scaleY: 0.95}}
          animate={{opacity: 1, y: 0, scaleY: 1}}
          exit={{opacity: 0, y: -24, scaleY: 0.95}}
          transition={{duration: 0.3, ease: 'easeOut'}}
          className="mb-5 rounded-2xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 overflow-hidden shadow-sm"
        >
          <div className="px-5 py-4">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5">
                {isError ? (
                  <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
                    <AlertCircle size={20} className="text-red-500" />
                  </div>
                ) : isDone ? (
                  <motion.div
                    initial={{scale: 0.5, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    className="w-9 h-9 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center"
                  >
                    <CheckCircle size={20} className="text-green-500" />
                  </motion.div>
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                    <motion.div
                      animate={{scale: [1, 1.15, 1]}}
                      transition={{repeat: Infinity, duration: 1.4, ease: 'easeInOut'}}
                    >
                      <Brain size={20} className="text-blue-500" />
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                    {isError ? 'AI Error' : isDone ? 'Layout ready — transforming dashboard…' : 'AI is thinking…'}
                  </span>
                </div>

                {isError ? (
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-red-600 dark:text-red-400">{errorMsg || 'Something went wrong.'}</p>
                    {onRetry && (
                      <button
                        onClick={onRetry}
                        className="flex items-center gap-1.5 text-xs text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <RefreshCw size={12} />
                        Retry
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                    {streamText || '\u00a0'}
                    {isStreaming && !isDone && (
                      <motion.span
                        animate={{opacity: [1, 0, 1]}}
                        transition={{repeat: Infinity, duration: 0.8}}
                        className="inline-block w-0.5 h-4 bg-blue-500 ml-0.5 align-middle"
                      />
                    )}
                  </p>
                )}
              </div>
            </div>

            {/* Progress bar */}
            {!isError && (
              <div className="mt-3 h-1 bg-blue-100 dark:bg-blue-900/60 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                  style={{ width: `${progress}%` }}
                  transition={{duration: 0.3, ease: 'easeOut'}}
                />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
