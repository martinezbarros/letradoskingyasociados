// app/nosotros/page.tsx - Letrados King
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

import * as motion from "motion/react-client";
import HeroSection from '../ui/components/HeroSection';
import AnimatedButton from '../ui/motion/AnimatedButton';

export const metadata: Metadata = {
  title: 'Letrados King & Asociados - Innovación Legal para Negocios Modernos',
  description: 'Firma legal joven y dinámica especializada en derecho digital, startups y emprendimiento. Combinamos expertise jurídico con comprensión del ecosistema tecnológico actual.',
};

export default function Nosotros() {
  return (
    <>
      <motion.div>
        <HeroSection pageTitle="Nosotros" />
        
        {/* Innovación Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="hidden md:block lg:w-1/2">
                <div className="relative h-96 w-full rounded-xl overflow-hidden">
                  <Image
                    src="https://bakerandalvarez.site/letradoskingyasociados/wp-content/uploads/sites/5/2025/09/our-team-king-scaled.jpg"
                    alt="Innovación legal en Letrados King"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold text-[#16224F] mb-6">Derecho para la Nueva Economía</h2>
                <p className="text-lg text-gray-700 mb-6">
                 Letrados King & Asociados es una firma moderna que reinventa los servicios legales especializados en derecho comercial, servicios fiduciarios y asesoría de inversiones para la nueva economía. Nuestro enfoque innovador se aplica particularmente en la creación de empresas offshore en Panamá y otras jurisdicciones, así como en el desarrollo de fundaciones de interés privado adaptadas a emprendedores digitales, startups y negocios tecnológicos. Combinamos expertise jurídico con un profundo entendimiento de los modelos de negocio disruptivos y el ecosistema emprendedor actual.
                </p>
                <p className="text-lg text-gray-700">
                  Diseñamos fideicomisos para protección de patrimonio con un enfoque contemporáneo que incorpora las últimas tendencias regulatorias y tecnológicas. 
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-[#16224F]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Nuestra Filosofía de Trabajo</h2>
              <p className="text-xl text-white max-w-3xl mx-auto">
                Principios que nos diferencian en el abordaje de los desafíos legales modernos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Innovación */}
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-[#fbbf24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#fbbf24]">Innovación Constante</h3>
                <p className="text-white">
                  Abrazamos el cambio y desarrollamos soluciones legales creativas para problemas modernos.
                </p>
              </div>

              {/* Agilidad */}
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-[#fbbf24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#fbbf24]">Agilidad Procesal</h3>
                <p className="text-white">
                  Optimizamos procesos con tecnología para ofrecer respuestas rápidas sin sacrificar calidad.
                </p>
              </div>

              {/* Transparencia */}
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-[#fbbf24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#fbbf24]">Transparencia Radical</h3>
                <p className="text-white">
                  Operamos con total claridad en costos, procesos y expectativas. Sin sorpresas, sin lenguaje oscuro.
                </p>
              </div>

              {/* Enfoque */}
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-[#fbbf24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#fbbf24]">Enfoque Preventivo</h3>
                <p className="text-white">Nuestra práctica se rige por los más altos estándares de excelencia jurídica, rigor analítico y ética profesional. </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-[#f5f3ff]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-[#16224F]">Asesoría Legal para el Futuro</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto text-[#16224F]">
              No solo resolvemos problemas legales; ayudamos a construir negocios escalables, 
              protegidos y preparados para los desafíos regulatorios del mañana.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <AnimatedButton>
                <Link 
                  href="/contacto"
                  className="bg-[#16224F] text-white px-8 py-3 rounded-md font-medium"
                >
                  Consultoría Inicial Sin Costo
                </Link>
              </AnimatedButton>
              <AnimatedButton>
                <Link 
                  href="/servicios"
                  className="border border-[#16224F] text-[#16224F] px-8 py-3 rounded-md font-medium"
                >
                  Descubrir Servicios
                </Link>
              </AnimatedButton>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  )
}
