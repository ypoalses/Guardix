import React from 'react';
import { formatRelativeTime } from '../../utils/helpers';
import { useNotificationStore } from '../../store/notificationStore';

interface NotificationItemProps {
  notification: any;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const { markAsRead } = useNotificationStore();

  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`p-4 border-b dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
        !notification.read ? 'bg-primary-50 dark:bg-primary-900/20' : ''
      }`}
    >
      <h4 className="font-medium text-sm">{notification.title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">{notification.message}</p>
      <p className="text-xs text-gray-500 mt-1">{formatRelativeTime(notification.createdAt)}</p>
    </div>
  );
};
