// components/CategoryCard.tsx
import React from 'react';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">
          <Link 
            href={`/blog/categoria/${category.slug}`}
            className="text-gray-900 hover:text-blue-600 transition-colors"
          >
            {category.name}
          </Link>
        </h3>
        {category.description && (
          <p 
            className="text-gray-600 mb-4"
            dangerouslySetInnerHTML={{ __html: category.description }} 
          />
        )}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {category.count} {category.count === 1 ? 'artículo' : 'artículos'}
          </span>
          <Link 
            href={`/blog/categoria/${category.slug}`}
            className="text-blue-600 font-medium hover:text-blue-800 transition-colors inline-flex items-center"
          >
            Ver todos
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;