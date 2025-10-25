import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '../ui/Button';
import { validateImageFile } from '../../lib/photoAnalysis';

interface PhotoUploadProps {
  onUpload: (file: File) => void;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validation = validateImageFile(file);
      if (validation.valid) {
        onUpload(file);
      } else {
        alert(validation.error);
      }
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <Button
        type="button"
        variant="secondary"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="mr-2" size={18} />
        Upload Photo
      </Button>
    </div>
  );
};
