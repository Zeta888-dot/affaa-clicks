"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { urlFor } from "@/lib/sanity/client";
import Lightbox from "./Lightbox";
import FadeIn from "./FadeIn";
import { useTheme } from "./ThemeProvider";

export default function GalleryGrid({
  photos,
  categories,
}: {
  photos: any[];
  categories: any[];
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, top: 0, width: 0 });

  const filteredPhotos = activeCategory
    ? photos.filter((p) => p.category?.slug?.current === activeCategory)
    : photos;

  const countFor = (slug: string) =>
    photos.filter((p) => p.category?.slug?.current === slug).length;

  const activeIndex =
    activeCategory === null
      ? 0
      : categories.findIndex((c) => c.slug.current === activeCategory) + 1;

  useEffect(() => {
    const update = () => {
      const el = tabsRef.current[activeIndex];
      if (el)
        setIndicator({
          left: el.offsetLeft,
          top: el.offsetTop + el.offsetHeight,
          width: el.offsetWidth,
        });
    };
    update();
    const t = setTimeout(update, 300);
    window.addEventListener("resize", update);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", update);
    };
  }, [activeIndex, categories]);

  return (
    <>
      {/* Sticky Filter Bar — underline tabs */}
      <div
        className="sticky top-[72px] z-40 pt-6 pb-4 mb-10"
        style={{
          backgroundColor: isDark
            ? "rgba(8,12,11,0.85)"
            : "rgba(255,255,255,0.9)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="relative flex flex-wrap justify-center gap-x-10 gap-y-4 px-6">
          <button
            ref={(el) => {
              tabsRef.current[0] = el;
            }}
            onClick={() => setActiveCategory(null)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 0",
              fontSize: "12px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: !activeCategory ? "var(--foreground)" : "var(--muted)",
              transition: "color 0.3s",
            }}
          >
            All
            <span className="ml-1.5 text-[9px]" style={{ color: "var(--accent)" }}>
              {photos.length}
            </span>
          </button>

          {categories.map((cat, i) => (
            <button
              key={cat._id}
              ref={(el) => {
                tabsRef.current[i + 1] = el;
              }}
              onClick={() => setActiveCategory(cat.slug.current)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
                fontSize: "12px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color:
                  activeCategory === cat.slug.current
                    ? "var(--foreground)"
                    : "var(--muted)",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--foreground)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  activeCategory === cat.slug.current
                    ? "var(--foreground)"
                    : "var(--muted)")
              }
            >
              {cat.title}
              <span className="ml-1.5 text-[9px]" style={{ color: "var(--accent)" }}>
                {countFor(cat.slug.current)}
              </span>
            </button>
          ))}

          {/* Sliding underline */}
          <span
            className="absolute h-[2px] transition-all duration-500"
            style={{
              left: indicator.left,
              top: indicator.top,
              width: indicator.width,
              backgroundColor: "var(--accent)",
            }}
          />
        </div>

        {/* Results meta */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="h-px w-10" style={{ backgroundColor: "var(--border)" }} />
          <p
            className="text-[10px] tracking-[3px] uppercase"
            style={{ color: "var(--muted)" }}
          >
            {filteredPhotos.length} photograph
            {filteredPhotos.length !== 1 ? "s" : ""}
          </p>
          <div className="h-px w-10" style={{ backgroundColor: "var(--border)" }} />
        </div>
      </div>

      {/* Photos Grid */}
      <div
        key={activeCategory ?? "all"}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {filteredPhotos.map((photo, index) => (
          <FadeIn key={photo._id} delay={Math.min(index * 0.05, 0.6)}>
            <div
             className="relative aspect-[4/3] overflow-hidden group cursor-zoom-in"
              onClick={() => setLightboxIndex(index)}
            >
              <Image
                src={urlFor(photo.image).url()}
                alt={photo.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                }}
              >
                {photo.category && (
                  <p
                    className="text-[9px] tracking-[3px] uppercase mb-2"
                    style={{ color: "var(--accent)" }}
                  >
                    {photo.category.title}
                  </p>
                )}
                <h3
                  className="text-lg font-light text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {photo.title}
                </h3>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Empty State */}
      {filteredPhotos.length === 0 && (
        <div className="text-center py-24 flex flex-col items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ border: "0.5px solid var(--border)" }}
          >
            <Camera size={20} style={{ color: "var(--muted)" }} />
          </div>
          <p
            className="text-xs tracking-[3px] uppercase"
            style={{ color: "var(--muted)" }}
          >
            No photographs in this category yet
          </p>
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        photos={filteredPhotos}
        initialIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
      />
    </>
  );
}