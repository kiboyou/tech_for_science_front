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
    image: dto.cover_image || undefined,
    images: (dto.images || []).map(i => i.image_url) as readonly string[],
  };
  return (
    <div className="min-h-screen flex flex-col">
      <ClientHeader />
      <main className="flex-1 mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8 py-16">
        <AtelierDetailClient item={item} />
      </main>
      <ClientFooter />
    </div>
  );
}
