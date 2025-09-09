// components/Header.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSiteInfo } from '@/app/lib/wordpress';

import AnimatedButton from '../motion/AnimatedButton';

const siteInfo = await getSiteInfo();
const Header: React.FC = () => {
  return (
    <header className="bg-bg-primary shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="relative w-32 h-32 mr-3">
            <Image
              src={siteInfo.site_icon_url}
              alt="Logo"
              fill
              className="object-cover rounded-full"
            />
          </div>
         {/*  <span className="text-xl font-bold text-text-primary">{siteInfo.name}</span> */}
        </Link>
        
        <div className="flex items-center space-x-4">
          <AnimatedButton>
            <Link 
              href="/contacto" className="hover:bg-primary-700 text-[#010101] border hover:bg-[#010101] hover:text-white px-4 py-2 rounded-md transition-colors">
              Contacto
            </Link>
          </AnimatedButton>
        </div>
      </div>
    </header>
  );
};

export default Header;