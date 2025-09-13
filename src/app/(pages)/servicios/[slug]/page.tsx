// app/services/[slug]/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import * as motion from "motion/react-client";

import { Service, Props } from '@/app/interfaces/singleService';
import { getSiteInfo } from '@/app/lib/wordpress';
import Breadcrumb from '@/app/ui/components/Breadcrumb';
import AnimatedButton from '@/app/ui/motion/AnimatedButton';

const siteInfo = await getSiteInfo();
// Generar metadata dinámica
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Esperar a que los params se resuelvan
  const { slug } = await params;
  const service = await getService(slug);
  
  if (!service) {
    return {
      title: 'Servicio no encontrado',
    };
  }
  
  return {
    title: `${service.title.rendered} - Servicios | ${siteInfo.name}`,
    description: service.acf.description,
  };
}

// Obtener todos los slugs para generar rutas estáticas
export async function generateStaticParams() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WP_API_URL_CLIENT}/wp/v2/cpt-services?per_page=100`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }

    const services: Service[] = await response.json();
    return services.map((service) => ({
      slug: service.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Obtener un servicio específico por slug
async function getService(slug: string): Promise<Service | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WP_API_URL_CLIENT}/wp/v2/cpt-services?slug=${slug}`,
      { next: { revalidate: 60 } } // Revalidar cada minuto
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch service: ${response.status}`);
    }
    
    const services: Service[] = await response.json();
    //console.log("Mostrando cpt service: ", services)
    //console.log("Muestro otra cosa aqui: ", services[0].acf)

    return services.length > 0 ? services[0] : null;
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

// Obtener servicios relacionados (excluyendo el actual)
async function getRelatedServices(currentServiceId: number): Promise<Service[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WP_API_URL_CLIENT}/wp/v2/cpt-services?per_page=3&exclude=${currentServiceId}`,
      { next: { revalidate: 60 } } // Revalidar cada minuto
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch related services');
    }
    
    const services: Service[] = await response.json();
    return services;
  } catch (error) {
    console.error('Error fetching related services:', error);
    return [];
  }
}

export default async function ServiceDetail(props: Props) {
  // Esperar a que los params se resuelvan
  const { slug } = await props.params;
  const service = await getService(slug);
  if (!service) {
    notFound();
  }
  
  const relatedServices = await getRelatedServices(service.id);

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
      className='px-4 py-8'
    >

      {/* Breadcrumb */}
      <Breadcrumb currentPage={service.title.rendered} parentPage='servicios' />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                {service.acf.icon && service.acf.icon.startsWith('http') ? (
                  <div className="relative w-12 h-12">
                    <Image
                      src={service.acf.icon}
                      alt={service.title.rendered}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span className="text-3xl">{service.acf.icon || '⚙️'}</span>
                )}
              </div>
              <h1 
                className="text-4xl font-bold text-gray-900 mb-4" 
                dangerouslySetInnerHTML={{ __html: service.title.rendered }} 
              />
              <p className="text-xl text-gray-700 mb-6">{service.acf.description}</p>
              
              {(service.acf.price || service.acf.duration) && (
                <div className="flex flex-wrap gap-6 mb-6">
                  {service.acf.price && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-semibold">{service.acf.price}</span>
                    </div>
                  )}
                  
                  {service.acf.duration && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-semibold">{service.acf.duration}</span>
                    </div>
                  )}
                </div>
              )}
              
              <AnimatedButton>
               <Link href="/contacto" className="bg-[#010101] text-white px-6 py-3 rounded-md font-medium">
                  Solicitar este servicio
               </Link>
              </AnimatedButton>
            </div>
            
            {/* <div className="md:w-1/2">
              {service.acf.gallery && service.acf.gallery.length > 0  ? (
                <div className="relative h-80 w-full rounded-xl overflow-hidden">
                  <Image
                    src={service.acf.gallery[0]}
                    alt={service.title.rendered}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="bg-gray-200 h-80 w-full rounded-xl flex items-center justify-center">
                  <span className="text-gray-500">Imagen del servicio</span>
                </div>
              )}
            </div> */}
          </div>
        </div>
      </section>

      {/* Detalles del servicio */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-6">Detalles del servicio</h2>
              
              {service.acf.full_description ? (
                <div 
                  className="prose prose-lg max-w-none mb-8"
                  dangerouslySetInnerHTML={{ __html: service.acf.full_description }} 
                />
              ) : (
                <div 
                  className="prose prose-lg max-w-none mb-8"
                  dangerouslySetInnerHTML={{ __html: service.content.rendered }} 
                />
              )}
              
              {service.acf.features && service.acf.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4">Características principales</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.acf.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">¿Interesado en este servicio?</h3>
                <p className="mb-4">No dudes en contactarnos para obtener más información o solicitar un presupuesto personalizado.</p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium">
                  Contactar ahora
                </button>
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
                <h3 className="text-xl font-semibold mb-4">Resumen del servicio</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700">Servicio</h4>
                    <p dangerouslySetInnerHTML={{ __html: service.title.rendered }} />
                  </div>
                  
                  {service.acf.price && (
                    <div>
                      <h4 className="font-medium text-gray-700">Precio estimado</h4>
                      <p className="text-blue-600 font-semibold">{service.acf.price}</p>
                    </div>
                  )}
                  
                  {service.acf.duration && (
                    <div>
                      <h4 className="font-medium text-gray-700">Duración estimada</h4>
                      <p>{service.acf.duration}</p>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-medium text-gray-700">Categoría</h4>
                    <p>Servicios profesionales</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium mb-3">
                    Solicitar servicio
                  </button>
                  <button className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-md hover:bg-blue-50 transition-colors font-medium">
                    Contactar para más información
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Galería de imágenes */}
      {service.acf.gallery && service.acf.gallery.length > 1 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Galería de imágenes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.acf.gallery.map((image, index) => (
                <div key={index} className="relative h-64 rounded-xl overflow-hidden group">
                  <Image
                    src={image}
                    alt={`${service.title.rendered} - Imagen ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Servicios relacionados */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Servicios relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedServices.map((relatedService) => (
                <div key={relatedService.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        {relatedService.acf.icon && relatedService.acf.icon.startsWith('http') ? (
                          <div className="relative w-6 h-6">
                            <Image
                              src={relatedService.acf.icon}
                              alt={relatedService.title.rendered}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <span className="text-xl">{relatedService.acf.icon || '⚙️'}</span>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900" dangerouslySetInnerHTML={{ __html: relatedService.title.rendered }} />
                    </div>
                    <p className="text-gray-600 mb-4">
                      {relatedService.acf.description}
                    </p>
                    <Link 
                      href={`/servicios/${relatedService.slug}`}
                      className="text-blue-600 font-medium hover:text-blue-800 transition-colors inline-flex items-center"
                    >
                      Ver detalles
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </motion.div>
    </>
  );
}