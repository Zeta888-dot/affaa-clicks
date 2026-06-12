import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affaa Clicks — Nature & Landscape Photography from Chitral",
  description: "Explore stunning nature and landscape photography from Chitral, Pakistan by Affaa. Travel guides, photo tips, and cultural insights from the Hindu Kush.",
  keywords: "Affaa Clicks, Chitral photography, Pakistan landscape, Hindu Kush photos, nature photography Pakistan, travel blogger Chitral",
};
import { client, urlFor } from "@/lib/sanity/client";
import { featuredPhotosQuery, allCategoriesQuery } from "@/lib/sanity/queries";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "./components/FadeIn";

export default async function Home() {
  const photos = await client.fetch(featuredPhotosQuery);
  const categories = await client.fetch(allCategoriesQuery);

  return (
    <div className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>

      {/* Hero */}
      <FadeIn>
        <section className="flex flex-col items-center justify-center min-h-[85vh] px-8 text-center">
          <p style={{
            fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase',
            color: 'var(--accent)', marginBottom: '24px', fontFamily: 'var(--font-body)'
          }}>
            Nature & Landscape Photography
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(52px, 10vw, 96px)',
            fontWeight: 300, lineHeight: 1.05, marginBottom: '24px', color: 'var(--foreground)'
          }}>
            Where Light<br />Meets <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Wild</em>
          </h1>
          <p style={{
            fontSize: '14px', color: 'var(--muted)', letterSpacing: '1px',
            marginBottom: '48px', maxWidth: '420px', lineHeight: 1.7
          }}>
            Cinematic landscapes captured through years of chasing golden light across mountains and valleys
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/gallery" style={{
              padding: '13px 36px', backgroundColor: 'var(--accent)', color: 'var(--background)',
              fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
              fontWeight: 500, borderRadius: '2px',
            }}>
              View Gallery
            </Link>
            <Link href="/about" style={{
              padding: '13px 36px', border: '0.5px solid var(--border)', color: 'var(--accent)',
              fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
              borderRadius: '2px',
            }}>
              My Story
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* Stats */}
      <div style={{ borderTop: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)', display: 'flex' }}>
        {[
          { num: '500+', label: 'Expeditions' },
          { num: '10+', label: 'Years' },
          { num: '12', label: 'Countries' },
          { num: '200+', label: 'Clients' },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, padding: '28px 16px', textAlign: 'center',
            borderRight: i < 3 ? '0.5px solid var(--border)' : 'none'
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '42px', fontWeight: 300, color: 'var(--accent)', lineHeight: 1 }}>
              {s.num}
            </div>
            <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '6px' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Featured Photos */}
      <section className="px-8 py-24 max-w-7xl mx-auto">
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--accent)' }}>
              Featured Work
            </p>
            <div style={{ flex: 1, height: '0.5px', backgroundColor: 'var(--border)' }} />
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {photos.map((photo: any, index: number) => (
            <FadeIn key={photo._id} delay={index * 0.1}>
              <div className="relative aspect-[4/3] overflow-hidden group" style={{ borderRadius: '2px' }}>
                <Image
                  src={urlFor(photo.image).url()}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5"
                  style={{ background: 'linear-gradient(to top, rgba(8,12,11,0.8) 0%, transparent 60%)' }}>
                  <div>
                    <p style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px' }}>
                      {photo.category?.title}
                    </p>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 300, color: '#e8ede8' }}>
                      {photo.title}
                    </h3>
                    <p style={{ fontSize: '11px', color: 'rgba(232,237,232,0.5)', marginTop: '2px', letterSpacing: '1px' }}>
                      #AffaaClicks
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-8 py-24 max-w-7xl mx-auto">
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--accent)' }}>
              Categories
            </p>
            <div style={{ flex: 1, height: '0.5px', backgroundColor: 'var(--border)' }} />
          </div>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {categories.map((cat: any, index: number) => (
            <FadeIn key={cat._id} delay={index * 0.1}>
              <Link
                href={`/gallery?category=${cat.slug.current}`}
                className="relative overflow-hidden group block"
                style={{ aspectRatio: '1/1', minHeight: '150px', borderRadius: '2px' }}
              >
                {cat.coverImage ? (
                  <Image
                    src={urlFor(cat.coverImage).url()}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0" style={{ backgroundColor: 'var(--muted)', opacity: 0.15 }} />
                )}
                <div className="absolute inset-0 flex items-end p-4"
                  style={{ background: 'linear-gradient(to top, rgba(8,12,11,0.75) 0%, transparent 60%)' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: '20px',
                    fontWeight: 300, color: '#e8ede8', letterSpacing: '1px'
                  }}>
                    {cat.title}
                  </h3>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}