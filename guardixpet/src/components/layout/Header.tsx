import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import { useNotificationStore } from '../../store/notificationStore';
import { Badge } from '../ui/Badge';
import { getInitials } from '../../utils/helpers';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { toggleSidebar } = useUIStore();
  const { user } = useAuthStore();
  const { unreadCount } = useNotificationStore();

  return (
    <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-4 py-3 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-600 dark:text-gray-400"
          >
            <Menu size={24} />
          </button>
          {title && (
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h1>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button className="relative text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <Bell size={24} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {user && (
            <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-medium">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                getInitials(user.name)
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
