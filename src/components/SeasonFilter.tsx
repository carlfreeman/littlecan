import { useState, useEffect } from 'react';

interface SeasonFilterProps {
  seasons: string[];
  currentSeason: string;
  onFilterChange: (season: string) => void;
}

export default function SeasonFilter({ seasons, currentSeason, onFilterChange }: SeasonFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-4">
      <button
        className={`px-4 py-1 rounded-full ${
          currentSeason === ''
            ? 'bg-white text-gray-900'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
        onClick={() => onFilterChange('')}
      >
        Все сезоны
      </button>
      {seasons.map(season => (
        <button
          key={season}
          className={`px-4 py-1 rounded-full ${
            currentSeason === season
              ? 'bg-white text-gray-900'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => onFilterChange(season)}
        >
          {season}
        </button>
      ))}
    </div>
  );
}