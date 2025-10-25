import { useState, useEffect } from 'react';
import { useUIStore } from '../store/uiStore';
import { api } from '../lib/api';
import { Scan } from '../types/scan';

export function useScans() {
  const [scans, setScans] = useState<Scan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useUIStore();

  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = async () => {
    setIsLoading(true);
    try {
      const data = await api.get<Scan[]>('/scans');
      setScans(data);
    } catch (error: any) {
      addToast({ message: error.response?.data?.message || 'Failed to fetch scans', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const getScansByPet = (petId: string) => {
    return scans.filter((scan) => scan.petId === petId);
  };

  const getRecentScans = (limit: number = 10) => {
    return scans
      .sort((a, b) => new Date(b.scannedAt).getTime() - new Date(a.scannedAt).getTime())
      .slice(0, limit);
  };

  return {
    scans,
    isLoading,
    fetchScans,
    getScansByPet,
    getRecentScans,
  };
}
