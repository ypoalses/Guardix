import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';
import { socketClient } from '../lib/socket';
import { ScanNotification } from '../types/scan';

export function useWebSocket() {
  const { token, isAuthenticated } = useAuthStore();
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    if (isAuthenticated && token) {
      socketClient.connect(token);

      socketClient.on('scan:created', (data: ScanNotification) => {
        addNotification({
          type: 'scan',
          title: 'Pet Scanned',
          message: `Your pet ${data.petName} was scanned`,
          data,
        });
      });

      socketClient.on('tag:activated', (data: any) => {
        addNotification({
          type: 'tag_activated',
          title: 'Tag Activated',
          message: `Tag ${data.tagId} has been activated`,
          data,
        });
      });

      return () => {
        socketClient.off('scan:created');
        socketClient.off('tag:activated');
      };
    } else {
      socketClient.disconnect();
    }
  }, [isAuthenticated, token, addNotification]);

  return {
    connected: socketClient.connected,
    emit: socketClient.emit.bind(socketClient),
  };
}
