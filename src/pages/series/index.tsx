import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PhotoOverlay from '../../components/PhotoOverlay';
import { getSeasons, getPhotosBySeason, Photo } from '../../utils/photoUtils';

export default function Series() {
  const [seasons, setSeasons] = useState<string[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const [seasonPhotos, setSeasonPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const fetchSeasons = async () => {
      const seasonsData = await getSeasons();
      setSeasons(seasonsData);
      if (seasonsData.length > 0) {
        setSelectedSeason(seasonsData[0]);
      }
    };
    
    fetchSeasons();
  }, []);

  useEffect(() => {
    if (selectedSeason) {
      const fetchSeasonPhotos = async () => {
        const photos = await getPhotosBySeason(selectedSeason);
        setSeasonPhotos(photos);
      };
      
      fetchSeasonPhotos();
    }
  }, [selectedSeason]);

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
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Series</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Collections organized by seasons, each representing a cohesive body of work
          with a distinct narrative and visual language.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {seasons.map(season => (
          <button
            key={season}
            className={`px-4 py-2 rounded-full ${
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

      {selectedSeason && seasonPhotos.length > 0 && (
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">{selectedSeason} Collection</h2>
            <span className="text-gray-500">
              {seasonPhotos.length} photos
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {seasonPhotos.slice(0, 6).map(photo => (
              <div 
                key={photo.id} 
                className="group relative cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={`/photos/${photo.id}.webp`}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="mt-3">
                  <h3 className="font-medium truncate">{photo.title}</h3>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link 
              href={`/gallery?season=${selectedSeason}`} 
              className="inline-block px-6 py-3 border border-gray-700 rounded-lg hover:border-gray-500 transition-colors"
            >
              View Full Collection
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        <div className="bg-gray-800 p-8 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 font-geist">Seasonal Approach</h3>
          <p className="text-gray-400 mb-4">
            Each season represents a distinct period of creative exploration. 
            FW (Fall/Winter) collections often feature moodier tones and introspective themes, 
            while SS (Spring/Summer) collections embrace light and vibrancy.
          </p>
          <p className="text-gray-400">
            This organization allows me to develop cohesive visual narratives and 
            explore specific concepts in depth throughout each season.
          </p>
        </div>
        
        <div className="bg-gray-800 p-8 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 font-geist">Creative Process</h3>
          <p className="text-gray-400 mb-4">
            My series develop organically through continuous exploration. 
            I typically focus on a geographic area, visual concept, or emotional theme, 
            revisiting and refining my approach over several months.
          </p>
          <p className="text-gray-400">
            The seasonal format provides structure while allowing flexibility for 
            organic development and unexpected creative discoveries.
          </p>
        </div>
      </div>
    </div>
  );
}