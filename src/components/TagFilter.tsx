import { useState } from 'react';

const tags = ['street', 'nature', 'conceptual', 'monochrome', 'featured'];
const rutag = {'street': 'стрит', 'nature': 'природа', 'conceptual': 'концепт', 'monochrome': 'монохром', 'featured': 'лучшее'};

const TagFilter = ({
  onFilterChange,
}: {
  onFilterChange: (tag: string) => void;
}) => {
  const [selectedTag, setSelectedTag] = useState('all');

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    onFilterChange(tag);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        className={`px-3 py-1 rounded-full text-sm ${
          selectedTag === 'all'
            ? 'bg-white text-black'
            : 'bg-white/10 text-white hover:bg-white/25'
        }`}
        onClick={() => handleTagChange('all')}
      >
        Все
      </button>
      {tags.map(tag => (
        <button
          key={tag}
          className={`px-3 py-1 rounded-full text-sm capitalize ${
            selectedTag === tag
              ? 'bg-white text-black'
              : 'bg-white/15 text-white hover:bg-white/50'
          }`}
          onClick={() => handleTagChange(tag)}
        >
          {rutag[tag]}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;