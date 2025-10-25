import React from 'react';
import { Pet } from '../../types/pet';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Edit, Trash2 } from 'lucide-react';

interface PetCardProps {
  pet: Pet;
  onEdit?: (pet: Pet) => void;
  onDelete?: (id: string) => void;
}

export const PetCard: React.FC<PetCardProps> = ({ pet, onEdit, onDelete }) => {
  return (
    <Card className="relative">
      {pet.photo && (
        <img
          src={pet.photo}
          alt={pet.name}
          className="w-full h-48 object-cover rounded-t-lg mb-4"
        />
      )}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{pet.name}</h3>
          <Badge variant="default">{pet.type}</Badge>
        </div>
        {pet.breed && <p className="text-sm text-gray-600 dark:text-gray-400">{pet.breed}</p>}
        {pet.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400">{pet.description}</p>
        )}
        <div className="flex gap-2 pt-2">
          {onEdit && (
            <button
              onClick={() => onEdit(pet)}
              className="text-primary-600 hover:text-primary-700"
            >
              <Edit size={18} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(pet.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};
