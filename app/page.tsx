import { client, urlFor } from "@/lib/sanity/client";
import { featuredPhotosQuery, allCategoriesQuery } from "@/lib/sanity/queries";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "./components/FadeIn";

export default async function Home() {
  const photos = await client.fetch(featuredPhotosQuery);
  const categories = await client.fetch(allCategoriesQuery);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      
      {/* Hero Section with Landscape Image */}
      <FadeIn>
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/Hero.jpeg"
              alt="Landscape"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a0a]" />
          </div>

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <p className="text-xs tracking-[5px] uppercase text-[#f59e0b] mb-8 font-medium">
              Nature & Landscape Photography
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-bold tracking-tight mb-8 leading-[0.95]">
              Where Light<br />
              Meets <em className="text-[#f59e0b] not-italic">Wild</em>
            </h1>
            <p className="text-base md:text-lg text-white/60 max-w-lg mx-auto mb-12 leading-relaxed font-light">
              Cinematic landscapes captured through years of chasing golden light across mountains and valleys
            </p>
            <div className="flex gap-5 justify-center flex-wrap">
              <Link 
                href="/gallery" 
                className="px-10 py-4 bg-[#f59e0b] text-black font-semibold text-sm tracking-wider uppercase rounded-full hover:bg-[#d97706] transition-all duration-300 hover:scale-105"
              >
                View Gallery
              </Link>
              <Link 
                href="/about" 
                className="px-10 py-4 border border-white/20 text-white text-sm tracking-wider uppercase rounded-full hover:bg-white/10 transition-all duration-300"
              >
                My Story
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-[#f59e0b] rounded-full" />
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Stats Bar */}
      <div className="border-y border-white/10 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {[
            { num: '500+', label: 'Expeditions' },
            { num: '7+', label: 'Years' },
            { num: '12', label: 'Countries' },
            { num: '200+', label: 'Clients' },
          ].map((stat, i) => (
            <div key={i} className={`py-8 text-center ${i < 3 ? 'border-r border-white/10' : ''}`}>
              <div className="text-3xl md:text-4xl font-light text-[#f59e0b] mb-1">{stat.num}</div>
              <div className="text-[10px] tracking-[3px] uppercase text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Photos */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-6 mb-16">
            <p className="text-[11px] tracking-[4px] uppercase text-[#f59e0b] whitespace-nowrap">
              Featured Work
            </p>
            <div className="flex-1 h-px bg-white/10" />
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <p className="text-[10px] tracking-[3px] uppercase text-[#f59e0b] mb-2">
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
            <p className="text-[11px] tracking-[4px] uppercase text-[#f59e0b] whitespace-nowrap">
              Categories
            </p>
            <div className="flex-1 h-px bg-white/10" />
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
                  <div className="absolute inset-0 bg-white/5" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
                  <h3 className="text-lg font-light tracking-wide">{cat.title}</h3>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

    </div>
  );
}