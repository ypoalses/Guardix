import React, { useState } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { SignupForm } from '../components/auth/SignupForm';
import { SocialAuth } from '../components/auth/SocialAuth';
import { Button } from '../components/ui/Button';
import { useTranslation } from 'react-i18next';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary-600">GuardixPet</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {isLogin ? t('auth.login') : t('auth.signup')}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          {isLogin ? <LoginForm /> : <SignupForm />}

          <div className="mt-4">
            <Button
              variant="ghost"
              onClick={() => setIsLogin(!isLogin)}
              className="w-full"
            >
              {isLogin ? t('auth.signup') : t('auth.login')}
            </Button>
          </div>

          <div className="mt-4">
            <SocialAuth />
          </div>
        </div>
      </div>
    </div>
  );
};
