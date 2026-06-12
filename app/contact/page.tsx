"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '14px 16px', borderRadius: '2px',
    border: '0.5px solid var(--border)', backgroundColor: 'transparent',
    color: 'var(--foreground)', fontSize: '14px', outline: 'none',
    fontFamily: 'var(--font-body)', transition: 'border-color 0.2s',
  };

  return (
    <div className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-6xl mx-auto px-8 py-24">

        <div className="text-center mb-20">
          <p style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>
            Let's Connect
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 8vw, 80px)', fontWeight: 300, lineHeight: 1.05 }}>
            Get in Touch
          </h1>
          <p style={{ color: 'var(--muted)', marginTop: '16px', fontSize: '14px', letterSpacing: '1px' }}>
            Have a project in mind? Let's create something beautiful together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-20">
          <div style={{ paddingTop: '8px' }}>
            <div style={{ borderTop: '0.5px solid var(--border)', paddingTop: '40px' }}>

              {/* Email */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '36px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '2px', border: '0.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--accent)' }}>
                  <Mail size={18} />
                </div>
                <div>
                  <p style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '6px' }}>Email</p>
                  <a href="mailto:northfacepk@gmail.com" style={{ color: 'var(--muted)', fontSize: '15px' }}>
                    northfacepk@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '36px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '2px', border: '0.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--accent)' }}>
                  <Phone size={18} />
                </div>
                <div>
                  <p style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '6px' }}>Phone / WhatsApp</p>
                  <a href="tel:+923456331153" style={{ color: 'var(--muted)', fontSize: '15px', display: 'block' }}>+92 345 6331153</a>
                  <a href="tel:+923229046458" style={{ color: 'var(--muted)', fontSize: '15px', display: 'block', marginTop: '4px' }}>+92 322 9046458</a>
                </div>
              </div>

              {/* Location */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '36px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '2px', border: '0.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--accent)' }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <p style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '6px' }}>Location</p>
                  <a href="https://maps.app.goo.gl/aFZbM7Kpe6PhbzrJ8" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)', fontSize: '15px' }}>
                    Chitral, Pakistan
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div style={{ borderTop: '0.5px solid var(--border)', paddingTop: '32px' }}>
                <p style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px' }}>
                  Follow Along
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { label: 'Instagram', handle: '@affaaclicks', url: 'https://www.instagram.com/affaaclicks', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                    { label: 'Facebook', handle: 'affaa.clicks', url: 'https://www.facebook.com/affaa.clicks', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                    { label: 'TikTok', handle: '@affaa.clicks', url: 'https://www.tiktok.com/@affaa.clicks', icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
                  ].map((s) => (
                    <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                    >
                      <div style={{ width: '36px', height: '36px', borderRadius: '2px', border: '0.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d={s.icon} />
                        </svg>
                      </div>
                      <div>
                        <p style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '2px' }}>{s.label}</p>
                        <p style={{ fontSize: '13px' }}>{s.handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: '10px' }}>Name</label>
              <input type="text" required value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={inputStyle} placeholder="Your name"
                onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'} />
            </div>
            <div>
              <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: '10px' }}>Email</label>
              <input type="email" required value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={inputStyle} placeholder="your@email.com"
                onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'} />
            </div>
            <div>
              <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: '10px' }}>Message</label>
              <textarea required rows={6} value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{ ...inputStyle, resize: 'none' }} placeholder="Tell me about your project..."
                onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'} />
            </div>

            {error && <p style={{ color: '#e24b4a', fontSize: '13px' }}>{error}</p>}

            <button type="submit" disabled={loading || submitted} style={{
              padding: '14px 36px',
              backgroundColor: submitted ? 'var(--muted)' : 'var(--accent)',
              color: 'var(--background)', fontSize: '11px', letterSpacing: '2px',
              textTransform: 'uppercase', fontWeight: 500, borderRadius: '2px',
              cursor: loading ? 'wait' : 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center', gap: '10px',
              border: 'none', fontFamily: 'var(--font-body)', transition: 'all 0.3s',
              opacity: loading ? 0.7 : 1,
            }}>
              <Send size={14} />
              {loading ? "Sending..." : submitted ? "Message Sent! ✓" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}