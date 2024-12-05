import React from 'react';
import { Photo } from '../types';

interface PhotoGridProps {
  photos: Photo[];
  year: string;
  month: string;
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, year, month }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">
        {month} {year}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={`relative aspect-square rounded-lg overflow-hidden ${
              photo.selected ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <img
              src={photo.url}
              alt={`Photo from ${month} ${year}`}
              className="object-cover w-full h-full"
            />
            {photo.selected && (
              <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                ✓
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};