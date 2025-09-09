// components/Navigation.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AnimatedButton from '../motion/AnimatedButton';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  ID: number;
  title: string;
  url: string;
  object_slug: string;
  children?: MenuItem[];
}

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubmenus, setOpenMobileSubmenus] = useState<number[]>([]);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { ID: 1, title: 'Inicio', url: '/', object_slug: 'home' },
    { ID: 2, title: 'Nosotros', url: '/nosotros', object_slug: 'nosotros' },
    {
      ID: 3,
      title: 'Servicios',
      url: '/servicios',
      object_slug: 'services',
      /* children: [
        { ID: 21, title: 'Derecho comercial', url: '/servicios/derecho-comercial', object_slug: 'derecho-comercial' },
        { ID: 22, title: 'Servicios fiduciarios', url: '/servicios/servicios-fiduciarios', object_slug: 'servicios-fiduciarios' },
        { ID: 23, title: 'Asesoría de inversiones', url: '/servicios/asesoria-de-inversiones', object_slug: 'asesoria-de-inversiones' },
        { ID: 24, title: 'Estructuras internacionales', url: '/servicios/estructuras-internacionales', object_slug: 'estructuras-internacionales' },
      ], */
    },
    /* { ID: 4, title: 'Galería de Imágenes', url: '/galeria', object_slug: 'galeria' },
    {
      ID: 5,
      title: 'Publicaciones',
      url: '/blog',
      object_slug: 'blog',
      children: [
        { ID: 51, title: 'Noticias', url: '/blog/noticias', object_slug: 'noticias' },
        { ID: 52, title: 'Artículos', url: '/blog/articulos', object_slug: 'articulos' },
      ],
    }, */
    { ID: 6, title: 'Contacto', url: '/contacto', object_slug: 'contact' },
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileSubmenus([]);
  }, [pathname]);

  const isActive = (item: MenuItem): boolean => {
    if (pathname === item.url || pathname.startsWith(item.url + '/')) return true;
    if (item.children) return item.children.some((child) => isActive(child));
    return false;
  };

  const toggleMobileSubmenu = (id: number) => {
    setOpenMobileSubmenus((prev) =>
      prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id]
    );
  };

  const renderMenuItem = (item: MenuItem) => {
    const active = isActive(item);
    return (
      <li key={item.ID} className="relative group">
        <AnimatedButton>
          <Link
            href={item.url}
            className={`font-medium transition-colors ${
              active ? 'text-[#BE9A42]' : 'text-primary-50 hover:text-amber-200'
            }`}
          >
            {item.title}
          </Link>
        </AnimatedButton>

        {item.children && (
          <AnimatePresence>
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-full  hidden min-w-[280px] space-y-2 rounded-lg bg-[#010101] p-3 shadow-lg group-hover:block"
            >
              {item.children.map((child) => (
                <li key={child.ID}>
                  <Link
                    href={child.url}
                    className={`block font-medium transition-colors ${
                      isActive(child)
                        ? 'text-[#BE9A42]'
                        : 'text-primary-50 hover:text-amber-200'
                    }`}
                  >
                    {child.title}
                  </Link>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        )}
      </li>
    );
  };

  const renderMobileItem = (item: MenuItem) => {
    const active = isActive(item);
    const isOpen = openMobileSubmenus.includes(item.ID);

    return (
      <li key={item.ID}>
        <div className="flex items-center justify-between">
          <Link
            href={item.url}
            className={`block py-2 font-medium transition-colors ${
              active ? 'text-[#BE9A42]' : 'text-primary-50 hover:text-amber-200'
            }`}
          >
            {item.title}
          </Link>
          {item.children && (
            <button
              onClick={() => toggleMobileSubmenu(item.ID)}
              className="text-primary-50 focus:outline-none"
              aria-label="Toggle submenu"
            >
              {isOpen ? '−' : '+'}
            </button>
          )}
        </div>

        {item.children && (
          <AnimatePresence>
            {isOpen && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="ml-4 mt-1 space-y-2 border-l border-border pl-3 overflow-hidden"
              >
                {item.children.map((child) => (
                  <li key={child.ID}>
                    <Link
                      href={child.url}
                      className={`block py-1 text-sm transition-colors ${
                        isActive(child)
                          ? 'text-[#BE9A42]'
                          : 'text-primary-50 hover:text-amber-200'
                      }`}
                    >
                      {child.title}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        )}
      </li>
    );
  };

  return (
    <nav className="bg-[#010101] border-t border-b border-border  md:absolute w-full md:left-0 md:top-0 shadow-sm shadow-white">
      <div className="container mx-auto px-4">
        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <ul className="flex space-x-8 py-3">{menuItems.map((item) => renderMenuItem(item))}</ul>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <div className="flex justify-end items-center py-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-primary-50 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="py-4 border-t border-border overflow-hidden"
              >
                <ul className="space-y-3">
                  {menuItems.map((item) => renderMobileItem(item))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
