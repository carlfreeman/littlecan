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
            ? 'bg-white text-black'
            : 'bg-white/10 text-white hover:bg-white/30'
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
              ? 'bg-white text-black'
              : 'bg-white/20 text-white hover:bg-white/50'
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