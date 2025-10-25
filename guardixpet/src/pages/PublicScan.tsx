import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { api } from '../lib/api';

export const PublicScan: React.FC = () => {
  const { tagId } = useParams();
  const [petInfo, setPetInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPetInfo = async () => {
      try {
        const data = await api.get(`/public/scan/${tagId}`);
        setPetInfo(data);
      } catch (error) {
        console.error('Failed to fetch pet info');
      } finally {
        setLoading(false);
      }
    };

    if (tagId) {
      fetchPetInfo();
    }
  }, [tagId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!petInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <h2 className="text-xl font-semibold mb-2">Pet Not Found</h2>
          <p>This tag is not registered or has been deactivated.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Pet Found!</h2>
        {petInfo.photo && (
          <img src={petInfo.photo} alt={petInfo.name} className="w-full h-64 object-cover rounded-lg mb-4" />
        )}
        <div className="space-y-2">
          <p><strong>Name:</strong> {petInfo.name}</p>
          <p><strong>Type:</strong> {petInfo.type}</p>
          {petInfo.breed && <p><strong>Breed:</strong> {petInfo.breed}</p>}
          {petInfo.description && <p><strong>Description:</strong> {petInfo.description}</p>}
        </div>
        <p className="mt-4 text-sm text-gray-600">
          The owner has been notified that you scanned this tag.
        </p>
      </Card>
    </div>
  );
};
