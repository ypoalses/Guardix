import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Tag, History, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/helpers';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: '/home', icon: Home, label: t('common.appName') },
    { path: '/tags', icon: Tag, label: t('tags.myTags') },
    { path: '/scan-history', icon: History, label: t('scans.scanHistory') },
    { path: '/settings', icon: Settings, label: t('common.settings') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 safe-area-inset-bottom md:hidden z-30">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full transition-colors',
                isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400'
              )}
            >
              <Icon size={24} />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
