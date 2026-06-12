"use client";

import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export default function Lightbox({ src, alt, onClose, onPrev, onNext, hasPrev, hasNext }: LightboxProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "auto";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.95)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '20px', right: '20px',
          width: '40px', height: '40px', borderRadius: '2px',
          border: '0.5px solid rgba(255,255,255,0.2)',
          backgroundColor: 'transparent', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 10,
        }}
      >
        <X size={18} />
      </button>

      {/* Prev */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
          style={{
            position: 'absolute', left: '20px',
            width: '44px', height: '44px', borderRadius: '2px',
            border: '0.5px solid rgba(255,255,255,0.2)',
            backgroundColor: 'transparent', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 10,
          }}
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Image */}
      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '90vh', position: 'relative' }}>
        <img
          src={src}
          alt={alt}
          style={{
            maxWidth: '90vw', maxHeight: '85vh',
            objectFit: 'contain', borderRadius: '2px',
            display: 'block',
          }}
        />
        {/* Caption */}
        <p style={{
          textAlign: 'center', marginTop: '12px',
          fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
        }}>
          {alt} — <span style={{ color: 'var(--accent)' }}>#AffaaClicks</span>
        </p>
      </div>

      {/* Next */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext?.(); }}
          style={{
            position: 'absolute', right: '20px',
            width: '44px', height: '44px', borderRadius: '2px',
            border: '0.5px solid rgba(255,255,255,0.2)',
            backgroundColor: 'transparent', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 10,
          }}
        >
          <ChevronRight size={22} />
        </button>
      )}
    </div>
  );
}