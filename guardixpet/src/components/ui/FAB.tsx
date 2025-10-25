import React from 'react';
import { cn } from '../../utils/helpers';

interface FABProps {
  icon: React.ReactNode;
  onClick: () => void;
  position?: 'bottom-right' | 'bottom-left';
  className?: string;
}

export const FAB: React.FC<FABProps> = ({
  icon,
  onClick,
  position = 'bottom-right',
  className,
}) => {
  const positions = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'fixed z-40 w-14 h-14 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-transform hover:scale-110',
        positions[position],
        className
      )}
    >
      {icon}
    </button>
  );
};
