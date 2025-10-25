import React from 'react';
import { Scan } from '../../types/scan';
import { formatDateTime } from '../../utils/helpers';
import { MapPin } from 'lucide-react';

interface MapTimelineProps {
  scans: Scan[];
}

export const MapTimeline: React.FC<MapTimelineProps> = ({ scans }) => {
  return (
    <div className="space-y-4">
      {scans.map((scan) => (
        <div key={scan.id} className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
              <MapPin className="text-primary-600 dark:text-primary-400" size={20} />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{formatDateTime(scan.scannedAt)}</p>
            {scan.location?.address && (
              <p className="text-sm text-gray-600 dark:text-gray-400">{scan.location.address}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
