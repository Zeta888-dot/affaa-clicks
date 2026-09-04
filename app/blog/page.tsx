import { client, urlFor } from "@/lib/sanity/client";
import { allPostsQuery } from "@/lib/sanity/queries";
import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import FadeIn from "../components/FadeIn";

export default async function BlogPage() {
  const posts = (await client.fetch(allPostsQuery)) || [];
  const featured = posts[0];
  const rest = posts.slice(1);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-20">
            <p
              className="text-[11px] tracking-[4px] uppercase mb-4"
              style={{ color: "var(--accent)" }}
            >
              Stories & Guides
            </p>
            <h1
              className="leading-[1.05]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(42px, 8vw, 80px)",
                fontWeight: 300,
              }}
            >
              The <em style={{ color: "var(--accent)" }}>Journal</em>
            </h1>
          </div>
        </FadeIn>

        {posts.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ border: "0.5px solid var(--border)" }}
            >
              <BookOpen size={20} style={{ color: "var(--muted)" }} />
            </div>
            <p
              className="text-xs tracking-[3px] uppercase"
              style={{ color: "var(--muted)" }}
            >
              No stories yet. Coming soon.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Story */}
            {featured && (
              <FadeIn>
                <Link
                  href={`/blog/${featured.slug.current}`}
                  className="group block mb-20"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-center">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                      {featured.coverImage && (
                        <Image
                          src={urlFor(featured.coverImage).url()}
                          alt={featured.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <div
                        className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-[10px] tracking-[2px] uppercase font-semibold"
                        style={{
                          backgroundColor: "var(--accent)",
                          color: "var(--background)",
                        }}
                      >
                        Featured
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        {featured.category && (
                          <span
                            className="text-[10px] tracking-[2px] uppercase"
                            style={{ color: "var(--accent)" }}
                          >
                            {featured.category}
                          </span>
                        )}
                        {featured.publishedAt && (
                          <>
                            <span
                              className="w-1 h-1 rounded-full"
                              style={{ backgroundColor: "var(--muted)" }}
                            />
                            <span className="text-xs" style={{ color: "var(--muted)" }}>
                              {formatDate(featured.publishedAt)}
                            </span>
                          </>
                        )}
                      </div>

                      <h2
                        className="text-3xl md:text-4xl mb-5 leading-[1.2] transition-colors duration-300 group-hover:text-[var(--accent)]"
                        style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
                      >
                        {featured.title}
                      </h2>

                      {featured.excerpt && (
                        <p
                          className="mb-8 text-[15px] leading-[1.9]"
                          style={{ color: "var(--muted)", maxWidth: "480px" }}
                        >
                          {featured.excerpt}
                        </p>
                      )}

                      <span
                        className="inline-flex items-center gap-2 text-[11px] tracking-[2px] uppercase"
                        style={{ color: "var(--accent)" }}
                      >
                        Read Story
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="transition-transform duration-300 group-hover:translate-x-1.5"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            )}

            {/* Divider */}
            {rest.length > 0 && (
              <div className="flex items-center gap-6 mb-16">
                <p
                  className="text-[11px] tracking-[4px] uppercase whitespace-nowrap"
                  style={{ color: "var(--accent)" }}
                >
                  Latest Stories
                </p>
                <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
              </div>
            )}

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {rest.map((post: any, i: number) => (
                <FadeIn key={post._id} delay={Math.min(i * 0.1, 0.5)}>
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="group block"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <article>
                      <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-6">
                        {post.coverImage && (
                          <Image
                            src={urlFor(post.coverImage).url()}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        )}
                      </div>

                      <div className="flex items-center gap-3 mb-3">
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
                              {formatDate(post.publishedAt)}
                            </span>
                          </>
                        )}
                      </div>

                      <h2
                        className="text-xl mb-3 leading-[1.3] transition-colors duration-300 group-hover:text-[var(--accent)]"
                        style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
                      >
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p
                          className="text-sm leading-[1.8]"
                          style={{
                            color: "var(--muted)",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {post.excerpt}
                        </p>
                      )}

                      <span
                        className="inline-flex items-center gap-2 mt-5 text-[11px] tracking-[2px] uppercase"
                        style={{ color: "var(--accent)" }}
                      >
                        Read More
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="transition-transform duration-300 group-hover:translate-x-1.5"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </article>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}