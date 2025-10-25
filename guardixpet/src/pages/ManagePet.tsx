import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { usePets } from '../hooks/usePets';
import { PetForm } from '../components/pets/PetForm';
import { useTranslation } from 'react-i18next';

export const ManagePet: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { pets, createPet, editPet, isLoading } = usePets();
  const pet = pets.find(p => p.id === id);

  const handleSubmit = async (data: any) => {
    if (id && pet) {
      await editPet(id, data);
    } else {
      await createPet(data);
    }
  };

  return (
    <Layout title={pet ? t('pets.editPet') : t('pets.addPet')}>
      <div className="max-w-2xl mx-auto">
        <PetForm
          onSubmit={handleSubmit}
          defaultValues={pet || undefined}
          isLoading={isLoading}
        />
      </div>
    </Layout>
  );
};
