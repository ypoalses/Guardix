import React from 'react';
import { Pet } from '../../types/pet';
import { PetCard } from './PetCard';

interface PetListProps {
  pets: Pet[];
  onEdit?: (pet: Pet) => void;
  onDelete?: (id: string) => void;
}

export const PetList: React.FC<PetListProps> = ({ pets, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};
