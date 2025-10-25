import React from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { useOffline } from '../../hooks/useOffline';
import { useTranslation } from 'react-i18next';

export const OfflineBanner: React.FC = () => {
  const { isOffline } = useOffline();
  const { t } = useTranslation();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (isOffline) {
      setShow(true);
    } else {
      // Show "back online" message briefly
      if (show) {
        const timer = setTimeout(() => setShow(false), 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [isOffline, show]);

  if (!show) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-2 text-center text-sm font-medium animate-slide-up ${
        isOffline
          ? 'bg-red-600 text-white'
          : 'bg-green-600 text-white'
      }`}
    >
      <div className="flex items-center justify-center gap-2">
        {isOffline ? <WifiOff size={16} /> : <Wifi size={16} />}
        <span>{isOffline ? t('common.offline') : t('common.online')}</span>
      </div>
    </div>
  );
};
