// app/galeria/page.tsx
import React from 'react';
import { Metadata } from 'next';
import EnviraGallery from '../ui/components/Gallery';
import { getSiteInfo } from '../lib/wordpress';
import HeroSection from '../ui/components/HeroSection';

import * as motion from "motion/react-client";

//import { EnviraGalleryItem } from '../interfaces/gallery';
const siteInfo = await getSiteInfo();
export const metadata: Metadata = {
  title: `Galería - ${siteInfo.name}`,
  description: 'Explora nuestra galería de imágenes y proyectos realizados',
};

// Obtener todas las galerías de Envira
async function getEnviraGalleries() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WP_API_URL_CLIENT}/wp/v2/envira-gallery?per_page=20`,
      { next: { revalidate: 3600 } } // Revalidar cada hora
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch Envira galleries');
    }
    
    const galleries = await response.json();
    return galleries;
  } catch (error) {
    console.error('Error fetching Envira galleries:', error);
    return [];
  }
}

export default async function GaleriaPage() {
  const galleries = await getEnviraGalleries();

  return (
    <>
      <motion.div 
        layout 
        initial={{opacity: 0}}
        animate={{ opacity: 1 }} 
        transition={{
          default: { ease: "linear" },
          layout: { duration: 0.3 }
        }}
      >

        {/* Header */}
        {/* <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Galería</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Descubre nuestros proyectos y trabajos realizados a lo largo del tiempo
            </p>
          </div>
        </section> */}
        <HeroSection pageTitle="Galería de Imágenes" />

        {/* Galerías */}
        <section className="py-16 bg-gradient-to-r from-gray-200 to-gray-100">
          <div className="container mx-auto px-8">
            {galleries.length > 0 ? (
              <div className="space-y-16">
                {galleries.map((gallery: any) => (
                  <div key={gallery.id}>
                    <h2 className="text-4xl font-bold mb-8 text-[#BE9A42] ">{gallery.title.rendered || gallery.title}</h2>
                    <hr className='border border-gray-400 my-8'/>
                    <EnviraGallery galleryId={gallery.id} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No se encontraron galerías.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 ">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#BE9A42] mb-4">¿Te gusta lo que ves?</h2>
            <p className="text-xl  mb-8 max-w-3xl text-[#BE9A42] mx-auto">
              Contáctanos para hablar sobre tu próximo proyecto y cómo podemos ayudarte
            </p>
            <a
              href="/contacto"
              className="border text-[#BE9A42] px-8 py-3 rounded-md hover:bg-[#BE9A42] hover:text-white transition-colors font-medium inline-block"
            >
              Contactar ahora
            </a>
          </div>
        </section>
      </motion.div>
    </>
  );
}