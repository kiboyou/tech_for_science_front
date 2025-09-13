import { GalleryDetailClient } from "@/front/components/pages/GalleryDetailClient";
import { ClientFooter } from "@/front/components/sections/ClientFooter";
import { ClientHeader } from "@/front/components/sections/ClientHeader";
import { GALLERY_ITEMS } from "@/front/lib/gallery";
import { notFound } from "next/navigation";

export default function GalleryDetail({ params }: { params: { id: string } }) {
  const item = GALLERY_ITEMS.find((g) => g.id === params.id);
  if (!item) return notFound();
  return (
    <>
      <ClientHeader />
      <main className="mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8 py-16">
        <GalleryDetailClient item={item} />
      </main>
  <ClientFooter />
    </>
  );
}
