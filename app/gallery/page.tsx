import { client, urlFor } from "@/lib/sanity/client";
import { allPhotosQuery, allCategoriesQuery } from "@/lib/sanity/queries";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "../components/FadeIn";

export default async function GalleryPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams;
  const photos = await client.fetch(allPhotosQuery);
  const categories = await client.fetch(allCategoriesQuery);

  const filteredPhotos = params.category
    ? photos.filter((p: any) => p.category?.slug?.current === params.category)
    : photos;

  return (
    <div className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      
      <div className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <FadeIn>
          <p className="text-[11px] tracking-[4px] uppercase text-center mb-4"
            style={{ color: 'var(--accent)' }}>
            Portfolio
          </p>
          <h1 className="text-5xl md:text-7xl font-light text-center mb-16"
            style={{ fontFamily: 'var(--font-display)' }}>
            The Gallery
          </h1>
        </FadeIn>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <Link
            href="/gallery"
            className={`px-8 py-3 text-xs tracking-[2px] uppercase rounded-sm transition-all duration-300 ${
              !params.category 
                ? 'text-black' 
                : 'border hover:bg-[var(--accent)] hover:text-black hover:border-transparent'
            }`}
            style={{ 
              backgroundColor: !params.category ? 'var(--accent)' : 'transparent',
              borderColor: 'var(--border)'
            }}
          >
            All
          </Link>
          {categories.map((cat: any) => (
            <Link
              key={cat._id}
              href={`/gallery?category=${cat.slug.current}`}
              className={`px-8 py-3 text-xs tracking-[2px] uppercase rounded-sm transition-all duration-300 ${
                params.category === cat.slug.current
                  ? 'text-black' 
                  : 'border hover:bg-[var(--accent)] hover:text-black hover:border-transparent'
              }`}
              style={{ 
                backgroundColor: params.category === cat.slug.current ? 'var(--accent)' : 'transparent',
                borderColor: 'var(--border)'
              }}
            >
              {cat.title}
            </Link>
          ))}
        </div>

        {/* Photos Grid - Bigger Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo: any, index: number) => (
            <FadeIn key={photo._id} delay={index * 0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer">
                <Image
                  src={urlFor(photo.image).url()}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }}>
                  <div>
                    <p className="text-[10px] tracking-[3px] uppercase mb-2"
                      style={{ color: 'var(--accent)' }}>
                      {photo.category?.title}
                    </p>
                    <h3 className="text-xl font-light text-white">{photo.title}</h3>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-20">
            <p style={{ color: 'var(--muted)' }}>No photos found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}