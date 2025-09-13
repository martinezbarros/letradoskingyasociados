// app/blog/categorias/page.tsx
import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import CategoryCard from '@/app/ui/components/CategoryCard';

import { getSiteInfo } from '@/app/lib/wordpress';
import { Category } from '@/app/interfaces/category';

import * as motion from "motion/react-client";

const siteInfo = await getSiteInfo();
export const metadata: Metadata = {
  title: `Todas las Categorías - Blog | ${siteInfo.name}`,
  description: 'Explora todas las categorías de nuestro blog',
};

async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WP_API_URL_CLIENT}/wp/v2/categories?per_page=100&orderby=count&order=desc`,
      { next: { revalidate: 3600 } } // Revalidar cada hora
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    const categories: Category[] = await response.json();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getAllCategories();
  
  return (
    <>
    <motion.div
      layout 
      initial={{opacity: 0}}
      animate={{ opacity: 1 }} 
      transition={{
        default: { ease: "linear" },
        layout: { duration: 0.3 }
      }}
    >
      <nav className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="text-blue-600 hover:text-blue-800">Inicio</Link>
              <svg className="w-3 h-3 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="flex items-center">
              <Link href="/blog" className="text-blue-600 hover:text-blue-800">Blog</Link>
              <svg className="w-3 h-3 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-gray-500">Categorías</li>
          </ol>
        </div>
      </nav>

      <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Todas las Categorías</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Explora todos nuestros temas y categorías de artículos
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
    </>
  );
}