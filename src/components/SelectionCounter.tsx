import React from 'react';
import { SelectionCount } from '../types';

interface SelectionCounterProps {
  onSelectCount: (count: SelectionCount) => void;
  selectedCount: SelectionCount | null;
}

export const SelectionCounter: React.FC<SelectionCounterProps> = ({
  onSelectCount,
  selectedCount,
}) => {
  const counts: SelectionCount[] = [30, 50, 100];

  return (
    <div className="flex gap-4 my-4">
      {counts.map((count) => (
        <button
          key={count}
          onClick={() => onSelectCount(count)}
          className={`px-4 py-2 rounded-lg ${
            selectedCount === count
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {count} Photos
        </button>
      ))}
    </div>
  );
};