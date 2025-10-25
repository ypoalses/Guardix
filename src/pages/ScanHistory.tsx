import React from 'react';
import { Layout } from '../components/layout/Layout';
import { useScans } from '../hooks/useScans';
import { MapTimeline } from '../components/map/MapTimeline';
import { useTranslation } from 'react-i18next';

export const ScanHistory: React.FC = () => {
  const { t } = useTranslation();
  const { scans } = useScans();

  return (
    <Layout title={t('scans.scanHistory')}>
      {scans.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">{t('scans.noScans')}</p>
      ) : (
        <MapTimeline scans={scans} />
      )}
    </Layout>
  );
};
