"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import FadeIn from "../components/FadeIn";

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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
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
    width: "100%",
    padding: "16px 18px",
    borderRadius: "8px",
    border: "0.5px solid var(--border)",
    backgroundColor: "transparent",
    color: "var(--foreground)",
    fontSize: "14px",
    outline: "none",
    fontFamily: "var(--font-body)",
    transition: "all 0.3s",
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <FadeIn>
          <div className="text-center mb-20">
            <p
              className="text-[11px] tracking-[4px] uppercase mb-4"
              style={{ color: "var(--accent)" }}
            >
              Let's Connect
            </p>
            <h1
              className="leading-[1.05]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(42px, 8vw, 80px)",
                fontWeight: 300,
              }}
            >
              Get in{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Touch</em>
            </h1>
            <p
              className="mt-6 text-sm tracking-[1px] max-w-xl mx-auto"
              style={{ color: "var(--muted)" }}
            >
              Have a project in mind? Let's create something beautiful together.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info */}
          <FadeIn>
            <div className="pt-4">
              <div style={{ borderTop: "0.5px solid var(--border)", paddingTop: "40px" }}>
                {/* Email */}
                <div className="flex gap-5 items-start mb-10 group">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      border: "0.5px solid var(--border)",
                      color: "var(--accent)",
                    }}
                  >
                    <Mail size={18} />
                  </div>
                  <div>
                    <p
                      className="text-[10px] tracking-[2px] uppercase mb-2"
                      style={{ color: "var(--accent)" }}
                    >
                      Email
                    </p>
                    <a
                      href="mailto:northfacepk@gmail.com"
                      className="text-[15px] transition-colors duration-300"
                      style={{ color: "var(--muted)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--foreground)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--muted)")
                      }
                    >
                      northfacepk@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-5 items-start mb-10 group">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      border: "0.5px solid var(--border)",
                      color: "var(--accent)",
                    }}
                  >
                    <Phone size={18} />
                  </div>
                  <div>
                    <p
                      className="text-[10px] tracking-[2px] uppercase mb-2"
                      style={{ color: "var(--accent)" }}
                    >
                      Phone / WhatsApp
                    </p>
                    <a
                      href="tel:+923456331153"
                      className="text-[15px] block transition-colors duration-300"
                      style={{ color: "var(--muted)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--foreground)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--muted)")
                      }
                    >
                      +92 345 6331153
                    </a>
                    <a
                      href="tel:+923229046458"
                      className="text-[15px] block mt-1 transition-colors duration-300"
                      style={{ color: "var(--muted)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--foreground)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--muted)")
                      }
                    >
                      +92 322 9046458
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-5 items-start mb-10 group">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      border: "0.5px solid var(--border)",
                      color: "var(--accent)",
                    }}
                  >
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p
                      className="text-[10px] tracking-[2px] uppercase mb-2"
                      style={{ color: "var(--accent)" }}
                    >
                      Location
                    </p>
                    <a
                      href="https://maps.app.goo.gl/aFZbM7Kpe6PhbzrJ8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] transition-colors duration-300"
                      style={{ color: "var(--muted)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--foreground)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--muted)")
                      }
                    >
                      Chitral, Pakistan
                    </a>
                  </div>
                </div>

                {/* Social Media */}
                <div
                  className="pt-8"
                  style={{ borderTop: "0.5px solid var(--border)" }}
                >
                  <p
                    className="text-[10px] tracking-[2px] uppercase mb-5"
                    style={{ color: "var(--accent)" }}
                  >
                    Follow Along
                  </p>
                  <div className="flex flex-col gap-3">
                    {[
                      {
                        label: "Instagram",
                        handle: "@affaaclicks",
                        url: "https://www.instagram.com/affaaclicks",
                        icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                      },
                      {
                        label: "Facebook",
                        handle: "affaa.clicks",
                        url: "https://www.facebook.com/affaa.clicks",
                        icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                      },
                      {
                        label: "TikTok",
                        handle: "@affaa.clicks",
                        url: "https://www.tiktok.com/@affaa.clicks",
                        icon: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
                      },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                        style={{ textDecoration: "none" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(245, 166, 35, 0.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                          style={{
                            border: "0.5px solid var(--border)",
                            color: "var(--accent)",
                          }}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="currentColor"
                          >
                            <path d={s.icon} />
                          </svg>
                        </div>
                        <div>
                          <p
                            className="text-[10px] tracking-[2px] uppercase mb-0.5"
                            style={{ color: "var(--accent)" }}
                          >
                            {s.label}
                          </p>
                          <p className="text-sm" style={{ color: "var(--muted)" }}>
                            {s.handle}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              <div>
                <label
                  className="text-[10px] tracking-[2px] uppercase block mb-3"
                  style={{ color: "var(--accent)" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  style={inputStyle}
                  placeholder="Your name"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(245, 166, 35, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <label
                  className="text-[10px] tracking-[2px] uppercase block mb-3"
                  style={{ color: "var(--accent)" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  style={inputStyle}
                  placeholder="your@email.com"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(245, 166, 35, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <label
                  className="text-[10px] tracking-[2px] uppercase block mb-3"
                  style={{ color: "var(--accent)" }}
                >
                  Message
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  style={{ ...inputStyle, resize: "none" }}
                  placeholder="Tell me about your project..."
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(245, 166, 35, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {error && (
                <div
                  className="px-4 py-3 rounded-lg text-sm"
                  style={{
                    backgroundColor: "rgba(226, 75, 74, 0.1)",
                    color: "#e24b4a",
                    border: "0.5px solid rgba(226, 75, 74, 0.3)",
                  }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || submitted}
                className="py-4 px-8 rounded-lg text-[11px] tracking-[2px] uppercase font-semibold flex items-center justify-center gap-3 transition-all duration-300"
                style={{
                  backgroundColor: submitted ? "var(--muted)" : "var(--accent)",
                  color: "var(--background)",
                  cursor: loading ? "wait" : "pointer",
                  border: "none",
                  fontFamily: "var(--font-body)",
                  opacity: loading ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!loading && !submitted) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(245, 166, 35, 0.3)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Send size={14} />
                {loading ? "Sending..." : submitted ? "Message Sent! ✓" : "Send Message"}
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}