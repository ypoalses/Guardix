import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Tag, History, Settings, X, PawPrint } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUIStore } from '../../store/uiStore';
import { cn } from '../../utils/helpers';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  const navItems = [
    { path: '/home', icon: Home, label: t('common.appName') },
    { path: '/pets', icon: PawPrint, label: t('pets.myPets') },
    { path: '/tags', icon: Tag, label: t('tags.myTags') },
    { path: '/scan-history', icon: History, label: t('scans.scanHistory') },
    { path: '/settings', icon: Settings, label: t('common.settings') },
  ];

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 z-50 transform transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">
            GuardixPet
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-600 dark:text-gray-400"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
