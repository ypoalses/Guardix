import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Scan } from '../../types/scan';

interface ScanMapProps {
  scans: Scan[];
  center?: [number, number];
  zoom?: number;
}

export const ScanMap: React.FC<ScanMapProps> = ({
  scans,
  center = [0, 0],
  zoom = 13,
}) => {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {scans.map((scan) =>
        scan.location ? (
          <Marker key={scan.id} position={[scan.location.lat, scan.location.lng]}>
            <Popup>Scanned at {new Date(scan.scannedAt).toLocaleString()}</Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
};
