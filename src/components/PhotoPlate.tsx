import Image from 'next/image';
import { Photo } from '../utils/photoUtils';

const PhotoPlate = ({ photo, onClick }: { photo: Photo; onClick: () => void }) => {
  return (
    <div className="group relative overflow-hidden rounded-sm bg-white/10 border border-white/5 transition-all duration-500 hover:border-white/90 hover:bg-white/5">
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
    </div>
  );
};

export default PhotoPlate;