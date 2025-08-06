import { useEffect, useState } from 'react';
import Image from 'next/image';
import PhotoCard from '../components/PhotoCard';
import { getRecentPhotos, Photo } from '../utils/photoUtils';

export default function Home() {
  const [recentPhotos, setRecentPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const photos = await getRecentPhotos(6);
      setRecentPhotos(photos);
    };
    
    fetchPhotos();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Capturing Moments, Creating Art
          </h1>
          <p className="text-gray-400 text-lg">
            Street • Nature • Conceptual Photography
          </p>
        </div>
      </section>

      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Recent Highlights</h2>
        </div>
        
        {recentPhotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPhotos.map(photo => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading photos...</p>
          </div>
        )}
      </section>

      <section className="py-12 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">About My Work</h2>
          <p className="text-gray-400 mb-8">
            I specialize in capturing authentic moments and transforming them into 
            artistic expressions. My work focuses on the interplay of light, shadow, 
            and human emotion in urban environments, the raw beauty of nature, 
            and conceptual narratives that challenge perception.
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