export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface Props {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}