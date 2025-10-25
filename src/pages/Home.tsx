import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { usePets } from '../hooks/usePets';
import { useScans } from '../hooks/useScans';
import { PetList } from '../components/pets/PetList';
import { useTranslation } from 'react-i18next';
import { PlusCircle } from 'lucide-react';
import { FAB } from '../components/ui/FAB';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const { pets } = usePets();
  const { getRecentScans } = useScans();
  const navigate = useNavigate();
  const recentScans = getRecentScans(5);

  return (
    <Layout title={t('common.appName')}>
      <div className="space-y-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">{t('pets.myPets')}</h2>
          {pets.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">{t('pets.noPets')}</p>
          ) : (
            <PetList pets={pets.slice(0, 3)} />
          )}
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">{t('scans.scanHistory')}</h2>
          {recentScans.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">{t('scans.noScans')}</p>
          ) : (
            <div className="space-y-2">
              {recentScans.map((scan) => (
                <div key={scan.id} className="p-2 border-b">
                  <p className="text-sm">{new Date(scan.scannedAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <FAB icon={<PlusCircle />} onClick={() => navigate('/pets/new')} />
    </Layout>
  );
};
