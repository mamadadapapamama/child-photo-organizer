import React from 'react';
import { PhotoGrid } from './PhotoGrid';
import { PhotosByDate } from '../types';

interface PhotoViewProps {
  organizedPhotos: PhotosByDate;
}

export const PhotoView: React.FC<PhotoViewProps> = ({ organizedPhotos }) => {
  return (
    <div>
      {Object.entries(organizedPhotos).map(([year, months]) => (
        <div key={year} className="mt-8">
          <h2 className="text-2xl font-bold mb-6">{year}</h2>
          {Object.entries(months).map(([month, monthPhotos]) => (
            <PhotoGrid
              key={`${year}-${month}`}
              photos={monthPhotos}
              year={year}
              month={month}
            />
          ))}
        </div>
      ))}
    </div>
  );
};