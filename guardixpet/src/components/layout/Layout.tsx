import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { OfflineBanner } from '../ui/OfflineBanner';
import { ToastContainer } from '../ui/Toast';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBottomNav?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  showBottomNav = true,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <OfflineBanner />
      <ToastContainer />
      <Sidebar />

      <div className="md:ml-64">
        <Header title={title} />

        <main className="p-4 pb-20 md:pb-4">
          {children}
        </main>
      </div>

      {showBottomNav && <BottomNav />}
    </div>
  );
};
