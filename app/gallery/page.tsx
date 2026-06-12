import { client } from "@/lib/sanity/client";
import { allPhotosQuery, allCategoriesQuery } from "@/lib/sanity/queries";
import GalleryGrid from "../components/GalleryGrid";

export default async function GalleryPage() {
  const photos = await client.fetch(allPhotosQuery);
  const categories = await client.fetch(allCategoriesQuery);

  return (
    <div className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-7xl mx-auto px-8 py-24">

        {/* Header */}
        <div className="text-center mb-16">
          <p style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>
            Portfolio
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 8vw, 80px)', fontWeight: 300, lineHeight: 1.05 }}>
            The Gallery
          </h1>
        </div>

        <GalleryGrid photos={photos} categories={categories} />
      </div>
    </div>
  );
}