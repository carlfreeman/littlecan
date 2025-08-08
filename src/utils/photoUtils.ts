export type Photo = {
  id: string;
  title: string;
  description: string;
  season: string;
  tags: string[];
  camera: string;
  lens: string;
  dimension: string;
  udate: string;
  tdate: string;
  featured: boolean;
};

export const getPhotos = async (): Promise<Photo[]> => {
  try {
    const res = await fetch('/data/photos.json');
    return await res.json();
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
};

export const getFeaturedPhotos = async (count: number = 20): Promise<Photo[]> => {
  const photos = await getPhotos();
  return photos
    .filter(photo => photo.featured)
    .sort((a, b) => new Date(b.udate).getTime() - new Date(a.udate).getTime())
    .slice(0, count);
};

export const getRecentPhotos = async (count: number = 5): Promise<Photo[]> => {
  const photos = await getPhotos();
  return photos
    .sort((a, b) => new Date(b.udate).getTime() - new Date(a.udate).getTime())
    .slice(0, count);
};

export const getSeasons = async (): Promise<string[]> => {
  const photos = await getPhotos();
  return Array.from(new Set(photos.map(p => p.season)));
};

export const getPhotosBySeason = async (season: string): Promise<Photo[]> => {
  const photos = await getPhotos();
  return photos.filter(p => p.season === season);
};