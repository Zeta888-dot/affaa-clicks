"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/lib/sanity/client";

interface LightboxProps {
  photos: any[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({ photos, initialIndex, isOpen, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, goNext, goPrev]);

  if (!isOpen || !photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}>
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2 text-white/80 hover:text-white transition-colors"
      >
        <X size={32} />
      </button>

      {/* Prev Button */}
      <button
        onClick={goPrev}
        className="absolute left-4 md:left-8 z-50 p-2 text-white/60 hover:text-white transition-colors"
      >
        <ChevronLeft size={48} />
      </button>

      {/* Next Button */}
      <button
        onClick={goNext}
        className="absolute right-4 md:right-8 z-50 p-2 text-white/60 hover:text-white transition-colors"
      >
        <ChevronRight size={48} />
      </button>

      {/* Image */}
      <div className="relative w-full h-full max-w-5xl max-h-[85vh] mx-4">
        <Image
          src={urlFor(currentPhoto.image).url()}
          alt={currentPhoto.title}
          fill
          className="object-contain"
          priority
        />
        
        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-center"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent)' }}>
          <p className="text-[10px] tracking-[3px] uppercase mb-2"
            style={{ color: 'var(--accent)' }}>
            {currentPhoto.category?.title}
          </p>
          <h3 className="text-2xl font-light text-white">{currentPhoto.title}</h3>
          <p className="text-sm text-white/60 mt-2">
            {currentIndex + 1} / {photos.length}
          </p>
        </div>
      </div>
    </div>
  );
}