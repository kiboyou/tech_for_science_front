export const API_BASE = process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, "") || "http://localhost:8000";

async function fetchJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    // Revalidate frequently in dev; adjust as needed
    next: { revalidate: 30 },
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
  } as any);
  if (!res.ok) throw new Error(`API ${path} ${res.status}`);
  return (await res.json()) as T;
}

export type AtelierDTO = {
  id: number;
  title: string;
  slug: string;
  summary?: string;
  cover_image?: string | null;
  location?: string;
  start_date?: string | null;
  images?: { id: number; image_url: string; caption?: string; order?: number }[];
};

export type BlogPostDTO = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  cover_image?: string | null;
  published_at?: string | null;
  images?: { id: number; image_url: string; caption?: string; order?: number }[];
};

export type TeamMemberDTO = {
  id: number;
  name: string;
  role?: string;
  bio?: string;
  photo?: string | null;
};

export const api = {
  getAteliers: () => fetchJSON<AtelierDTO[]>(`/api/main/ateliers/?ordering=-start_date`),
  getAtelier: (slug: string) => fetchJSON<AtelierDTO>(`/api/main/ateliers/${encodeURIComponent(slug)}/`),
  getBlogPosts: () => fetchJSON<BlogPostDTO[]>(`/api/main/blog/?ordering=-published_at`),
  getBlogPost: (slug: string) => fetchJSON<BlogPostDTO>(`/api/main/blog/${encodeURIComponent(slug)}/`),
  getEquipe: () => fetchJSON<TeamMemberDTO[]>(`/api/main/equipe/?ordering=order`),
};
