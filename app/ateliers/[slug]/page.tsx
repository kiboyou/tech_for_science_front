import { AtelierDetailClient } from "@/front/components/pages/AtelierDetailClient";
import { ClientFooter } from "@/front/components/sections/ClientFooter";
import { ClientHeader } from "@/front/components/sections/ClientHeader";
import { api } from "@/front/lib/api";
import { notFound } from "next/navigation";

export default async function AtelierDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  if (!slug) return notFound();
  let dto: Awaited<ReturnType<typeof api.getAtelier>> | null = null;
  try {
    dto = await api.getAtelier(slug);
  } catch {}
  if (!dto) return notFound();
  const item = {
    title: dto.title,
    desc: dto.summary || "",
    meta: [dto.location, dto.start_date ? new Date(dto.start_date).toLocaleDateString() : ""].filter(Boolean).join(" — "),
    content: dto.content || "",
    location: dto.location || "",
    startDate: dto.start_date || null,
    image: dto.cover_image || undefined,
    video: dto.video_url || undefined,
    images: (dto.images || []).map(i => i.image_url) as readonly string[],
  };
  return (
    <div className="min-h-screen flex flex-col">
      <ClientHeader />
      <main className="flex-1">
        <AtelierDetailClient item={item} />
      </main>
      <ClientFooter />
    </div>
  );
}
