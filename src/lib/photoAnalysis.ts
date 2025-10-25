import { PhotoAnalysis } from '../types/pet';

export async function analyzePhoto(file: File): Promise<PhotoAnalysis> {
  // This is a placeholder for photo analysis
  // In a real implementation, this would call an AI service
  // like Google Cloud Vision, AWS Rekognition, or a custom ML model

  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock analysis result
      resolve({
        breed: 'Unknown',
        color: 'Unknown',
        confidence: 0,
      });
    }, 1000);
  });
}

export async function compressImage(file: File, maxSize: number = 1024): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          file.type,
          0.8
        );
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
  });
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (!acceptedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Please upload a JPEG, PNG, or WebP image.' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size exceeds 5MB limit.' };
  }

  return { valid: true };
}
