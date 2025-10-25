export interface Tag {
  id: string;
  tagId: string;
  userId: string;
  petId?: string;
  status: 'pending' | 'active' | 'inactive';
  activatedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TagAssignment {
  tagId: string;
  petId: string;
}

export interface TagActivation {
  tagId: string;
  activationCode: string;
}
