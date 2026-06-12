"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

  return (
    <nav
      style={{
        backgroundColor: isDark ? "rgba(8,12,11,0.9)" : "rgba(240,242,240,0.9)",
        borderBottom: `0.5px solid var(--border)`,
        backdropFilter: "blur(12px)",
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--accent)',
            fontSize: '20px',
            fontWeight: 300,
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}
        >
          Affaa Clicks
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                fontWeight: 400,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            style={{
              width: '32px', height: '32px', borderRadius: '50%',
              border: '0.5px solid var(--border)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent)', backgroundColor: 'transparent',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            style={{
              width: '32px', height: '32px', borderRadius: '50%',
              border: '0.5px solid var(--border)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent)', backgroundColor: 'transparent', cursor: 'pointer',
            }}
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{ color: 'var(--foreground)', cursor: 'pointer', backgroundColor: 'transparent' }}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          style={{
            backgroundColor: 'var(--background)',
            borderTop: '0.5px solid var(--border)',
          }}
          className="md:hidden px-8 py-6 space-y-5"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                display: 'block', fontSize: '11px',
                letterSpacing: '2px', textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}