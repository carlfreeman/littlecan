import Image from 'next/image';
import { Photo } from '../utils/photoUtils';

const PhotoCard = ({ photo, onClick }: { photo: Photo; onClick: () => void }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white/10 border border-white/10 transition-all duration-300 hover:border-white/50 hover:bg-white/5">
      {photo.featured && (
        <div className="absolute bottom-0 right-0 z-10 bg-orange-200 text-gray-900 px-1 py-0 text-xs font-bold">
        +
        </div>
      )}
      <div 
        className="aspect-square overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        <Image
          src={`/photos/${photo.id}.webp`}
          alt={photo.title}
          width={600}
          height={600}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="p-4">
        <h3 
          className="font-semibold text-lg truncate cursor-pointer"
          onClick={onClick}
        >
          {photo.title}
        </h3>
        <p 
          className="text-gray-400 text-sm mt-1 truncate cursor-pointer"
          onClick={onClick}
        >
          {photo.description}
        </p>
        
        <div className="mt-3 flex justify-between items-center">
          <span className="px-2 py-1 bg-gray-700 rounded text-xs">
            {photo.season}
          </span>
          <a 
            href={`/photos/${photo.id}.jpg`} 
            download
            className="text-sm text-gray-300 hover:text-white transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;