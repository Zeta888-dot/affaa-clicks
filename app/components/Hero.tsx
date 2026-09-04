"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroData {
  eyebrow?: string;
  titleLine1?: string;
  titleLine2?: string;
  titleAccent?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  desktopImage?: string;
  mobileImage?: string;
}

export default function Hero({ data }: { data?: HeroData }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const hero = {
    eyebrow: data?.eyebrow || "Nature & Landscape Photography",
    line1: data?.titleLine1 || "Where Light",
    line2: data?.titleLine2 || "Meets",
    accent: data?.titleAccent || "Wild",
    subtitle:
      data?.subtitle ||
      "Cinematic landscapes captured through years of chasing golden light across mountains and valleys",
    primaryText: data?.primaryButtonText || "View Gallery",
    primaryLink: data?.primaryButtonLink || "/gallery",
    secondaryText: data?.secondaryButtonText || "My Story",
    secondaryLink: data?.secondaryButtonLink || "/about",
    desktopImage: data?.desktopImage || null,
    mobileImage: data?.mobileImage || null,
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Ken Burns */}
      <div className="absolute inset-0 z-0">
        {/* Desktop image */}
        <div className="absolute inset-0 hidden md:block">
          <Image
            src={hero.desktopImage || "/Hero.jpeg"}
            alt="Landscape"
            fill
            sizes="100vw"
            className={`object-cover transition-transform duration-[3s] ${
              loaded ? "scale-105" : "scale-110"
            }`}
            priority
          />
        </div>
        {/* Mobile image */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src={hero.mobileImage || hero.desktopImage || "/Hero.jpeg"}
            alt="Landscape"
            fill
            sizes="100vw"
            className={`object-cover transition-transform duration-[3s] ${
              loaded ? "scale-105" : "scale-110"
            }`}
            priority
          />
        </div>
        {/* Black gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 30%),
              linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)
            `,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p
          className={`text-xs tracking-[6px] uppercase mb-8 font-medium transition-all duration-1000 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            color: "var(--accent)",
            textShadow: "0 1px 12px rgba(0,0,0,0.5)",
          }}
        >
          {hero.eyebrow}
        </p>

        <h1
          className={`mb-8 leading-[0.9] transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(56px, 12vw, 110px)",
            fontWeight: 300,
            color: "#ffffff",
            textShadow: "0 2px 40px rgba(0,0,0,0.3)",
          }}
        >
          {hero.line1}
          <br />
          {hero.line2}{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
            {hero.accent}
          </em>
        </h1>

        <p
          className={`mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.9)",
            maxWidth: "520px",
            fontWeight: 300,
            textShadow: "0 1px 10px rgba(0,0,0,0.55)",
          }}
        >
          {hero.subtitle}
        </p>

        <div
          className={`flex gap-4 justify-center flex-wrap transition-all duration-1000 delay-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            href={hero.primaryLink}
            className="px-12 py-4 font-semibold text-sm tracking-[3px] uppercase rounded-full transition-all duration-300"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--background)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(245, 166, 35, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {hero.primaryText}
          </Link>
          <Link
            href={hero.secondaryLink}
            className="px-12 py-4 text-sm tracking-[3px] uppercase rounded-full transition-all duration-300"
            style={{
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--accent)";
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--background)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {hero.secondaryText}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-[1200ms] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <p
            className="text-[10px] tracking-[4px] uppercase"
            style={{
              color: "rgba(255,255,255,0.7)",
              textShadow: "0 1px 8px rgba(0,0,0,0.6)",
            }}
          >
            Scroll
          </p>
          <div className="w-px h-16 relative overflow-hidden">
            <div
              className="absolute inset-0 w-full animate-scrollLine"
              style={{
                background:
                  "linear-gradient(to bottom, var(--accent), transparent)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}