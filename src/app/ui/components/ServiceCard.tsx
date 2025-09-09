// components/ServiceCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ServiceCardProps } from '@/app/interfaces/cptService';

const ServiceCard: React.FC<ServiceCardProps> = ({ service, featured = false }) => {
  if (featured) {
    return (
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
        <div className="p-8">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              {service.acf.icon && service.acf.icon.startsWith('http') ? (
                <div className="relative w-10 h-10">
                  <Image
                    src={service.acf.icon}
                    alt={service.title.rendered}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <span className="text-2xl">{service.acf.icon || '⚙️'}</span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900" dangerouslySetInnerHTML={{ __html: service.title.rendered }} />
          </div>
          <p className="text-gray-600 mb-6">
            {service.acf.description}
          </p>
          <Link 
            href={`/services/${service.slug}`}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            Más información
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            {service.acf.icon && service.acf.icon.startsWith('http') ? (
              <div className="relative w-6 h-6">
                <Image
                  src={service.acf.icon}
                  alt={service.title.rendered}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <span className="text-xl">{service.acf.icon || '⚙️'}</span>
            )}
          </div>
          <h3 className="text-xl font-semibold text-gray-900" dangerouslySetInnerHTML={{ __html: service.title.rendered }} />
        </div>
        <p className="text-gray-600 mb-4">
          {service.acf.description}
        </p>
        <Link 
          href={`/servicios/${service.slug}`}
          className="text-blue-600 font-medium hover:text-blue-800 transition-colors inline-flex items-center"
        >
          Ver detalles
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;