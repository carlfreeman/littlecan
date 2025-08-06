import Image from 'next/image';
import { Photo } from '../utils/photoUtils';

const PhotoCard = ({ photo }: { photo: Photo }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-gray-800 border border-gray-700 transition-all duration-300 hover:border-gray-500">
      <div className="aspect-square overflow-hidden">
        <Image
          src={`/photos/${photo.id}.webp`}
          alt={photo.title}
          width={600}
          height={600}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">{photo.title}</h3>
        <p className="text-gray-400 text-sm mt-1 truncate">{photo.description}</p>
        
        <div className="mt-3 flex justify-between items-center">
          <span className="px-2 py-1 bg-gray-700 rounded text-xs">
            {photo.season}
          </span>
          <a 
            href={`/photos/${photo.id}.jpg`} 
            download
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;