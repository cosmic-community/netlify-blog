export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface Blog extends CosmicObject {
  type: 'blog';
  metadata: {
    seo_description?: string;
    featured_image?: CosmicImage;
    published_at?: string;
    content?: string;
  };
}

export interface DisplayCategory {
  name: string;
  color: string;
}

export interface BlogListResult {
  posts: Blog[];
  total: number;
}

export function isBlog(obj: CosmicObject): obj is Blog {
  return obj.type === 'blog';
}