import { useEffect } from 'react';
import { usePetStore } from '../store/petStore';
import { useUIStore } from '../store/uiStore';
import { api } from '../lib/api';
import { Pet, PetFormData } from '../types/pet';

export function usePets() {
  const { pets, setPets, addPet, updatePet, deletePet, setLoading, isLoading } = usePetStore();
  const { addToast } = useUIStore();

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const data = await api.get<Pet[]>('/pets');
      setPets(data);
    } catch (error: any) {
      addToast({ message: error.response?.data?.message || 'Failed to fetch pets', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const createPet = async (petData: PetFormData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(petData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, String(value));
          }
        }
      });

      const newPet = await api.upload<Pet>('/pets', formData);
      addPet(newPet);
      addToast({ message: 'Pet added successfully', type: 'success' });
      return newPet;
    } catch (error: any) {
      addToast({ message: error.response?.data?.message || 'Failed to add pet', type: 'error' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const editPet = async (id: string, petData: Partial<PetFormData>) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(petData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, String(value));
          }
        }
      });

      const updatedPet = await api.upload<Pet>(`/pets/${id}`, formData);
      updatePet(id, updatedPet);
      addToast({ message: 'Pet updated successfully', type: 'success' });
      return updatedPet;
    } catch (error: any) {
      addToast({ message: error.response?.data?.message || 'Failed to update pet', type: 'error' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removePet = async (id: string) => {
    setLoading(true);
    try {
      await api.delete(`/pets/${id}`);
      deletePet(id);
      addToast({ message: 'Pet removed successfully', type: 'success' });
    } catch (error: any) {
      addToast({ message: error.response?.data?.message || 'Failed to remove pet', type: 'error' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clonePet = async (id: string) => {
    setLoading(true);
    try {
      const newPet = await api.post<Pet>(`/pets/${id}/clone`);
      addPet(newPet);
      addToast({ message: 'Pet cloned successfully', type: 'success' });
      return newPet;
    } catch (error: any) {
      addToast({ message: error.response?.data?.message || 'Failed to clone pet', type: 'error' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    pets,
    isLoading,
    fetchPets,
    createPet,
    editPet,
    removePet,
    clonePet,
  };
}
