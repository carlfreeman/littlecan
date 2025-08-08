import { useState, useEffect } from 'react';
import Image from 'next/image';
import PhotoCard from '../components/PhotoCard';
import PhotoPlate from '../components/PhotoPlate';
import PhotoOverlay from '../components/PhotoOverlay';
import { getFeaturedPhotos, Photo } from '../utils/photoUtils';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Home() {
  const [featuredPhotos, setFeaturedPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        const photos = await getFeaturedPhotos(6);
        setFeaturedPhotos(photos);
      } catch (error) {
        console.error('Error loading photos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPhotos();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedPhoto && (
        <PhotoOverlay 
          photo={selectedPhoto} 
          onClose={() => setSelectedPhoto(null)} 
        />
      )}

      <section className="mb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Свет. Форма. Метафизика.
          </h1>
          <p className="text-gray-400 text-lg">
            Исследую границы визуального повествования через стрит-фотографию и концептуальные проекты
          </p>
        </div>
      </section>

      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Лучшее из последнего</h2>
          {!isLoading && (
            <span className="text-gray-500 text-sm">
              {featuredPhotos.filter(p => p.featured).length} фото
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="aspect-square">
                <Skeleton 
                  height="100%" 
                  baseColor="#1a1a1a"
                  highlightColor="#2d2d2d"
                  duration={1.5}
                />
              </div>
            ))
          ) : featuredPhotos.length > 0 ? (
            featuredPhotos.map(photo => (
              <PhotoPlate 
                key={photo.id} 
                photo={photo} 
                onClick={() => setSelectedPhoto(photo)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No featured photos available</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-8">
            Верю, что фотография - это не окончательная фиксация момента, а способ сохранить, пересоздать его, чтобы пережить заново.
            Это поиск необычного в повседневности.
          </p>
          <div className="flex justify-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-2 border-gray-400">
              <Image
                src="/photos/artist.webp"
                alt="Photographer"
                width={256}
                height={256}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}