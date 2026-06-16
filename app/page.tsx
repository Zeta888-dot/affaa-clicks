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
              style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 40%, var(--background) 100%)' }} 
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <p className="text-xs tracking-[5px] uppercase mb-6 font-medium"
              style={{ color: 'var(--accent)' }}>
              Nature & Landscape Photography
            </p>
            <h1 className="mb-6 leading-[0.95]"
              style={{
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(48px, 10vw, 90px)',
                fontWeight: 300, 
                color: '#ffffff'
              }}>
              Where Light<br />
              Meets <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Wild</em>
            </h1>
            <p className="mx-auto mb-10 leading-relaxed"
              style={{
                fontSize: '15px', 
                color: 'rgba(255,255,255,0.8)', 
                maxWidth: '480px'
              }}>
              Cinematic landscapes captured through years of chasing golden light across mountains and valleys
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link 
                href="/gallery" 
                className="px-10 py-4 font-semibold text-sm tracking-wider uppercase rounded-full transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--accent)', 
                  color: 'var(--background)'
                }}
              >
                View Gallery
              </Link>
              <Link 
                href="/about" 
                className="px-10 py-4 text-sm tracking-wider uppercase rounded-full transition-all duration-300 border hover:border-transparent"
                style={{ 
                  borderColor: 'rgba(255,255,255,0.4)', 
                  color: '#ffffff'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--background)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
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

      {/* Stats - Responsive Grid */}
      <div className="border-y" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {[
            { num: '500+', label: 'Expeditions' },
            { num: '10+', label: 'Years' },
            { num: '12', label: 'Countries' },
            { num: '200+', label: 'Clients' },
          ].map((stat, i) => (
            <div key={i} 
              className={`py-8 px-4 text-center ${i < 3 ? 'border-r' : ''} ${i === 1 ? 'border-r-0 md:border-r' : ''}`}
              style={{ borderColor: 'var(--border)' }}>
              <div className="text-3xl md:text-4xl font-light mb-1"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', lineHeight: 1 }}>
                {stat.num}
              </div>
              <div className="text-[10px] tracking-[3px] uppercase"
                style={{ color: 'var(--muted)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Photos */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-6 mb-16">
            <p className="text-[11px] tracking-[4px] uppercase whitespace-nowrap"
              style={{ color: 'var(--accent)' }}>
              Featured Work
            </p>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo: any, index: number) => (
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
      </section>

      {/* Categories */}
      <section className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-6 mb-16">
            <p className="text-[11px] tracking-[4px] uppercase whitespace-nowrap"
              style={{ color: 'var(--accent)' }}>
              Categories
            </p>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat: any, index: number) => (
            <FadeIn key={cat._id} delay={index * 0.1}>
              <Link 
                href={`/gallery?category=${cat.slug.current}`}
                className="relative aspect-square overflow-hidden rounded-lg group block"
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
                <div className="absolute inset-0 flex items-end p-5"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }}>
                  <h3 className="text-lg font-light tracking-wide text-white">{cat.title}</h3>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}