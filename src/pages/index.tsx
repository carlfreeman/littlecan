import { useState, useEffect } from 'react';
import Image from 'next/image';
import PhotoCard from '../components/PhotoCard';
import PhotoOverlay from '../components/PhotoOverlay';
import { getFeaturedPhotos, Photo } from '../utils/photoUtils';

export default function Home() {
  const [featuredPhotos, setFeaturedPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      const photos = await getFeaturedPhotos(3);
      setFeaturedPhotos(photos);
    };
    
    fetchPhotos();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Overlay when photo is selected */}
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
          <span className="text-gray-500 text-sm">
            {featuredPhotos.filter(p => p.featured).length} фото
          </span>
        </div>
        
        {featuredPhotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPhotos.map(photo => (
              <PhotoCard 
                key={photo.id} 
                photo={photo} 
                onClick={() => setSelectedPhoto(photo)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading featured photos...</p>
          </div>
        )}
      </section>

      <section className="py-12 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-8">
            Верю, что фотография - это не окончательная фиксация момента, а способ сохранить, пересоздать его, чтобы пережить заново.
            Это поиск необычного в повседневности.
          </p>
          <div className="flex justify-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-gray-700">
              <Image
                src="/photos/artist.webp"
                alt="Photographer"
                width={256}
                height={256}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}