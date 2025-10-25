import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const Splash: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    setTimeout(() => {
      navigate(isAuthenticated ? '/home' : '/auth');
    }, 2000);
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-600">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">GuardixPet</h1>
        <div className="animate-pulse-slow text-white">Loading...</div>
      </div>
    </div>
  );
};
