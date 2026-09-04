"use client";

import { useState, useEffect } from "react";
import { client, urlFor } from "@/lib/sanity/client";
import {
  featuredPhotosQuery,
  allCategoriesQuery,
  heroSettingsQuery,
} from "@/lib/sanity/queries";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "./components/FadeIn";
import Lightbox from "./components/Lightbox";
import Hero from "./components/Hero";

export default function Home() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [heroData, setHeroData] = useState<any>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [photosData, categoriesData, heroSettings] = await Promise.all([
          client.fetch(featuredPhotosQuery),
          client.fetch(allCategoriesQuery),
          client.fetch(heroSettingsQuery),
        ]);
        setPhotos(photosData || []);
        setCategories(categoriesData || []);
        setHeroData(heroSettings || null);
      } catch (err) {
        console.error("Sanity fetch error:", err);
      }
    };
    fetchData();
  }, []);

  const openLightbox = (index: number) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <Hero data={heroData} />

      {/* Stats */}
      <FadeIn>
        <div className="border-y" style={{ borderColor: "var(--border)" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "500+", label: "Expeditions" },
              { num: "10+", label: "Years" },
              { num: "12", label: "Countries" },
              { num: "200+", label: "Clients" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p
                  className="text-4xl md:text-5xl font-light mb-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--accent)",
                  }}
                >
                  {stat.num}
                </p>
                <p
                  className="text-[11px] tracking-[3px] uppercase"
                  style={{ color: "var(--muted)" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Featured Photos */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-6 mb-16">
            <p
              className="text-[11px] tracking-[4px] uppercase whitespace-nowrap"
              style={{ color: "var(--accent)" }}
            >
              Featured Work
            </p>
            <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo: any, index: number) => (
            <FadeIn key={photo._id} delay={Math.min(index * 0.1, 0.6)}>
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={urlFor(photo.image).url()}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                  }}
                >
                  <p
                    className="text-[10px] tracking-[4px] uppercase mb-2"
                    style={{ color: "var(--accent)" }}
                  >
                    {photo.category?.title}
                  </p>
                  <h3
                    className="text-2xl font-light text-white mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {photo.title}
                  </h3>
                  <p className="text-xs text-white/70" style={{ maxWidth: "200px" }}>
                    {photo.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Categories: swipeable on mobile */}
      <section className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-6 mb-8">
            <p
              className="text-[11px] tracking-[4px] uppercase whitespace-nowrap"
              style={{ color: "var(--accent)" }}
            >
              Categories
            </p>
            <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
          </div>
          <p
            className="md:hidden text-[10px] tracking-[2px] uppercase mb-6"
            style={{ color: "var(--muted)" }}
          >
            Swipe to explore
          </p>
        </FadeIn>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:pb-0">
          {categories.map((cat: any, i: number) => (
            <div
              key={cat._id}
              className="min-w-[75vw] sm:min-w-[45vw] md:min-w-0 snap-center"
            >
              <FadeIn delay={i * 0.1}>
                <Link href={`/gallery?category=${cat.slug?.current}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                    <Image
                      src={urlFor(cat.coverImage).url()}
                      alt={cat.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
                      }}
                    />
                    <div className="absolute inset-0 flex items-end p-6">
                      <h3
                        className="text-xl font-light text-white"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {cat.title}
                      </h3>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: "var(--accent)",
                          color: "var(--background)",
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox for featured photos */}
      <Lightbox
        photos={photos}
        initialIndex={currentPhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}