import { create } from 'zustand';
import { Pet } from '../types/pet';

interface PetState {
  pets: Pet[];
  selectedPet: Pet | null;
  isLoading: boolean;
  setPets: (pets: Pet[]) => void;
  addPet: (pet: Pet) => void;
  updatePet: (id: string, pet: Partial<Pet>) => void;
  deletePet: (id: string) => void;
  setSelectedPet: (pet: Pet | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const usePetStore = create<PetState>((set) => ({
  pets: [],
  selectedPet: null,
  isLoading: false,
  setPets: (pets) => set({ pets }),
  addPet: (pet) =>
    set((state) => ({ pets: [...state.pets, pet] })),
  updatePet: (id, updatedPet) =>
    set((state) => ({
      pets: state.pets.map((pet) =>
        pet.id === id ? { ...pet, ...updatedPet } : pet
      ),
    })),
  deletePet: (id) =>
    set((state) => ({
      pets: state.pets.filter((pet) => pet.id !== id),
    })),
  setSelectedPet: (pet) => set({ selectedPet: pet }),
  setLoading: (isLoading) => set({ isLoading }),
}));
