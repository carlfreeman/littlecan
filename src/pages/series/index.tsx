import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PhotoOverlay from '../../components/PhotoOverlay';
import { getSeasons, getPhotosBySeason, Photo } from '../../utils/photoUtils';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Series() {
  const [seasons, setSeasons] = useState<string[]>([]);
  const [seasonData, setSeasonData] = useState<{
    season: string;
    photos: Photo[];
    displayPhotos: Photo[];
  }[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const seasonsData = await getSeasons();
        setSeasons(seasonsData);
        
        const data = await Promise.all(
          seasonsData.map(async (season) => {
            const photos = await getPhotosBySeason(season);
            
            const featured = photos.filter(photo => photo.featured);
            const others = photos.filter(photo => !photo.featured);
            const displayPhotos = [...featured, ...others].slice(0, 8);
            
            return {
              season,
              photos,
              displayPhotos
            };
          })
        );
        
        setSeasonData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedPhoto && (
        <PhotoOverlay 
          photo={selectedPhoto} 
          onClose={() => setSelectedPhoto(null)} 
        />
      )}

      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {isLoading ? <Skeleton width={150} className="mx-auto" /> : 'Сезоны'}
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          {isLoading ? (
            <Skeleton count={2} className="max-w-2xl mx-auto" />
          ) : (
            'Collections organized by seasons, each representing a cohesive body of work with a distinct narrative and visual language.'
          )}
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-16">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <Skeleton width={200} height={32} />
                <Skeleton width={80} height={24} />
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6">
                {[...Array(8)].map((_, idx) => (
                  <div key={idx}>
                    <Skeleton className="aspect-square rounded-lg" />
                    <div className="mt-3">
                      <Skeleton width={80} height={20} />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Skeleton width={200} height={48} className="mx-auto" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-16">
          {seasonData.map(({ season, photos, displayPhotos }) => (
            <section key={season} className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">{season}</h2>
                <span className="text-gray-500">{photos.length} фото</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6">
                {displayPhotos.map(photo => (
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
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Link 
                  href={`/gallery?season=${season}`} 
                  className="inline-block px-6 py-3 border border-gray-700 rounded-lg hover:border-gray-500 transition-colors"
                >
                  View Full Collection
                </Link>
              </div>
            </section>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        <div className="bg-gray-800 p-8 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 font-geist">
            {isLoading ? <Skeleton width={180} /> : 'Seasonal Approach'}
          </h3>
          <p className="text-gray-400 mb-4">
            {isLoading ? <Skeleton count={3} /> : (
              'Each season represents a distinct period of creative exploration. FW (Fall/Winter) collections often feature moodier tones and introspective themes, while SS (Spring/Summer) collections embrace light and vibrancy.'
            )}
          </p>
          <p className="text-gray-400">
            {isLoading ? <Skeleton count={2} /> : (
              'This organization allows me to develop cohesive visual narratives and explore specific concepts in depth throughout each season.'
            )}
          </p>
        </div>
        
        <div className="bg-gray-800 p-8 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 font-geist">
            {isLoading ? <Skeleton width={160} /> : 'Creative Process'}
          </h3>
          <p className="text-gray-400 mb-4">
            {isLoading ? <Skeleton count={3} /> : (
              'My series develop organically through continuous exploration. I typically focus on a geographic area, visual concept, or emotional theme, revisiting and refining my approach over several months.'
            )}
          </p>
          <p className="text-gray-400">
            {isLoading ? <Skeleton count={2} /> : (
              'The seasonal format provides structure while allowing flexibility for organic development and unexpected creative discoveries.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}