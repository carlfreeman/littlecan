import { useState, useEffect } from 'react';

const SeasonFilter = ({
  seasons,
  onFilterChange,
}: {
  seasons: string[];
  onFilterChange: (season: string) => void;
}) => {
  const [selectedSeason, setSelectedSeason] = useState('All');

  useEffect(() => {
    onFilterChange(selectedSeason === 'All' ? '' : selectedSeason);
  }, [selectedSeason, onFilterChange]);

  return (
    <div className="flex flex-wrap gap-2">
      <button
        className={`px-3 py-1 rounded-full text-sm ${
          selectedSeason === 'All'
            ? 'bg-white text-gray-900'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
        onClick={() => setSelectedSeason('All')}
      >
        All Seasons
      </button>
      {seasons.map(season => (
        <button
          key={season}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedSeason === season
              ? 'bg-white text-gray-900'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setSelectedSeason(season)}
        >
          {season}
        </button>
      ))}
    </div>
  );
};

export default SeasonFilter;