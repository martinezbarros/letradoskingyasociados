// app/not-found.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

const NotFound: React.FC = () => {
  // Animaciones para los elementos de la página
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <motion.div
        className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="p-8 text-center">
          {/* Icono animado */}
          <motion.div
            className="mb-6"
            variants={itemVariants}
            animate={floatingAnimation.transition}
          >
            <svg className="w-32 h-32 mx-auto text-[#010101]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>

          {/* Título */}
          <motion.h1 
            className="text-6xl font-bold text-gray-900 mb-4"
            variants={itemVariants}
          >
            404
          </motion.h1>

          {/* Subtítulo */}
          <motion.h2 
            className="text-2xl font-semibold text-gray-800 mb-6"
            variants={itemVariants}
          >
            Página no encontrada
          </motion.h2>

          {/* Mensaje */}
          <motion.p 
            className="text-gray-600 mb-8"
            variants={itemVariants}
          >
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </motion.p>

          {/* Botones de acción */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-[#010101] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Volver al inicio
              </motion.button>
            </Link>
            
            <Link href="/contacto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-[#010101] text-[#010101] rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Contactar soporte
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Patrón decorativo en la parte inferior */}
        <motion.div 
          className="h-2 bg-gradient-to-r from-slate-800 to-slate-900"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        />
      </motion.div>
    </div>
  );
};

export default NotFound;