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

export default function Lightbox({
  photos,
  initialIndex,
  isOpen,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [downloading, setDownloading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
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
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, goNext, goPrev]);

  const downloadWithWatermark = async () => {
    if (!photos[currentIndex]) return;
    setDownloading(true);
    try {
      const imgUrl = urlFor(photos[currentIndex].image).width(2000).url();
      const proxyUrl = `/api/download-image?url=${encodeURIComponent(imgUrl)}`;
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Image load failed"));
        img.src = proxyUrl;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);

      const fontSize = Math.max(canvas.width * 0.025, 20);
      ctx.font = `${fontSize}px Georgia, serif`;
      ctx.textAlign = "right";
      ctx.textBaseline = "bottom";
      ctx.shadowColor = "rgba(0,0,0,0.6)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      const padding = canvas.width * 0.02;
      ctx.fillText("© Affaa Clicks", canvas.width - padding, canvas.height - padding);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `affaa-clicks-${
          photos[currentIndex].title?.replace(/\s+/g, "-").toLowerCase() || "photo"
        }.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, "image/jpeg", 0.92);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed, please try again.");
    } finally {
      setDownloading(false);
    }
  };

  if (!isOpen || !photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundColor: "rgba(0,0,0,0.96)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Counter */}
        <div
          className="px-4 py-2 rounded-full text-xs tracking-[2px]"
          style={{
            border: "0.5px solid rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.7)",
            backgroundColor: "rgba(255,255,255,0.05)",
          }}
        >
          {currentIndex + 1} / {photos.length}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={downloadWithWatermark}
            disabled={downloading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300"
            style={{
              border: "0.5px solid rgba(255,255,255,0.3)",
              fontSize: "11px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "white",
              backgroundColor: "rgba(255,255,255,0.05)",
              cursor: downloading ? "wait" : "pointer",
              opacity: downloading ? 0.6 : 1,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")}
          >
            <Download size={14} />
            {downloading ? "Processing..." : "Download"}
          </button>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:rotate-90"
            style={{ border: "0.5px solid rgba(255,255,255,0.2)" }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        className="absolute left-4 md:left-8 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 hover:scale-110"
        style={{
          border: "0.5px solid rgba(255,255,255,0.2)",
          backgroundColor: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(8px)",
        }}
        aria-label="Previous"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        className="absolute right-4 md:right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 hover:scale-110"
        style={{
          border: "0.5px solid rgba(255,255,255,0.2)",
          backgroundColor: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(8px)",
        }}
        aria-label="Next"
      >
        <ChevronRight size={22} />
      </button>

      {/* Image */}
      <div
        key={currentPhoto._id}
        className="relative w-full h-full max-w-5xl max-h-[85vh] mx-4 animate-lightboxZoom"
        onClick={(e) => e.stopPropagation()}
      >
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
          <p
            className="text-[10px] tracking-[3px] uppercase mb-2"
            style={{ color: "var(--accent)" }}
          >
            {currentPhoto.category?.title}
          </p>
          <h3
            className="text-2xl font-light text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {currentPhoto.title}
          </h3>
        </div>
      </div>
    </div>
  );
}