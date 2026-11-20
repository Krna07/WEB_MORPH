import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Custom hook for AI SSE streaming.
 * @param {object} callbacks
 * @param {function} callbacks.onChunk   - called with each streamed text chunk
 * @param {function} callbacks.onDone    - called with layoutConfig when stream ends
 * @param {function} callbacks.onError   - called with error message string
 */
export function useAIStream({ onChunk, onDone, onError } = {}) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamText, setStreamText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState(null);
  const esRef = useRef(null);

  // Check if EventSource (SSE) is supported
  const isSSESupported = typeof window !== 'undefined' && typeof window.EventSource !== 'undefined';

  const abort = useCallback(() => {
    if (esRef.current) {
      esRef.current.close();
      esRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  const startStream = useCallback((prompt) => {
    if (!isSSESupported) return false; // caller should use fallback

    // Reset state
    setIsStreaming(true);
    setStreamText('');
    setIsDone(false);
    setError(null);

    // Close any existing connection
    if (esRef.current) {
      esRef.current.close();
    }

    const token = localStorage.getItem('wm_token');
    const encoded = encodeURIComponent(prompt);
    const url = `/api/ai/stream?prompt=${encoded}&token=${encodeURIComponent(token || '')}`;

    const es = new EventSource(url);
    esRef.current = es;

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'chunk') {
          setStreamText((prev) => prev + data.text);
          if (onChunk) onChunk(data.text);
        } else if (data.type === 'done') {
          setIsDone(true);
          setIsStreaming(false);
          es.close();
          esRef.current = null;
          if (onDone) onDone(data.layoutConfig);
        } else if (data.type === 'error') {
          setError(data.message);
          setIsStreaming(false);
          es.close();
          esRef.current = null;
          if (onError) onError(data.message);
        }
      } catch {
        // ignore parse errors on individual chunks
      }
    };

    es.onerror = () => {
      const msg = 'SSE connection failed';
      setError(msg);
      setIsStreaming(false);
      es.close();
      esRef.current = null;
      if (onError) onError(msg);
    };

    return true; // SSE started
  }, [isSSESupported, onChunk, onDone, onError]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (esRef.current) {
        esRef.current.close();
      }
    };
  }, []);

  return {
    startStream,
    isStreaming,
    streamText,
    isDone,
    error,
    abort,
    isSSESupported,
  };
}
