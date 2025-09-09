export interface EnviraGalleryImage {
  id: number;
  src: string;
  title: string;
  caption: string;
  alt: string;
  link: string;
  thumb: string;
}

export interface GalleryData {
  gallery: EnviraGalleryImage[];
}

export interface EnviraGalleryResponse {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
  gallery_data: GalleryData;
  config: {
    columns: number;
    gallery_theme: string;
    lightbox_theme: string;
  };
}

export interface EnviraGalleryProps {
  galleryId?: number;
  gallerySlug?: string;
  columns?: number;
}

// types/envira-gallery.ts
export interface EnviraGalleryImage {
  id: number;
  src: string;
  title: string;
  caption: string;
  alt: string;
  link: string;
  thumb: string;
}

export interface EnviraGalleryData {
  gallery: EnviraGalleryImage[];
}

export interface EnviraGalleryItem {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: any[];
  gallery_data: EnviraGalleryData;
  config: {
    columns: number;
    gallery_theme: string;
    lightbox_theme: string;
  };
  _links: {
    self: Array<{ href: string }>;
    collection: Array<{ href: string }>;
    about: Array<{ href: string }>;
    author: Array<{ embeddable: boolean; href: string }>;
    'wp:featuredmedia': Array<{ embeddable: boolean; href: string }>;
    'wp:attachment': Array<{ href: string }>;
    curies: Array<{ name: string; href: string; templated: boolean }>;
  };
}