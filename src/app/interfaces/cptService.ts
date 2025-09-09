export interface Service {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string
  }
  acf: {
    description: string;
    icon: string;
    featured: boolean;
  };
}

export interface ServiceCardProps {
  service: Service;
  featured?: boolean;
}