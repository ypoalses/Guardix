import React from 'react';
import { Layout } from '../components/layout/Layout';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { useUIStore } from '../store/uiStore';
import { Button } from '../components/ui/Button';
import { useTranslation } from 'react-i18next';
import { FeedbackForm } from '../components/feedback/FeedbackForm';

export const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useUIStore();

  return (
    <Layout title={t('common.settings')}>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">{t('settings.theme')}</h3>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as any)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
          >
            <option value="light">{t('settings.light')}</option>
            <option value="dark">{t('settings.dark')}</option>
            <option value="system">{t('settings.system')}</option>
          </select>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">{t('settings.language')}</h3>
          <select
            value={language}
            onChange={(e) => {
              const lang = e.target.value as any;
              setLanguage(lang);
              i18n.changeLanguage(lang);
            }}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
          >
            <option value="en">English</option>
            <option value="af">Afrikaans</option>
            <option value="zu">Zulu</option>
          </select>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">{t('feedback.title')}</h3>
          <FeedbackForm />
        </div>

        <Button onClick={logout} variant="danger" className="w-full">
          {t('common.logout')}
        </Button>
      </div>
    </Layout>
  );
};
