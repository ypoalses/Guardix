import React from 'react';
import { validatePassword } from '../../utils/helpers';

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const { strength, errors } = validatePassword(password);

  const colors = {
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-green-500',
  };

  const widths = {
    weak: 'w-1/3',
    medium: 'w-2/3',
    strong: 'w-full',
  };

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${colors[strength]} ${widths[strength]}`}
        />
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400">
        Password strength: <span className="font-medium capitalize">{strength}</span>
      </p>
      {errors.length > 0 && (
        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          {errors.map((error, index) => (
            <li key={index}>• {error}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
