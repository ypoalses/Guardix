import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { usePets } from '../hooks/usePets';
import { PetList } from '../components/pets/PetList';
import { Modal } from '../components/ui/Modal';
import { PetForm } from '../components/pets/PetForm';
import { useTranslation } from 'react-i18next';
import { FAB } from '../components/ui/FAB';
import { PlusCircle } from 'lucide-react';
import { Pet } from '../types/pet';

export const ManagePets: React.FC = () => {
  const { t } = useTranslation();
  const { pets, createPet, editPet, removePet, isLoading } = usePets();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const handleSubmit = async (data: any) => {
    if (selectedPet) {
      await editPet(selectedPet.id, data);
    } else {
      await createPet(data);
    }
    setIsModalOpen(false);
    setSelectedPet(null);
  };

  const handleEdit = (pet: Pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await removePet(id);
    }
  };

  return (
    <Layout title={t('pets.myPets')}>
      {pets.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">{t('pets.noPets')}</p>
      ) : (
        <PetList pets={pets} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <FAB icon={<PlusCircle />} onClick={() => setIsModalOpen(true)} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPet(null);
        }}
        title={selectedPet ? t('pets.editPet') : t('pets.addPet')}
      >
        <PetForm
          onSubmit={handleSubmit}
          defaultValues={selectedPet || undefined}
          isLoading={isLoading}
        />
      </Modal>
    </Layout>
  );
};
