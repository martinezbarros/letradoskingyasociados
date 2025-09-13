// app/servicios/page.tsx
import React from 'react';
import { Metadata } from 'next';
import ServicesSection from '../../ui/components/ServicesSection';
import { getSiteInfo } from '../../lib/wordpress';
import HeroSection from '../../ui/components/HeroSection';

import * as motion from "motion/react-client";

const siteInfo = await getSiteInfo();
export const metadata: Metadata = {
  title: `Servicios - ${siteInfo.name}`,
  description: 'Servicios jurídicos de Letrados King: Litigio constitucional, amparos, derecho administrativo, consultoría gubernamental y defensa de derechos humanos.',
  keywords: ["litigio constitucional", "recursos de amparo", "derecho administrativo", "consultoría gubernamental", "defensa derechos humanos", "servicios legales especializados"]
};

export default async function Servicios() {
  return (
    <>
    <motion.div 
      layout 
      initial={{opacity: 0}}
      animate={{ opacity: 1 }} 
      transition={{
        default: { ease: "linear" },
        layout: { duration: 0.3 }
      }}>
      <HeroSection pageTitle="Servicios"/>
      <ServicesSection />
    </motion.div>
    </>
  );
}