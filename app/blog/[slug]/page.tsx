import { client, urlFor } from "@/lib/sanity/client";
import { singlePostQuery, allPostsQuery } from "@/lib/sanity/queries";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import FadeIn from "../../components/FadeIn";

export async function generateStaticParams() {
  const posts = await client.fetch(allPostsQuery);
  return posts.map((post: any) => ({ slug: post.slug.current }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch(singlePostQuery, { slug });

  if (!post)
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-6"
        style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
      >
        <p style={{ color: "var(--muted)" }}>Post not found</p>
        <Link
          href="/blog"
          className="px-8 py-3 rounded-full text-[11px] tracking-[2px] uppercase"
          style={{ border: "0.5px solid var(--border)", color: "var(--accent)" }}
        >
          Back to Journal
        </Link>
      </div>
    );

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="px-6 md:px-12 pt-32 pb-24">
        {/* Back + Header */}
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-[11px] tracking-[2px] uppercase mb-14"
              style={{ color: "var(--accent)", textDecoration: "none" }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform duration-300 group-hover:-translate-x-1.5"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Journal
            </Link>

            <header className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-6">
                {post.category && (
                  <span
                    className="text-[10px] tracking-[2px] uppercase"
                    style={{ color: "var(--accent)" }}
                  >
                    {post.category}
                  </span>
                )}
                {post.publishedAt && (
                  <>
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{ backgroundColor: "var(--muted)" }}
                    />
                    <span className="text-xs" style={{ color: "var(--muted)" }}>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </>
                )}
              </div>

              <h1
                className="leading-[1.1]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(36px, 6vw, 64px)",
                  fontWeight: 300,
                }}
              >
                {post.title}
              </h1>
            </header>
          </FadeIn>
        </div>

        {/* Cover Image (wider) */}
        {post.coverImage && (
          <FadeIn>
            <div className="max-w-5xl mx-auto relative aspect-[16/9] overflow-hidden rounded-lg mb-16">
              <img
                src={urlFor(post.coverImage).url()}
                alt={post.title}
                className="w-full h-full object-cover"
                style={{ display: "block" }}
              />
            </div>
          </FadeIn>
        )}

        {/* Body */}
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div style={{ fontSize: "16px", lineHeight: 1.9 }}>
              {post.body && (
                <PortableText
                  value={post.body}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p
                          style={{
                            marginBottom: "24px",
                            color: "var(--muted)",
                            lineHeight: 1.9,
                          }}
                        >
                          {children}
                        </p>
                      ),
                      h1: ({ children }) => (
                        <h1
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "40px",
                            fontWeight: 300,
                            color: "var(--foreground)",
                            marginBottom: "20px",
                            marginTop: "40px",
                          }}
                        >
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "32px",
                            fontWeight: 300,
                            color: "var(--foreground)",
                            marginBottom: "16px",
                            marginTop: "36px",
                          }}
                        >
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "24px",
                            fontWeight: 300,
                            color: "var(--foreground)",
                            marginBottom: "12px",
                            marginTop: "32px",
                          }}
                        >
                          {children}
                        </h3>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote
                          style={{
                            borderLeft: "2px solid var(--accent)",
                            paddingLeft: "24px",
                            margin: "40px 0",
                            color: "var(--accent)",
                            fontFamily: "var(--font-display)",
                            fontSize: "22px",
                            fontStyle: "italic",
                            lineHeight: 1.6,
                          }}
                        >
                          {children}
                        </blockquote>
                      ),
                    },
                    marks: {
                      strong: ({ children }) => (
                        <strong
                          style={{ color: "var(--foreground)", fontWeight: 500 }}
                        >
                          {children}
                        </strong>
                      ),
                      em: ({ children }) => (
                        <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
                          {children}
                        </em>
                      ),
                      link: ({ value, children }) => (
                        <a
                          href={value?.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "var(--accent)", textDecoration: "underline" }}
                        >
                          {children}
                        </a>
                      ),
                    },
                    types: {
                      image: ({ value }) => (
                        <div className="my-10">
                          <div className="rounded-lg overflow-hidden">
                            <img
                              src={urlFor(value).url()}
                              alt={value.caption || ""}
                              className="w-full"
                              style={{ objectFit: "cover", display: "block" }}
                            />
                          </div>
                          {value.caption && (
                            <p
                              className="text-[11px] tracking-[2px] uppercase text-center mt-3"
                              style={{ color: "var(--muted)" }}
                            >
                              {value.caption}
                            </p>
                          )}
                        </div>
                      ),
                    },
                  }}
                />
              )}
            </div>
          </FadeIn>

          {/* End Mark */}
          <div
            className="mt-16 pt-10 flex flex-col items-center gap-4"
            style={{ borderTop: "0.5px solid var(--border)" }}
          >
            <div className="w-10 h-px" style={{ backgroundColor: "var(--accent)" }} />
            <p
              className="text-[11px] tracking-[3px] uppercase"
              style={{ color: "var(--accent)" }}
            >
              #AffaaClicks
            </p>
          </div>

          {/* More Stories CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/blog"
              className="inline-block px-10 py-4 rounded-full text-sm tracking-[3px] uppercase font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--background)",
              }}
            >
              More Stories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}