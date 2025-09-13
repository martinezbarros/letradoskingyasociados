// app/blog/categoria/[slug]/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { WPPost } from '@/app/interfaces/wordpressApi';

import { Category, Props } from '@/app/interfaces/category';
import { getSiteInfo } from '@/app/lib/wordpress';

import * as motion from "motion/react-client";

// Generar metadata dinámica
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    return {
      title: 'Categoría no encontrada',
    };
  }
  const siteInfo = await getSiteInfo();
  return {
    title: `${category.name} - Blog | ${siteInfo.name}`,
    description: category.description || `Artículos sobre ${category.name}`,
  };
}

// Obtener todas las categorías para generar rutas estáticas
export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WP_API_URL_CLIENT}/wp/v2/categories?per_page=100`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    const categories: Category[] = await response.json();
    
    return categories.map((category) => ({
      slug: category.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Obtener categoría por slug
async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WP_API_URL_CLIENT}/wp/v2/categories?slug=${slug}`,
      { next: { revalidate: 3600 } } // Revalidar cada hora
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch category: ${response.status}`);
    }
    
    const categories: Category[] = await response.json();
    return categories.length > 0 ? categories[0] : null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

// Obtener posts por categoría
async function getPostsByCategory(categoryId: number, page = 1, perPage = 10): Promise<{
  posts: WPPost[];
  totalPages: number;
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WP_API_URL_CLIENT}/wp/v2/posts?categories=${categoryId}&page=${page}&per_page=${perPage}&_embed`,
      { next: { revalidate: 60 } } // Revalidar cada minuto
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    
    // Obtener el total de páginas desde los headers
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);
    
    const posts: WPPost[] = await response.json();
    return { posts, totalPages };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], totalPages: 1 };
  }
}

// Obtener todas las categorías para el sidebar
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

// Obtener posts populares (basado en comentarios o vistas)
async function getPopularPosts(): Promise<WPPost[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WP_API_URL_CLIENT}/wp/v2/posts?order=desc&per_page=5&_embed`,
      { next: { revalidate: 3600 } } // Revalidar cada hora
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch popular posts');
    }
    console.log("Popular posts: ", response)
    const posts: WPPost[] = await response.json();
    return posts;
  } catch (error) {
    console.error('Error fetching popular posts:', error);
    return [];
  }
}

export default async function CategoryPage(props: Props) {
  // Esperar a que los params se resuelvan
  const { slug } = await props.params;
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || '1', 10);
  
  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }
  
  const [{ posts, totalPages }, categories, popularPosts] = await Promise.all([
    getPostsByCategory(category.id, page, 9),
    getAllCategories(),
    getPopularPosts()
  ]);

  // Función para obtener la URL de la imagen destacada
  const getFeaturedImage = (post: WPPost) => {
    if (post._embedded?.['wp:featuredmedia']?.[0]) {
      return post._embedded['wp:featuredmedia'][0].source_url;
    }
    return '/placeholder-blog.jpg';
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
      {/* Breadcrumb */}
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
            <li className="flex items-center">
              <Link href="/blog/categoria" className="text-blue-600 hover:text-blue-800">Categoría</Link>
              <svg className="w-3 h-3 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-gray-500">{category.name}</li>
          </ol>
        </div>
      </nav>

      {/* Header de la categoría */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
          {category.description && (
            <p className="text-xl text-gray-700 max-w-3xl mx-auto" 
               dangerouslySetInnerHTML={{ __html: category.description }} />
          )}
          <p className="text-gray-600 mt-2">
            {category.count} {category.count === 1 ? 'artículo' : 'artículos'} en esta categoría
          </p>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Lista de posts */}
            <div className="lg:w-2/3">
              {posts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.map((post) => (
                      <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-48 w-full">
                            {getFeaturedImage(post) && (
                                <Image
                                    src={getFeaturedImage(post)}
                                    alt={post.title.rendered}
                                    fill
                                    className="object-cover"
                                />
                            )}
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
                  {totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                      <nav className="flex items-center space-x-2">
                        {page > 1 && (
                          <Link
                            href={`/blog/categoria/${slug}?page=${page - 1}`}
                            className="px-4 py-2 text-gray-500 bg-gray-100 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-colors"
                          >
                            Anterior
                          </Link>
                        )}
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                          <Link
                            key={pageNum}
                            href={`/blog/categoria/${slug}?page=${pageNum}`}
                            className={`px-4 py-2 rounded-md transition-colors ${
                              pageNum === page
                                ? 'text-white bg-blue-600'
                                : 'text-gray-700 bg-white hover:bg-blue-100'
                            }`}
                          >
                            {pageNum}
                          </Link>
                        ))}
                        
                        {page < totalPages && (
                          <Link
                            href={`/blog/categoria/${slug}?page=${page + 1}`}
                            className="px-4 py-2 text-gray-500 bg-gray-100 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-colors"
                          >
                            Siguiente
                          </Link>
                        )}
                      </nav>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No hay artículos en esta categoría.</p>
                  <Link href="/blog" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
                    Volver al blog
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Categorías */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Categorías</h3>
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li key={cat.id} className="flex justify-between items-center">
                      <Link 
                        href={`/blog/categoria/${cat.slug}`}
                        className={`transition-colors ${
                          cat.slug === slug
                            ? 'text-blue-600 font-semibold'
                            : 'text-gray-700 hover:text-blue-600'
                        }`}
                      >
                        {cat.name}
                      </Link>
                      <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                        {cat.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Posts populares */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Artículos populares</h3>
                <ul className="space-y-4">
                  {popularPosts.map((post) => (
                    <li key={post.id} className="flex items-start">
                      <div className="flex-shrink-0 w-16 h-16 relative mr-4">
                        <Image
                          src={getFeaturedImage(post)}
                          alt={post.title.rendered}
                          fill
                          className="object-cover rounded"
                        />
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

              {/* Newsletter */}
              <div className="bg-blue-50 rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Suscríbete al newsletter</h3>
                <p className="text-gray-600 mb-4">
                  Recibe las últimas actualizaciones y artículos directamente en tu correo.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Tu correo electrónico"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Suscribirse
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
    </>
  );
}