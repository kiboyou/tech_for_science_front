import { BlogDetailClient } from "@/front/components/pages/BlogDetailClient";
import { ClientFooter } from "@/front/components/sections/ClientFooter";
import { ClientHeader } from "@/front/components/sections/ClientHeader";
import { api } from "@/front/lib/api";
import { notFound } from "next/navigation";

export default async function BlogDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  if (!slug) return notFound();
  let dto: Awaited<ReturnType<typeof api.getBlogPost>> | null = null;
  try { dto = await api.getBlogPost(slug); } catch {}
  if (!dto) return notFound();
  const item = {
    title: dto.title,
    author: "",
    tag: "",
    excerpt: dto.excerpt || "",
    cover: dto.cover_image || undefined,
    images: (dto.images || []).map(i => i.image_url) as readonly string[],
  };
  return (
    <>
      <ClientHeader />
      <main className="mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8 py-16">
        <BlogDetailClient item={item} />
      </main>
  <ClientFooter />
    </>
  );
}
