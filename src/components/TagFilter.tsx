import { useState } from 'react';

const tags = ['street', 'nature', 'conceptual'];

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
            ? 'bg-white text-gray-900'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
        onClick={() => handleTagChange('all')}
      >
        All
      </button>
      {tags.map(tag => (
        <button
          key={tag}
          className={`px-3 py-1 rounded-full text-sm capitalize ${
            selectedTag === tag
              ? 'bg-white text-gray-900'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => handleTagChange(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;