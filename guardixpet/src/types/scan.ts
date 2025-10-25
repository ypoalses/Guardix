export interface Scan {
  id: string;
  tagId: string;
  petId: string;
  scannedBy?: string;
  location?: {
    lat: number;
    lng: number;
    address?: string;
  };
  scannedAt: string;
  notified: boolean;
}

export interface ScanLocation {
  lat: number;
  lng: number;
  address?: string;
}

export interface ScanNotification {
  scanId: string;
  petName: string;
  location?: ScanLocation;
  scannedAt: string;
}
