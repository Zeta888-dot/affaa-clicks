"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const TikTokIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.93a8.16 8.16 0 0 0 4.77 1.52V7a4.85 4.85 0 0 1-1.84-.31z"/></svg>
);

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  { icon: InstagramIcon, href: "https://www.instagram.com/affaaclicks", label: "Instagram" },
  { icon: FacebookIcon, href: "https://www.facebook.com/affaa.clicks", label: "Facebook" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@affaa.clicks", label: "TikTok" },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--background)",
        borderTop: "0.5px solid var(--border)",
      }}
    >
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 text-center">
        <p
          className="text-[11px] tracking-[4px] uppercase mb-4"
          style={{ color: "var(--accent)" }}
        >
          Available for commissions
        </p>
        <h2
          className="mb-8"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 300,
          }}
        >
          Let's create something{" "}
          <em style={{ color: "var(--accent)" }}>timeless</em>
        </h2>
        <Link
          href="/contact"
          className="inline-block px-10 py-4 rounded-full text-sm tracking-[3px] uppercase font-semibold transition-all duration-300 hover:-translate-y-0.5"
          style={{ backgroundColor: "var(--accent)", color: "var(--background)" }}
        >
          Book a Session
        </Link>
      </div>

      {/* Main Footer */}
      <div className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--accent)",
                fontSize: "20px",
                fontWeight: 600,
                letterSpacing: "4px",
                textTransform: "uppercase",
              }}
            >
              Affaa Clicks
            </Link>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: "var(--muted)", maxWidth: "320px" }}
            >
              Nature & landscape photography from the mountains of Chitral,
              chasing light one frame at a time.
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                  style={{
                    border: "0.5px solid var(--border)",
                    color: "var(--muted)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--accent)";
                    e.currentTarget.style.borderColor = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--muted)";
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                >
                  <s.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <p
              className="text-[11px] tracking-[3px] uppercase mb-6"
              style={{ color: "var(--accent)" }}
            >
              Explore
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "var(--muted)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--foreground)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--muted)")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              className="text-[11px] tracking-[3px] uppercase mb-6"
              style={{ color: "var(--accent)" }}
            >
              Contact
            </p>
            <ul className="space-y-4 text-sm" style={{ color: "var(--muted)" }}>
              <li className="flex items-center gap-3">
                <Mail size={14} style={{ color: "var(--accent)" }} />
                <a
                  href="mailto:northfacepk@gmail.com"
                  className="transition-colors duration-200"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--foreground)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--muted)")
                  }
                >
                  northfacepk@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} style={{ color: "var(--accent)" }} />
                <a
                  href="https://wa.me/923456331153"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--foreground)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--muted)")
                  }
                >
                  +92 345 6331153
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} style={{ color: "var(--accent)" }} />
                <a
                  href="https://wa.me/923229046458"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--foreground)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--muted)")
                  }
                >
                  +92 322 9046458
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={14} style={{ color: "var(--accent)" }} />
                <a
                  href="https://maps.app.goo.gl/aFZbM7Kpe6PhbzrJ8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--foreground)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--muted)")
                  }
                >
                  Chitral, Pakistan
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            © {new Date().getFullYear()} Affaa Clicks. All rights reserved.
          </p>
          <p
            className="text-[10px] tracking-[3px] uppercase"
            style={{ color: "var(--muted)" }}
          >
            #AffaaClicks
          </p>
        </div>
      </div>
    </footer>
  );
}