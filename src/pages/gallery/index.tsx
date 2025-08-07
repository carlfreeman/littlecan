import { useState, useEffect } from 'react';
import PhotoCard from '../../components/PhotoCard';
import PhotoOverlay from '../../components/PhotoOverlay';
import TagFilter from '../../components/TagFilter';
import SeasonFilter from '../../components/SeasonFilter';
import { getPhotos, getSeasons, Photo } from '../../utils/photoUtils';

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [seasons, setSeasons] = useState<string[]>([]);
  const [tagFilter, setTagFilter] = useState('all');
  const [seasonFilter, setSeasonFilter] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [photosData, seasonsData] = await Promise.all([
        getPhotos(),
        getSeasons(),
      ]);
      setPhotos(photosData);
      setFilteredPhotos(photosData);
      setSeasons(seasonsData);
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    let result = photos;
    
    if (tagFilter !== 'all') {
      if (tagFilter === 'featured') {
        result = result.filter(photo => photo.featured);
      } else {
        result = result.filter(photo => photo.tags.includes(tagFilter));
      }
    }
    
    if (seasonFilter) {
      result = result.filter(photo => photo.season === seasonFilter);
    }
    
    setFilteredPhotos(result);
  }, [tagFilter, seasonFilter, photos]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Photo overlay */}
      {selectedPhoto && (
        <PhotoOverlay 
          photo={selectedPhoto} 
          onClose={() => setSelectedPhoto(null)} 
        />
      )}

      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Gallery</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore my collection of street, nature, and conceptual photography.
          Each image tells a unique story through composition and emotion.
        </p>
      </div>

      <div className="mb-8">
        <TagFilter onFilterChange={setTagFilter} />
        <SeasonFilter 
          seasons={seasons} 
          onFilterChange={setSeasonFilter} 
        />
      </div>

      {filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map(photo => (
            <PhotoCard 
              key={photo.id} 
              photo={photo} 
              onClick={() => setSelectedPhoto(photo)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No photos match your filters</p>
        </div>
      )}
    </div>
  );
}