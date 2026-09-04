"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { client, urlFor } from "@/lib/sanity/client";
import { allPhotosQuery, allCategoriesQuery } from "@/lib/sanity/queries";
import Image from "next/image";
import { Camera } from "lucide-react";
import FadeIn from "../components/FadeIn";
import Lightbox from "../components/Lightbox";
import { useTheme } from "../components/ThemeProvider";

function GalleryContent() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get("category");

  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, top: 0, width: 0 });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const photosData = await client.fetch(allPhotosQuery);
        const categoriesData = await client.fetch(allCategoriesQuery);
        setPhotos(photosData || []);
        setCategories(categoriesData || []);
      } catch (err) {
        console.error("Sanity fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredPhotos = activeCategory
    ? photos.filter((p) => p.category?.slug?.current === activeCategory)
    : photos;

  const countFor = (slug: string) =>
    photos.filter((p) => p.category?.slug?.current === slug).length;

  const activeIndex = !activeCategory
    ? 0
    : categories.findIndex((c: any) => c.slug.current === activeCategory) + 1;

  useEffect(() => {
    const update = () => {
      const el = tabsRef.current[activeIndex];
      if (el) {
        setIndicator({
          left: el.offsetLeft,
          top: el.offsetTop + el.offsetHeight,
          width: el.offsetWidth,
        });
        el.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    };
    update();
    const t = setTimeout(update, 300);
    window.addEventListener("resize", update);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", update);
    };
  }, [activeIndex, categories]);

  const openLightbox = (index: number) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="px-6 md:px-12 pt-32 max-w-7xl mx-auto">
        <FadeIn>
          <p
            className="text-[11px] tracking-[4px] uppercase text-center mb-4"
            style={{ color: "var(--accent)" }}
          >
            Portfolio
          </p>
          <h1
            className="text-5xl md:text-7xl font-light text-center mb-16"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Gallery
          </h1>
        </FadeIn>
      </div>

      {/* Sticky Filter Bar, single scrollable row */}
      <div
        className="sticky top-[72px] z-40 pt-5 pb-4 mb-10"
        style={{
          backgroundColor: isDark ? "rgba(8,12,11,0.9)" : "rgba(255,255,255,0.9)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="overflow-x-auto scrollbar-hide">
          <div className="relative flex w-max gap-10 px-6 md:px-12 mx-auto">
            <button
              ref={(el) => {
                tabsRef.current[0] = el;
              }}
              onClick={() => router.push("/gallery")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
                fontSize: "12px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                color: !activeCategory ? "var(--foreground)" : "var(--muted)",
                transition: "color 0.3s",
              }}
            >
              All
              <span className="ml-1.5 text-[9px]" style={{ color: "var(--accent)" }}>
                {photos.length}
              </span>
            </button>

            {categories.map((cat: any, i: number) => (
              <button
                key={cat._id}
                ref={(el) => {
                  tabsRef.current[i + 1] = el;
                }}
                onClick={() => router.push(`/gallery?category=${cat.slug.current}`)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 0",
                  fontSize: "12px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
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
        </div>

        {/* Results meta */}
        <div className="flex items-center justify-center gap-4 mt-5">
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

      <div className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        {/* Loading state */}
        {loading && (
          <div className="text-center py-24">
            <p
              className="text-xs tracking-[2px] uppercase"
              style={{ color: "var(--muted)" }}
            >
              Loading...
            </p>
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredPhotos.length === 0 && (
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

        {/* Photos Grid */}
        {!loading && filteredPhotos.length > 0 && (
          <div
            key={activeCategory ?? "all"}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filteredPhotos.map((photo: any, index: number) => (
              <FadeIn key={photo._id} delay={Math.min(index * 0.05, 0.6)}>
                <div
                  className="relative aspect-[4/3] overflow-hidden group cursor-zoom-in"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={urlFor(photo.image).url()}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
        )}
      </div>

      <Lightbox
        photos={filteredPhotos}
        initialIndex={currentPhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p
            className="text-xs tracking-[2px] uppercase"
            style={{ color: "var(--muted)" }}
          >
            Loading...
          </p>
        </div>
      }
    >
      <GalleryContent />
    </Suspense>
  );
}