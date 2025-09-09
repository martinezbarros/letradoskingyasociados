// components/ServicesSection.tsx
'use client';

import React, { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';

import { Service } from '@/app/interfaces/cptService';

const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_WP_API_URL_CLIENT}/wp/v2/cpt-services`);
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data: Service[] = await response.json();
        setServices(data);
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error('Error fetching services:', error);
    } finally {
        setIsLoading(false);
    }
};

fetchServices();
}, [error]);

    if (isLoading) {
    return (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-gray-700">Cargando servicios...</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden p-6 animate-pulse">
                <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
    }

  // Separar servicios destacados y regulares
  const featuredServices = services.filter(service => service.acf.featured);
  const regularServices = services.filter(service => !service.acf.featured);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-200 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Ofrecemos soluciones especializadas
          </p>
        </div>

        {/* Servicios destacados */}
        {featuredServices.length > 0 && (
          <>
            <h3 className="text-2xl font-semibold text-center mb-8 text-blue-600">Servicios Destacados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {featuredServices.map((service) => (
                <ServiceCard key={service.id} service={service} featured={true} />
              ))}
            </div>
          </>
        )}

        {/* Todos los servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {services.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600">No se encontraron servicios.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;

