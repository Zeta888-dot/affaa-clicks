"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { urlFor } from "@/lib/sanity/client";

interface LightboxProps {
  photos: any[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({ photos, initialIndex, isOpen, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
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
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, goNext, goPrev]);

  const downloadWithWatermark = async () => {
    if (!photos[currentIndex]) return;
    setDownloading(true);
    try {
      const imgUrl = urlFor(photos[currentIndex].image).width(2000).url();
      
      // Fetch image as blob (bypass CORS via proxy pattern)
      const response = await fetch(`/api/download-image?url=${encodeURIComponent(imgUrl)}`);
      const blob = await response.blob();
      const imageBitmap = await createImageBitmap(blob);

      const canvas = document.createElement("canvas");
      canvas.width = imageBitmap.width;
      canvas.height = imageBitmap.height;
      const ctx = canvas.getContext("2d")!;

      // Draw original image
      ctx.drawImage(imageBitmap, 0, 0);

      // Watermark settings
      const fontSize = Math.max(canvas.width * 0.025, 20);
      ctx.font = `${fontSize}px Georgia, serif`;
      ctx.textAlign = "right";
      ctx.textBaseline = "bottom";

      // Shadow for readability
      ctx.shadowColor = "rgba(0,0,0,0.6)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      // White watermark text
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      const padding = canvas.width * 0.02;
      ctx.fillText("© Affaa Clicks", canvas.width - padding, canvas.height - padding);

      // Download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `affaa-clicks-${photos[currentIndex].title?.replace(/\s+/g, "-").toLowerCase() || "photo"}.jpg`;
        a.click();
        URL.revokeObjectURL(url);
      }, "image/jpeg", 0.92);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  if (!isOpen || !photos[currentIndex]) return null;
  const currentPhoto = photos[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
    >
      {/* Top bar: Close + Download */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)" }}>
        
        {/* Download Button */}
        <button
          onClick={downloadWithWatermark}
          disabled={downloading}
          className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white transition-all"
          style={{
            border: "0.5px solid rgba(255,255,255,0.3)",
            borderRadius: "4px",
            fontSize: "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            backgroundColor: downloading ? "rgba(255,255,255,0.1)" : "transparent",
            cursor: downloading ? "wait" : "pointer",
          }}
        >
          <Download size={14} />
          {downloading ? "Processing..." : "Download"}
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-2 text-white/80 hover:text-white transition-colors"
        >
          <X size={32} />
        </button>
      </div>

      {/* Prev */}
      <button
        onClick={goPrev}
        className="absolute left-4 md:left-8 z-50 p-2 text-white/60 hover:text-white transition-colors"
      >
        <ChevronLeft size={48} />
      </button>

      {/* Next */}
      <button
        onClick={goNext}
        className="absolute right-4 md:right-8 z-50 p-2 text-white/60 hover:text-white transition-colors"
      >
        <ChevronRight size={48} />
      </button>

      {/* Image */}
      <div className="relative w-full h-full max-w-5xl max-h-[85vh] mx-4 mt-16">
        <Image
          src={urlFor(currentPhoto.image).url()}
          alt={currentPhoto.title}
          fill
          className="object-contain"
          priority
        />
        {/* Caption */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6 text-center"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent)" }}
        >
          <p className="text-[10px] tracking-[3px] uppercase mb-2"
            style={{ color: "var(--accent)" }}>
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