// Backend base URL comes from .env.local (NEXT_PUBLIC_BACKEND_URL)
// Normalize by stripping trailing slash; fallback to dev localhost.
export const API_BASE = (process.env.NEXT_PUBLIC_BACKEND_URL || "")
  .replace(/\/$/, "");

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

// Normalize/sanitize media URLs coming from the backend
// - Drop known sample placeholders ("/media/sample-*.jpg")
// - Return absolute URLs for relative media paths
// - Return undefined for empty/invalid values so UI skips rendering images
function sanitizeMediaUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  const u = String(url).trim();
  if (!u) return undefined;
  // Ignore known sample placeholders
  if (/\/media\/sample-\d+\.(?:jpg|jpeg|png|webp|gif|mp4)$/i.test(u)) return undefined;
  // If already absolute (http/https), keep as is
  if (/^https?:\/\//i.test(u)) return u;
  // If relative media path from backend, prefix with API_BASE
  if (u.startsWith('/')) return `${API_BASE}${u}`;
  return undefined;
}

export type AtelierDTO = {
  id: number;
  title: string;
  slug: string;
  summary?: string;
  content?: string;
  cover_image?: string | null;
  video_url?: string | null;
  location?: string;
  start_date?: string | null;
  end_date?: string | null;
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
  is_featured?: boolean;
};

export const api = {
  getAteliers: async () => {
    const list = await fetchJSON<AtelierDTO[]>(`/api/main/ateliers/?ordering=-start_date`);
    return list.map(a => ({
      ...a,
      cover_image: sanitizeMediaUrl(a.cover_image) || null,
      images: (a.images || [])
        .map(i => ({ ...i, image_url: sanitizeMediaUrl(i.image_url) || "" }))
        .filter(i => !!i.image_url),
    }));
  },
  getAtelier: async (slug: string) => {
    const a = await fetchJSON<AtelierDTO>(`/api/main/ateliers/${encodeURIComponent(slug)}/`);
    return {
      ...a,
      cover_image: sanitizeMediaUrl(a.cover_image) || null,
      video_url: sanitizeMediaUrl(a.video_url) || null,
      images: (a.images || [])
        .map(i => ({ ...i, image_url: sanitizeMediaUrl(i.image_url) || "" }))
        .filter(i => !!i.image_url),
    } as AtelierDTO;
  },
  getAteliersPromoted: async () => {
    const list = await fetchJSON<AtelierDTO[]>(`/api/main/ateliers/promoted/`);
    return list.map(a => ({
      ...a,
      cover_image: sanitizeMediaUrl(a.cover_image) || null,
      images: (a.images || [])
        .map(i => ({ ...i, image_url: sanitizeMediaUrl(i.image_url) || "" }))
        .filter(i => !!i.image_url),
    }));
  },
  getBlogPosts: async () => {
    const list = await fetchJSON<BlogPostDTO[]>(`/api/main/blog/?ordering=-published_at`);
    return list.map(p => ({ ...p, cover_image: sanitizeMediaUrl(p.cover_image) || null }));
  },
  getBlogPost: async (slug: string) => {
    const p = await fetchJSON<BlogPostDTO>(`/api/main/blog/${encodeURIComponent(slug)}/`);
    return { ...p, cover_image: sanitizeMediaUrl(p.cover_image) || null } as BlogPostDTO;
  },
  getEquipe: async () => {
    const list = await fetchJSON<TeamMemberDTO[]>(`/api/main/equipe/?ordering=order`);
    return list.map(m => ({ ...m, photo: sanitizeMediaUrl(m.photo) || null }));
  },
  getInfos: async (type?: string) => {
    const list = await fetchJSON<InfoDTO[]>(`/api/main/infos/${type ? `?info_type=${encodeURIComponent(type)}` : ""}`);
    return list.map(i => ({ ...i, cover_image: sanitizeMediaUrl(i.cover_image) || null }));
  },
  getInfo: async (slug: string) => {
    const i = await fetchJSON<InfoDTO>(`/api/main/infos/${encodeURIComponent(slug)}/`);
    return { ...i, cover_image: sanitizeMediaUrl(i.cover_image) || null } as InfoDTO;
  },
  getInfosPromoted: async () => {
    const list = await fetchJSON<InfoDTO[]>(`/api/main/infos/promoted/`);
    return list.map(i => ({ ...i, cover_image: sanitizeMediaUrl(i.cover_image) || null }));
  },
};

export type InfoDTO = {
  id: number;
  title: string;
  slug: string;
  info_type: "concours" | "bourse" | "challenge";
  excerpt?: string;
  content?: string;
  procedure?: string;
  link_url?: string | null;
  deadline?: string | null;
  cover_image?: string | null;
};
