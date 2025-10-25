import React from 'react';
import { Layout } from '../components/layout/Layout';
import { useTags } from '../hooks/useTags';
import { PendingTags as PendingTagsComponent } from '../components/tags/PendingTags';
import { useTranslation } from 'react-i18next';

export const PendingTags: React.FC = () => {
  const { t } = useTranslation();
  const { pendingTags } = useTags();

  return (
    <Layout title={t('tags.pendingTags')}>
      <PendingTagsComponent tags={pendingTags} />
    </Layout>
  );
};
