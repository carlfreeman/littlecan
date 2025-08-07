import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Photo } from '../utils/photoUtils';

type PhotoOverlayProps = {
  photo: Photo;
  onClose: () => void;
};

const PhotoOverlay = ({ photo, onClose }: PhotoOverlayProps) => {
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  
  // Block scrolling when overlay is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Handle image load to get natural dimensions
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    setAspectRatio(img.naturalWidth / img.naturalHeight);
  };

  // Determine image orientation class
  const imageOrientationClass = aspectRatio > 1 
    ? 'w-full h-auto max-h-[85vh]'  // Landscape
    : 'h-[80vh] w-auto max-w-full'; // Portrait

  return (
    <div 
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-8xl h-[90vh] flex flex-col bg-black border border-black overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-grow overflow-auto flex flex-col lg:flex-row">
          {/* Image container - dynamic sizing based on orientation */}
          <div className="w-full sm:w-[70%] flex items-center justify-center p-0 bg-black">
            <div className="relative flex items-center justify-center w-full h-full">
              <Image
                src={`/photos/${photo.id}.webp`}
                alt={photo.title}
                width={0}
                height={0}
                className={`object-contain ${
                  aspectRatio > 1 
                    ? 'w-full h-auto max-h-[100%]' 
                    : 'h-[70vh] sm:h-[80vh] w-auto max-w-full'
                }`}
                sizes="(max-width: 749px) 100vw, 70vw"
                onLoad={handleImageLoad}
              />
            </div>
          </div>
          
          {/* Info panel - 30% width on large screens */}
          <div className="w-full lg:w-[30%] p-4 lg:p-6 overflow-y-auto bg-black border-t lg:border-t-0 lg:border-l border-black">
            
            <div className="flex justify-center items-center">
              <h2 className="text-xl text-center font-semibold truncate max-w-[80%]">{photo.title}</h2>
            </div>
            <div className="space-y-6">
              <div className="text-justify">
                <p className="text-gray-300">{photo.description}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">Сезон</h3>
                  <p className="text-gray-400">{photo.season}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">Теги</h3>
                  <div className="flex flex-wrap gap-2">
                    {photo.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 bg-black border border-white rounded-full text-sm capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">Камера</h3>
                  <p className="text-gray-400">{photo.camera}</p>
                  <p className="text-gray-400">{photo.lens}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">Разрешение</h3>
                  <p className="text-gray-400">{photo.dimension}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">Снято</h3>
                  <p className="text-gray-400">
                    {new Date(photo.tdate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">Загружено</h3>
                  <p className="text-gray-400">
                    {new Date(photo.udate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="pt-4">
                <a 
                  href={`/photos/${photo.id}.jpg`} 
                  download
                  className="inline-flex items-center px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-black hover:text-gray-300 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Скачать оригинал
                </a>
              </div>
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 absolute z-100 top-3 right-2 hover:text-white p-1 transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PhotoOverlay;