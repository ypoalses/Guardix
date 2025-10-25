export interface Pet {
  id: string;
  userId: string;
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'other';
  breed?: string;
  age?: number;
  color?: string;
  description?: string;
  photo?: string;
  microchipId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PetFormData {
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'other';
  breed?: string;
  age?: number;
  color?: string;
  description?: string;
  photo?: File | string;
}

export interface PhotoAnalysis {
  breed?: string;
  color?: string;
  confidence: number;
}
