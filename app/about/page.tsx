import FadeIn from "../components/FadeIn";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-24">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-20">
            <p
              className="text-[11px] tracking-[4px] uppercase mb-4"
              style={{ color: "var(--accent)" }}
            >
              The Photographer
            </p>
            <h1
              className="leading-[1.05]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(42px, 8vw, 80px)",
                fontWeight: 300,
              }}
            >
              About{" "}
              <em style={{ color: "var(--accent)" }}>Affaa</em>
            </h1>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Photo with offset frame */}
          <FadeIn>
            <div className="relative mr-3 mb-3">
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  border: "1px solid var(--accent)",
                  transform: "translate(16px, 16px)",
                }}
              />
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg group">
                <img
                  src="/afaa.jpg"
                  alt="Affaa — Travel Blogger & Photographer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ display: "block" }}
                />
                <div
                  className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-[10px] tracking-[2px] uppercase"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(8px)",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  #AffaaClicks
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn delay={0.2}>
            <div className="md:pt-6">
              <p
                className="text-[11px] tracking-[4px] uppercase mb-6"
                style={{ color: "var(--accent)" }}
              >
                My Story
              </p>
              <h2
                className="text-3xl md:text-4xl mb-8"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontStyle: "italic",
                }}
              >
                From Chitral to the World
              </h2>
              <p
                className="mb-6 text-[15px] leading-[1.9]"
                style={{ color: "var(--muted)" }}
              >
                Hi, I'm Affaa — a travel blogger and photographer from the
                breathtaking valleys of Chitral, Pakistan. I share destination
                guides, photo tips, and cultural insights from my adventures
                around the world.
              </p>
              <p
                className="mb-10 text-[15px] leading-[1.9]"
                style={{ color: "var(--muted)" }}
              >
                From the mighty Hindu Kush to distant shores, every frame tells
                a story of light, land, and the people who call these places
                home. Follow along at{" "}
                <span style={{ color: "var(--accent)" }}>#AffaaClicks</span>.
              </p>
              <p
                className="text-2xl mb-12"
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  color: "var(--accent)",
                }}
              >
                — Affaa
              </p>

              {/* Stats */}
              <div
                className="grid grid-cols-3 pt-10"
                style={{ borderTop: "0.5px solid var(--border)" }}
              >
                {[
                  { num: "500+", label: "Projects" },
                  { num: "10+", label: "Years" },
                  { num: "200+", label: "Clients" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="text-center"
                    style={{
                      borderLeft: i > 0 ? "0.5px solid var(--border)" : "none",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "40px",
                        fontWeight: 300,
                        color: "var(--accent)",
                        lineHeight: 1,
                      }}
                    >
                      {s.num}
                    </div>
                    <div
                      className="text-[10px] tracking-[2px] uppercase mt-2"
                      style={{ color: "var(--muted)" }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Pull Quote */}
        <FadeIn>
          <div className="mt-32 text-center max-w-3xl mx-auto">
            <div
              className="w-12 h-px mx-auto mb-10"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <p
              className="text-2xl md:text-[32px] leading-[1.4] mb-12"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              "Every frame tells a story of light, land, and the people who
              call these places home."
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-4 rounded-full text-sm tracking-[3px] uppercase font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--background)",
              }}
            >
              Let's Work Together
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}