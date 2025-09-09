// app/blog/[slug]/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPost, getPosts, getSiteInfo } from '../../lib/wordpress';

import * as motion from "motion/react-client";

import { Props } from '@/app/interfaces/singlePost';
import Breadcrumb from '@/app/ui/components/Breadcrumb';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    return {
      title: 'Post no encontrado',
    };
  }
  
  // Obtener imagen destacada para OpenGraph
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const siteInfo = await getSiteInfo();
  return {
    title: `${post.title.rendered} - Blog | ${siteInfo.name}`,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
    openGraph: {
      title: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
      images: featuredImage ? [{ url: featuredImage }] : [],
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: post._embedded?.author?.map(author => author.name) || [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPosts(1, 100);
  
  return posts.posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    notFound();
  }

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Obtener categorías
  const categories = post._embedded?.['wp:term']?.[0]?.filter(term => term.taxonomy === 'category') || [];
  
  // Obtener autor
  const author = post._embedded?.author?.[0];
  
  // Obtener imagen destacada
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];

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
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb currentPage={post.title.rendered} parentPage="blog" />
        
        {/* Encabezado del post */}
        <header className="mb-8">
          <h1 
            className="text-4xl font-bold text-gray-900 mb-4" 
            dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
          />
          
          <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4">
            {author && (
              <div className="flex items-center mr-6 mb-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                  <Image
                    src={author.avatar_urls['96'] || '/avatar-placeholder.png'}
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                  {/* <img src={author.avatar_urls['96']} alt={author.name} className='object-cover' /> */}
                </div>
                <span>{author.name}</span>
              </div>
            )}
            
            <time className="mr-6 mb-2" dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mr-6 mb-2">
                {categories.map(category => (
                  <Link 
                    key={category.id} 
                    href={`/blog/categoria/${category.slug}`}
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded hover:bg-blue-200 transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {featuredImage && (
            <div className="relative h-96 w-full rounded-xl overflow-hidden mb-6">
              <Image
                src={featuredImage.source_url}
                alt={featuredImage.alt_text || post.title.rendered}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
              {/* <img src={featuredImage.source_url} alt={featuredImage.alt_text} className='object-cover' /> */}
            </div>
          )}
        </header>

        {/* Contenido del post */}
        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
        />

        {/* Autor box */}
        {author && (
          <div className="bg-gray-50 rounded-xl p-6 mb-12">
            <div className="flex items-center mb-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                <Image
                  src={author.avatar_urls['96'] || '/avatar-placeholder.png'}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
                {/* <img src={author.avatar_urls['96']} alt={author.name} className='object-cover' /> */}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{author.name}</h3>
                <p className="text-gray-600">Autor del artículo</p>
              </div>
            </div>
            <p className="text-gray-700">
              Este artículo fue escrito por {author.name}.
            </p>
          </div>
        )}

        {/* Navegación entre posts */}
        {/* <div className="flex justify-between border-t border-gray-200 pt-8">
          <div>
            <span className="text-sm text-gray-600 block mb-1">Artículo anterior</span>
            <Link href="#" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Cómo optimizar el rendimiento de WordPress
            </Link>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-600 block mb-1">Siguiente artículo</span>
            <Link href="#" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Las mejores prácticas de SEO técnico
            </Link>
          </div>
        </div> */}
      </article>
    </motion.div>
    </>
  );
}