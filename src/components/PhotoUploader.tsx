import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface PhotoUploaderProps {
  onPhotosSelected: (photos: File[]) => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onPhotosSelected }) => {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    onPhotosSelected(files);
  }, [onPhotosSelected]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files).filter(file => 
      file.type.startsWith('image/')
    ) : [];
    onPhotosSelected(files);
  }, [onPhotosSelected]);

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">Drag and drop photos here, or</p>
      <label className="mt-2 inline-block">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        <span className="cursor-pointer text-blue-500 hover:text-blue-600">
          browse to choose files
        </span>
      </label>
    </div>
  );
};