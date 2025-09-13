// app/contacto/gracias/page.tsx
import React from 'react';
import Link from 'next/link';

import * as motion from "motion/react-client";

export default function Gracias() {
  return (
    <motion.div 
      layout 
      initial={{opacity: 0}}
      animate={{ opacity: 1 }} 
      transition={{
        default: { ease: "linear" },
        layout: { duration: 0.3 }
      }}
    >
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto">
            <svg className="w-16 h-16 text-green-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Mensaje enviado con éxito!</h1>
            <p className="text-xl text-gray-700 mb-6">
              Gracias por contactarnos. Te responderemos lo antes posible.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Volver al inicio
              </Link>
              <Link 
                href="/blog"
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors font-medium"
              >
                Ver nuestro blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}