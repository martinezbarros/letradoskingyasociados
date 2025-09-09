// lib/wordpress.ts
import { WPPost, WPCategory } from "../interfaces/wordpressApi";
const NEXT_PUBLIC_WP_API_URL_CLIENT = process.env.NEXT_PUBLIC_WP_API_URL_CLIENT;

if (!NEXT_PUBLIC_WP_API_URL_CLIENT) {
  throw new Error('WORDPRESS_API_URL is not defined in environment variables');
}


// Función para obtener posts con paginación
export async function getPosts(page = 1, perPage = 10): Promise<{ posts: WPPost[]; total: number; totalPages: number }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WP_API_URL_CLIENT}/wp/v2/posts?page=${page}&per_page=${perPage}&_embed`,
      {
        next: { revalidate: 60 }, // Revalidar cada minuto
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
    }

    const posts: WPPost[] = await response.json();

    // Extraer metadata de la respuesta
    const total = Number(response.headers.get("X-WP-Total")) || 0;
    const totalPages = Number(response.headers.get("X-WP-TotalPages")) || 0;

    return { posts, total, totalPages };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [], total: 0, totalPages: 0 };
  }
}


// Función para obtener un post específico por slug
export async function getPost(slug: string): Promise<WPPost | null> {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_WP_API_URL_CLIENT}/wp/v2/posts?slug=${slug}&_embed`,
      {
        next: { revalidate: 60 }, // Revalidar cada minuto
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status} ${response.statusText}`);
    }

    const posts: WPPost[] = await response.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Función para obtener categorías
export async function getCategories(): Promise<WPCategory[]> {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_WP_API_URL_CLIENT}/wp/v2/categories?per_page=100`,
      {
        next: { revalidate: 3600 }, // Revalidar cada hora
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
    }

    const categories: WPCategory[] = await response.json();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Función para obtener posts por categoría
export async function getPostsByCategory(categoryId: number, page = 1, perPage = 10): Promise<WPPost[]> {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_WP_API_URL_CLIENT}/wp/v2/posts?categories=${categoryId}&page=${page}&per_page=${perPage}&_embed`,
      {
        next: { revalidate: 60 }, // Revalidar cada minuto
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch posts by category: ${response.status} ${response.statusText}`);
    }

    const posts: WPPost[] = await response.json();
    return posts;
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

// Función para obtener información del sitio
export async function getSiteInfo() {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_WP_API_URL_CLIENT}/`,
      {
        next: { revalidate: 3600 }, // Revalidar cada hora
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch site info: ${response.status} ${response.statusText}`);
    }

    const siteInfo = await response.json();
    return siteInfo;
  } catch (error) {
    console.error('Error fetching site info:', error);
    return null;
  }
}