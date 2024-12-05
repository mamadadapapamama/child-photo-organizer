import React from 'react';
import { ViewMode } from '../types';
import { Images, Filter } from 'lucide-react';

interface NavigationProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
  filteredCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  viewMode,
  onViewChange,
  filteredCount,
}) => {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => onViewChange('all')}
        className={`flex items-center px-4 py-2 rounded-lg ${
          viewMode === 'all'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
      >
        <Images className="w-5 h-5 mr-2" />
        All Photos
      </button>
      <button
        onClick={() => onViewChange('filtered')}
        className={`flex items-center px-4 py-2 rounded-lg ${
          viewMode === 'filtered'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
      >
        <Filter className="w-5 h-5 mr-2" />
        Filtered Photos {filteredCount > 0 && `(${filteredCount})`}
      </button>
    </div>
  );
};