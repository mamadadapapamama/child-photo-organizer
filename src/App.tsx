import React, { useState, useCallback } from 'react';
import { PhotoUploader } from './components/PhotoUploader';
import { SelectionCounter } from './components/SelectionCounter';
import { PhotoView } from './components/PhotoView';
import { Navigation } from './components/Navigation';
import { Photo, PhotosByDate, SelectionCount, ViewMode } from './types';
import { organizePhotosByDate, selectBestPhotos } from './utils/photoUtils';
import { Camera } from 'lucide-react';

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedCount, setSelectedCount] = useState<SelectionCount | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [organizedPhotos, setOrganizedPhotos] = useState<PhotosByDate>({});
  const [organizedFilteredPhotos, setOrganizedFilteredPhotos] = useState<PhotosByDate>({});

  const handlePhotosSelected = useCallback(async (files: File[]) => {
    const newPhotos: Photo[] = await Promise.all(
      files.map(async (file) => ({
        id: Math.random().toString(36).substr(2, 9),
        url: URL.createObjectURL(file),
        date: new Date(file.lastModified),
        selected: false,
      }))
    );

    setPhotos((prev) => [...prev, ...newPhotos]);
    setOrganizedPhotos(organizePhotosByDate([...photos, ...newPhotos]));
  }, [photos]);

  const handleSelectCount = useCallback((count: SelectionCount) => {
    setSelectedCount(count);
    const updatedPhotos = selectBestPhotos(photos, count);
    setPhotos(updatedPhotos);
    
    const filteredPhotos = updatedPhotos.filter(photo => photo.selected);
    setOrganizedFilteredPhotos(organizePhotosByDate(filteredPhotos));
    setViewMode('filtered');
  }, [photos]);

  const filteredCount = photos.filter(photo => photo.selected).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Camera className="h-8 w-8 text-blue-500 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">
              Child Photo Organizer
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {photos.length === 0 ? (
          <PhotoUploader onPhotosSelected={handlePhotosSelected} />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <Navigation
                viewMode={viewMode}
                onViewChange={setViewMode}
                filteredCount={filteredCount}
              />
              {viewMode === 'all' && (
                <div className="flex items-center">
                  <span className="mr-4 text-gray-600">Filter best photos:</span>
                  <SelectionCounter
                    onSelectCount={handleSelectCount}
                    selectedCount={selectedCount}
                  />
                </div>
              )}
            </div>
            
            <PhotoView
              organizedPhotos={viewMode === 'all' ? organizedPhotos : organizedFilteredPhotos}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;