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

      {/* Hero with Background Image */}
      <FadeIn>
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/Hero.jpeg"
              alt="Landscape"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0" 
              style={{ background: 'linear-gradient(to bottom, rgba(8,12,11,0.6) 0%, rgba(8,12,11,0.3) 50%, var(--background) 100%)' }} 
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <p style={{
              fontSize: '11px', letterSpacing: '5px', textTransform: 'uppercase',
              color: 'var(--accent)', marginBottom: '32px', fontFamily: 'var(--font-body)'
            }}>
              Nature & Landscape Photography
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(52px, 10vw, 96px)',
              fontWeight: 300, lineHeight: 1.05, marginBottom: '32px', color: '#e8ede8'
            }}>
              Where Light<br />Meets <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Wild</em>
            </h1>
            <p style={{
              fontSize: '15px', color: 'rgba(232,237,232,0.7)', letterSpacing: '1px',
              marginBottom: '48px', maxWidth: '480px', lineHeight: 1.7, margin: '0 auto 48px'
            }}>
              Cinematic landscapes captured through years of chasing golden light across mountains and valleys
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/gallery" style={{
                padding: '14px 40px', backgroundColor: 'var(--accent)', color: 'var(--background)',
                fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
                fontWeight: 500, borderRadius: '2px', transition: 'opacity 0.3s'
              }}>
                View Gallery
              </Link>
              <Link href="/about" style={{
                padding: '14px 40px', border: '1px solid rgba(232,237,232,0.3)', color: '#e8ede8',
                fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
                borderRadius: '2px', transition: 'all 0.3s'
              }}>
                My Story
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
            </div>
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