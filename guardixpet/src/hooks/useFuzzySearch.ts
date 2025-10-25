import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';

interface UseFuzzySearchOptions<T> {
  keys: string[];
  threshold?: number;
}

export function useFuzzySearch<T>(
  data: T[],
  options: UseFuzzySearchOptions<T>
) {
  const [query, setQuery] = useState('');

  const fuse = useMemo(
    () =>
      new Fuse(data, {
        keys: options.keys,
        threshold: options.threshold || 0.3,
        includeScore: true,
      }),
    [data, options.keys, options.threshold]
  );

  const results = useMemo(() => {
    if (!query) {
      return data;
    }
    return fuse.search(query).map((result) => result.item);
  }, [query, fuse, data]);

  return {
    query,
    setQuery,
    results,
  };
}
