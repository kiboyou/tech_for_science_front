export type GalleryItem =
  | { id: string; type: 'image'; src: string; alt: string }
  | { id: string; type: 'video'; src: string; poster?: string; alt?: string };

export const GALLERY_ITEMS: GalleryItem[] = [];
