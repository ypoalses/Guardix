import React from 'react';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';

export const SocialAuth: React.FC = () => {
  const { t } = useTranslation();

  const handleGoogleLogin = () => {
    // Implement Google OAuth
    console.log('Google login');
  };

  const handleFacebookLogin = () => {
    // Implement Facebook OAuth
    console.log('Facebook login');
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
        </div>
      </div>
      <Button onClick={handleGoogleLogin} variant="secondary" className="w-full">
        {t('auth.loginWithGoogle')}
      </Button>
      <Button onClick={handleFacebookLogin} variant="secondary" className="w-full">
        {t('auth.loginWithFacebook')}
      </Button>
    </div>
  );
};
