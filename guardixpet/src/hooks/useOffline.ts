import { useEffect } from 'react';
import { useUIStore } from '../store/uiStore';

export function useOffline() {
  const { isOffline, setOffline } = useUIStore();

  useEffect(() => {
    const handleOnline = () => {
      setOffline(false);
    };

    const handleOffline = () => {
      setOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial state
    setOffline(!navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOffline]);

  return {
    isOffline,
  };
}
