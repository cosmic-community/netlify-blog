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

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    description?: string;
  };
}

export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    avatar?: CosmicImage;
    role?: string;
    bio?: string;
  };
}

export interface Blog extends CosmicObject {
  type: 'blog';
  metadata: {
    seo_description?: string;
    featured_image?: CosmicImage;
    published_at?: string;
    content?: string;
    category?: Category | string | null;
    author?: Author | string | null;
  };
}

export interface DisplayCategory {
  name: string;
  slug: string;
  color: string;
}

export interface DisplayAuthor {
  name: string;
  role?: string;
  avatarUrl?: string;
}

export interface BlogListResult {
  posts: Blog[];
  total: number;
}

export function isBlog(obj: CosmicObject): obj is Blog {
  return obj.type === 'blog';
}
