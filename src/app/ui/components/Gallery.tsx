// components/EnviraGallery.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { EnviraGalleryResponse, EnviraGalleryProps } from '@/app/interfaces/gallery';



const EnviraGallery: React.FC<EnviraGalleryProps> = ({ 
  galleryId, 
  gallerySlug, 
  columns = 3 
}) => {
  const [gallery, setGallery] = useState<EnviraGalleryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setIsLoading(true);
        let apiUrl = `${process.env.NEXT_PUBLIC_WP_API_URL_CLIENT}/wp/v2/envira-gallery`;
        
        if (galleryId) {
          apiUrl += `/${galleryId}`;
        } else if (gallerySlug) {
          apiUrl += `?slug=${gallerySlug}`;
        } else {
          apiUrl += '?per_page=1';
        }

        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Si buscamos por slug, la respuesta es un array
        const galleryData = gallerySlug ? data[0] : data;
        console.log(galleryData)
        setGallery(galleryData);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error('Error fetching Envira gallery:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, [galleryId, gallerySlug]);

  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  if (isLoading) {
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 aspect-square rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error al cargar la galería: {error}</p>
        </div>
      </div>
    );
  }

  if (!gallery || !gallery.gallery_data || !gallery.gallery_data.gallery || gallery.gallery_data.gallery.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No hay imágenes en esta galería.</p>
      </div>
    );
  }

  // Obtener las imágenes desde gallery_data.gallery
  const galleryImages = gallery.gallery_data.gallery;

  // Configurar clases CSS para el diseño de columnas
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
  };

  const galleryColumns = gallery.config?.columns || columns;

  return (
    <>
      <div className={`grid ${gridClasses[galleryColumns as keyof typeof gridClasses] || gridClasses[3]} gap-4`}>
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            className="relative group overflow-hidden rounded-lg cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <div className="relative aspect-square">
              <Image
                src={image.src}
                alt={image.alt || image.title || `Imagen de galería ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="absolute inset-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
                <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3-3H7" />
                </svg>
                {image.caption && (
                  <p className="mt-2 text-sm font-light">{image.caption}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        open={isOpen}
        close={closeLightbox}
        index={photoIndex}
        slides={galleryImages.map(image => ({
          src: image.src,
          alt: image.alt || image.title,
          description: image.caption
        }))}
        plugins={[Thumbnails]}
        carousel={{
          padding: 0,
          spacing: 0
        }}
        thumbnails={{
          position: 'bottom',
          width: 80,
          height: 60,
          border: 1,
          borderRadius: 4,
          padding: 4,
          gap: 16,
        }}
        controller={{
          closeOnBackdropClick: true
        }}
      />
    </>
  );
};

export default EnviraGallery;