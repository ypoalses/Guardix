import { useState, useEffect } from 'react';
import { useUIStore } from '../store/uiStore';
import { api } from '../lib/api';
import { Tag, TagAssignment, TagActivation } from '../types/tag';

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [pendingTags, setPendingTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useUIStore();

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    setIsLoading(true);
    try {
      const data = await api.get<Tag[]>('/tags');
      setTags(data);
      setPendingTags(data.filter((tag) => tag.status === 'pending'));
    } catch (error: any) {
      addToast({ message: error.response?.data?.message || 'Failed to fetch tags', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const assignTag = async (assignment: TagAssignment) => {
    setIsLoading(true);
    try {
      const updatedTag = await api.post<Tag>('/tags/assign', assignment);
      setTags((prev) =>
        prev.map((tag) => (tag.tagId === assignment.tagId ? updatedTag : tag))
      );
      addToast({ message: 'Tag assigned successfully', type: 'success' });
      return updatedTag;
    } catch (error: any) {
      addToast({ message: error.response?.data?.message || 'Failed to assign tag', type: 'error' });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const activateTag = async (activation: TagActivation) => {
    setIsLoading(true);
    try {
      const activatedTag = await api.post<Tag>('/tags/activate', activation);
      setTags((prev) => [...prev, activatedTag]);
      setPendingTags((prev) => [...prev, activatedTag]);
      addToast({ message: 'Tag activated successfully', type: 'success' });
      return activatedTag;
    } catch (error: any) {
      addToast({ message: error.response?.data?.message || 'Failed to activate tag', type: 'error' });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deactivateTag = async (tagId: string) => {
    setIsLoading(true);
    try {
      await api.post(`/tags/${tagId}/deactivate`);
      setTags((prev) =>
        prev.map((tag) =>
          tag.id === tagId ? { ...tag, status: 'inactive' as const } : tag
        )
      );
      addToast({ message: 'Tag deactivated successfully', type: 'success' });
    } catch (error: any) {
      addToast({ message: error.response?.data?.message || 'Failed to deactivate tag', type: 'error' });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tags,
    pendingTags,
    isLoading,
    fetchTags,
    assignTag,
    activateTag,
    deactivateTag,
  };
}
