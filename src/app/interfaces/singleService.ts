export interface Service {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf: {
    description: string;
    icon: string;
    featured: boolean;
    full_description?: string;
    gallery?: string[];
    price?: string;
    duration?: string;
    features?: string[];
  };
}

export interface Props {
  params: Promise<{
    slug: string;
  }>;
}
