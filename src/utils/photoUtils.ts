import { Photo, PhotosByDate } from '../types';

export const organizePhotosByDate = (photos: Photo[]): PhotosByDate => {
  return photos.reduce((acc: PhotosByDate, photo) => {
    const date = new Date(photo.date);
    const year = date.getFullYear().toString();
    const month = date.toLocaleString('default', { month: 'long' });

    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    acc[year][month].push(photo);
    return acc;
  }, {});
};

export const selectBestPhotos = (photos: Photo[], count: number): Photo[] => {
  // In a real application, this would involve more sophisticated selection criteria
  // For now, we'll just take the first n photos
  const selectedPhotos = photos.slice(0, count);
  return photos.map(photo => ({
    ...photo,
    selected: selectedPhotos.some(p => p.id === photo.id)
  }));
};