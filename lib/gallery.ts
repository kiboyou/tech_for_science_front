export type GalleryItem =
  | { id: string; type: 'image'; src: string; alt: string }
  | { id: string; type: 'video'; src: string; poster?: string; alt?: string };

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'sample-1', type: 'image', src: '/media/sample-1.jpg', alt: 'Atelier 1' },
  { id: 'sample-2', type: 'image', src: '/media/sample-2.jpg', alt: 'Atelier 2' },
  { id: 'sample-clip', type: 'video', src: '/media/sample-clip.mp4', poster: '/media/sample-3.jpg', alt: 'Clip' },
  { id: 'sample-4', type: 'image', src: '/media/sample-4.jpg', alt: 'Atelier 3' },
  { id: 'sample-5', type: 'image', src: '/media/sample-5.jpg', alt: 'Atelier 4' },
  { id: 'sample-6', type: 'image', src: '/media/sample-6.jpg', alt: 'Atelier 5' },
];
