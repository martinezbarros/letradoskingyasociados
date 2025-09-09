'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

export default function ChatwayDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Función para verificar si estamos en desktop
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Verificar al montar el componente
    checkDevice();

    // Agregar listener para cambios de tamaño
    window.addEventListener('resize', checkDevice);

    // Cleanup
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <>
      {isDesktop && (
        <Script
          id="chatway"
          strategy="afterInteractive"
          src="https://cdn.chatway.app/widget.js?id=bD6CePDIiL4m"
        />
      )}
    
    </>
  );
}