"use client";

import { useState } from "react";
import { urlFor } from "@/lib/sanity/client";
import Lightbox from "./Lightbox";

export default function GalleryGrid({ photos, categories }: { photos: any[], categories: any[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = activeCategory
    ? photos.filter((p) => p.category?.slug?.current === activeCategory)
    : photos;

  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  const nextPhoto = () => setLightboxIndex((i) => (i !== null && i < filteredPhotos.length - 1 ? i + 1 : i));

  return (
    <>
      {/* Category Filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '40px' }}>
        <button
          onClick={() => setActiveCategory(null)}
          style={{
            padding: '8px 20px', fontSize: '10px', letterSpacing: '2px',
            textTransform: 'uppercase', borderRadius: '2px', transition: 'all 0.2s',
            backgroundColor: !activeCategory ? 'var(--accent)' : 'transparent',
            color: !activeCategory ? 'var(--background)' : 'var(--accent)',
            border: '0.5px solid var(--border)', cursor: 'pointer',
            fontFamily: 'var(--font-body)',
          }}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setActiveCategory(cat.slug.current)}
            style={{
              padding: '8px 20px', fontSize: '10px', letterSpacing: '2px',
              textTransform: 'uppercase', borderRadius: '2px', transition: 'all 0.2s',
              backgroundColor: activeCategory === cat.slug.current ? 'var(--accent)' : 'transparent',
              color: activeCategory === cat.slug.current ? 'var(--background)' : 'var(--accent)',
              border: '0.5px solid var(--border)', cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Photos Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '4px',
      }}>
        {filteredPhotos.map((photo, index) => (
          <div
            key={photo._id}
            style={{ aspectRatio: '4/3', borderRadius: '2px', overflow: 'hidden', cursor: 'zoom-in', position: 'relative' }}
            onClick={() => setLightboxIndex(index)}
          >
            <img
              src={urlFor(photo.image).url()}
              alt={photo.title}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                transition: 'transform 0.7s ease', display: 'block'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            {/* Hover overlay */}
            <div
              style={{
                position: 'absolute', inset: 0, opacity: 0,
                background: 'linear-gradient(to top, rgba(8,12,11,0.8) 0%, transparent 60%)',
                transition: 'opacity 0.3s', display: 'flex', alignItems: 'flex-end', padding: '12px'
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0'}
            >
              <div>
                {photo.category && (
                  <p style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '2px' }}>
                    {photo.category.title}
                  </p>
                )}
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 300, color: '#e8ede8' }}>
                  {photo.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPhotos.length === 0 && (
        <div style={{ textAlign: 'center', padding: '96px 0' }}>
          <p style={{ color: 'var(--muted)', letterSpacing: '2px', fontSize: '12px', textTransform: 'uppercase' }}>
            No photos yet in this category
          </p>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <Lightbox
          src={urlFor(filteredPhotos[lightboxIndex].image).url()}
          alt={filteredPhotos[lightboxIndex].title}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < filteredPhotos.length - 1}
        />
      )}
    </>
  );
}