// app/blog/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Pagination from '../ui/components/Paginacion';
import { getPosts, getCategories, getSiteInfo } from '../lib/wordpress';
import { WPPost } from '../interfaces/wordpressApi';
import HeroSection from '../ui/components/HeroSection';

import * as motion from "motion/react-client";

const siteInfo = await getSiteInfo();
export const metadata: Metadata = {
  title: `Blog - ${siteInfo.name}`,
  description: 'Artículos sobre desarrollo web, diseño y marketing digital',
};

export default async function Blog(props: { searchParams?: Promise<{ page?: string }> }) {
  const searchParams = await props.searchParams;
  const page =  Number(searchParams?.page) || 1;
  const [posts, categories] = await Promise.all([
    getPosts(page, 4),
    getCategories()
  ]);
  // Función para obtener la URL de la imagen destacada
  const getFeaturedImage = (post: WPPost) => {
    if (post._embedded?.['wp:featuredmedia']?.[0]) {
      return post._embedded['wp:featuredmedia'][0].source_url;
    }
    return '/placeholder-blog.png';
  };
  // Función para obtener el texto del excerpt sin HTML
  const getExcerpt = (post: WPPost) => {
    const excerpt = post.excerpt.rendered;
    return excerpt.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
  };

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
        <HeroSection pageTitle="Nuestro Blog" />
        <section className="py-16 bg-gradient-to-br from-gray-200 to-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              {/* <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Mantente informado en nuestra sección de publicaciones.
              </p> */}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {posts.posts.map((post) => (
                    <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative w-full">
                        <Image
                          src={getFeaturedImage(post)}
                          alt={post.title.rendered}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        {/* <img src={getFeaturedImage(post)} alt={post.title.rendered} className='object-cover' /> */}
                      </div>
                      <div className="p-6">
                        <div className="text-sm text-gray-500 mb-2">
                          {formatDate(post.date)} • Por {post._embedded?.author?.[0]?.name || 'Admin'}
                        </div>
                        <h2 className="text-xl font-semibold mb-3 hover:text-blue-600 transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title.rendered}
                          </Link>
                        </h2>
                        <div 
                          className="text-gray-600 mb-4"
                          dangerouslySetInnerHTML={{ __html: getExcerpt(post) }} 
                        />
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="text-blue-600 font-medium hover:text-blue-800 transition-colors inline-flex items-center"
                        >
                          Leer más
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Paginación */}
                { posts.totalPages > 1 && (
                  <Pagination currentPage={page} totalPages={posts.totalPages}/>
                )}
                {/* <div className="mt-12 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button className="px-4 py-2 text-gray-500 bg-gray-100 rounded-md hover:bg-blue-100 hover:text-blue-600">
                      Anterior
                    </button>
                    <button className="px-4 py-2 text-white bg-blue-600 rounded-md">1</button>
                    <button className="px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-blue-100">2</button>
                    <button className="px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-blue-100">3</button>
                    <button className="px-4 py-2 text-gray-500 bg-gray-100 rounded-md hover:bg-blue-100 hover:text-blue-600">
                      Siguiente
                    </button>
                  </nav>
                </div> */}
              </div>

              <div className="lg:w-1/3">
                {/* <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4">Buscar en el blog</h3>
                  <div className="flex">
                    <input 
                      type="text" 
                      placeholder="Buscar artículos..." 
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
                      Buscar
                    </button>
                  </div>
                </div> */}

                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4">Categorías</h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.id} className="flex justify-between items-center">
                        <Link 
                          href={`/blog/categoria/${category.slug}`}
                          className="text-gray-700 hover:text-blue-600 transition-colors"
                        >
                          {category.name}
                        </Link>
                        <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4">Artículos recientes</h3>
                  <ul className="space-y-4">
                    {posts.posts.slice(0, 3).map((post) => (
                      <li key={post.id} className="flex items-start">
                        <div className="flex-shrink-0 w-16 h-16 relative mr-4">
                          <Image
                            src={getFeaturedImage(post)}
                            alt={post.title.rendered}
                            fill
                            className="object-cover rounded"
                          />
                          {/* <img src={getFeaturedImage(post)} alt={post.title.rendered} className='object-cover rounded' /> */}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                            <Link href={`/blog/${post.slug}`}>
                              {post.title.rendered}
                            </Link>
                          </h4>
                          <p className="text-sm text-gray-500">{formatDate(post.date)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
}