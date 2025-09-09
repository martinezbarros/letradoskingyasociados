// app/nosotros/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

import * as motion from "motion/react-client";
import HeroSection from '../ui/components/HeroSection';
import AnimatedButton from '../ui/motion/AnimatedButton';

export const metadata: Metadata = {
  title: 'Nuestra Esencia - Experiencia, Discreción y Soluciones a Medida',
  description: 'Firma especializada en soluciones jurídicas y fiduciarias de alta gama para clientes internacionales. Protección patrimonial, planificación sucesoria y asesoría legal especializada.',
};

export default function Nosotros() {
  return (
    <>
      <motion.div>
        <HeroSection pageTitle="Nosotros" />
        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <div className="relative h-96 w-full rounded-xl overflow-hidden">
                  <Image
                    src="https://bakerandalvarez.site/abogadosasociadosmartinezbarros/wp-content/uploads/sites/3/2025/09/nosotros-scaled.jpg"
                    alt="Nuestra Misión"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold text-[#010101] mb-6">Nuestra Misión</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Somos una firma especializada que proporciona soluciones jurídicas y fiduciarias 
                  de alta gama para clientes internacionales. Nuestra razón de ser es diseñar e 
                  implementar estructuras patrimoniales robustas, eficientes y discretas, adaptadas 
                  a las necesidades específicas de cada persona, familia o negocio.
                </p>
                <p className="text-lg text-gray-700">
                  Nos dedicamos a proteger sus activos, preservar su legado y facilitar su crecimiento 
                  en un entorno global seguro.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-[#010101]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Nuestros Valores Fundamentales</h2>
              <p className="text-xl text-white max-w-3xl mx-auto">
                Los pilares que sustentan nuestro compromiso con la excelencia y la confidencialidad
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Confidencialidad */}
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-[#BE9A42] " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#BE9A42] ">Confidencialidad y Discreción</h3>
                <p className="text-white">
                  Entendemos la sensibilidad de su información. Operamos con los más altos estándares 
                  de privacidad y secreto profesional.
                </p>
              </div>

              {/* Excelencia */}
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-[#BE9A42] " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#BE9A42] ">Excelencia Técnica</h3>
                <p className="text-white">
                  Nuestro equipo posee un conocimiento profundo y actualizado de las legislaciones 
                  locales e internacionales, asegurando soluciones legalmente sólidas.
                </p>
              </div>

              {/* Personalizado */}
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-[#BE9A42] " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#BE9A42] ">Enfoque Personalizado</h3>
                <p className="text-white">
                  Rechazamos las soluciones genéricas. Escuchamos sus objetivos únicos para construir 
                  una estrategia hecha a su medida.
                </p>
              </div>

              {/* Seriedad */}
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-[#BE9A42] " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#BE9A42] ">Seriedad y Compromiso</h3>
                <p className="text-white ">
                  Forjamos relaciones a largo plazo basadas en la integridad, la transparencia y el 
                  compromiso inquebrantable con sus intereses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-[#E6E8EC]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-[#010101] ">Su Socio Estratégico</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto text-[#010101] ">
              Más que un proveedor de servicios, nos posicionamos como sus consejeros de confianza. 
              Le acompañamos en el diseño de su estrategia patrimonial global, proporcionando la 
              seguridad jurídica y la paz mental que necesita.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <AnimatedButton>
                <Link 
                  href="/contacto"
                  className=" bg-[#010101] text-white px-8 py-3 rounded-md font-medium"
                >
                  Contáctenos
                </Link>

              </AnimatedButton>
              <AnimatedButton>
                <Link 
                  href="/servicios"
                  className="border border-[#010101] text-[#010101] px-8 py-3 rounded-md font-medium"
                >
                  Nuestros Servicios
                </Link>
              </AnimatedButton>
            </div>
          </div>
        </section>
      </motion.div>

    </>
  );
}