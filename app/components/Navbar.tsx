"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Journal" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        style={{
          backgroundColor: scrolled
            ? isDark
              ? "rgba(8,12,11,0.95)"
              : "rgba(240,242,240,0.95)"
            : "transparent",
          backdropFilter: "blur(12px)",
          transition: "background-color 0.3s ease",
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 flex items-center justify-between">
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--accent)",
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "4px",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Affaa Clicks
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative"
                  style={{
                    fontSize: "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: active ? "var(--foreground)" : "var(--muted)",
                    fontWeight: 500,
                    transition: "color 0.3s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--foreground)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = active
                      ? "var(--foreground)"
                      : "var(--muted)")
                  }
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-[2px] transition-all duration-300 group-hover:w-full ${
                      active ? "w-full" : "w-0"
                    }`}
                    style={{ backgroundColor: "var(--accent)" }}
                  />
                </Link>
              );
            })}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                border: "0.5px solid var(--border)",
                color: "var(--accent)",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                border: "0.5px solid var(--border)",
                color: "var(--accent)",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setIsOpen(true)}
              style={{
                color: "var(--foreground)",
                cursor: "pointer",
                backgroundColor: "transparent",
              }}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px]"
          style={{
            width: `${progress}%`,
            backgroundColor: "var(--accent)",
            transition: "width 0.1s linear",
          }}
        />
      </nav>

      {/* Full-screen mobile menu */}
      <div
        className={`fixed inset-0 z-[60] md:hidden flex flex-col transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          backgroundColor: isDark ? "rgba(8,12,11,0.98)" : "rgba(240,242,240,0.98)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--accent)",
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Affaa Clicks
          </span>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              color: "var(--foreground)",
              cursor: "pointer",
              backgroundColor: "transparent",
            }}
            aria-label="Close menu"
          >
            <X size={26} />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          {links.map((link, i) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-all duration-500 ${
                  isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{
                  transitionDelay: isOpen ? `${150 + i * 70}ms` : "0ms",
                  fontFamily: "var(--font-display)",
                  fontSize: "30px",
                  fontWeight: 300,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: active ? "var(--accent)" : "var(--foreground)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="pb-10 text-center">
          <p
            className="text-[10px] tracking-[3px] uppercase"
            style={{ color: "var(--muted)" }}
          >
            #AffaaClicks
          </p>
        </div>
      </div>
    </>
  );
}