import { useEffect } from 'react';
import Image from 'next/image';
import { Photo } from '../utils/photoUtils';

type PhotoOverlayProps = {
  photo: Photo;
  onClose: () => void;
};

const PhotoOverlay = ({ photo, onClose }: PhotoOverlayProps) => {
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

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="max-w-6xl w-full max-h-[90vh] overflow-auto bg-gray-900 rounded-xl border border-gray-700 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative aspect-square w-full">
            <Image
              src={`/photos/${photo.id}.webp`}
              alt={photo.title}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          
          <div className="space-y-6">
            <div className="sticky top-0 bg-gray-900 z-10 p-2 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-2xl font-bold">{photo.title}</h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white p-2 transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Description</h3>
              <p className="text-gray-400">{photo.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Season</h3>
                <p className="text-gray-400">{photo.season}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {photo.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Camera</h3>
                <p className="text-gray-400">{photo.camera}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Lens</h3>
                <p className="text-gray-400">{photo.lens}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Dimensions</h3>
                <p className="text-gray-400">{photo.dimension}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Creation Date</h3>
                <p className="text-gray-400">
                  {new Date(photo.tdate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Upload Date</h3>
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
                className="inline-flex items-center px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download Original JPG
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoOverlay;