import Image from 'next/image';
import { Photo } from '../utils/photoUtils';

const PhotoPlate = ({ photo, onClick }: { photo: Photo; onClick: () => void }) => {
  // Parse dimensions (assuming format "3235x2323")
  const [width, height] = photo.dimension.split('x').map(Number);
  const aspectRatio = width / height;

  let aspectClass = "aspect-square";
  
  if (aspectRatio > 1.2) {
    aspectClass = "aspect-[4/3]";
  } else if (aspectRatio < 0.8) {
    aspectClass = "aspect-[3/4]";
  } else {
    aspectClass = "aspect-square"
  }

  return (
    <div className="group relative overflow-hidden transition-all duration-500">
      <div 
        className={`${aspectClass} overflow-hidden cursor-pointer`}
        onClick={onClick}
      >
        <Image
          src={`/photos/${photo.id}.webp`}
          alt={photo.title}
          width={width}
          height={height}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </div>
  );
};

export default PhotoPlate;