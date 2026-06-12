import { client, urlFor } from "@/lib/sanity/client";
import { singlePostQuery, allPostsQuery } from "@/lib/sanity/queries";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = await client.fetch(allPostsQuery);
  return posts.map((post: any) => ({ slug: post.slug.current }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client.fetch(singlePostQuery, { slug });

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <p style={{ color: 'var(--muted)' }}>Post not found</p>
    </div>
  );

  return (
    <div className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-3xl mx-auto px-8 py-24">

        {/* Back */}
        <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '40px', textDecoration: 'none' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Journal
        </Link>

        {/* Meta */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          {post.category && (
            <span style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)' }}>
              {post.category}
            </span>
          )}
          {post.publishedAt && (
            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 300, lineHeight: 1.1, marginBottom: '32px' }}>
          {post.title}
        </h1>

        {/* Cover Image */}
        {post.coverImage && (
          <div style={{ aspectRatio: '16/9', borderRadius: '2px', overflow: 'hidden', marginBottom: '48px' }}>
            <img
              src={urlFor(post.coverImage).url()}
              alt={post.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

       {/* Body */}
<div style={{ fontSize: '16px', lineHeight: 1.9, color: 'var(--muted)' }}>
  {post.body && (
    <PortableText
      value={post.body}
      components={{
        block: {
          normal: ({ children }) => (
            <p style={{ marginBottom: '24px', color: 'var(--muted)', lineHeight: 1.9 }}>{children}</p>
          ),
          h1: ({ children }) => (
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px', fontWeight: 300, color: 'var(--foreground)', marginBottom: '20px', marginTop: '40px' }}>{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 300, color: 'var(--foreground)', marginBottom: '16px', marginTop: '36px' }}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 300, color: 'var(--foreground)', marginBottom: '12px', marginTop: '32px' }}>{children}</h3>
          ),
          blockquote: ({ children }) => (
            <blockquote style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '24px', margin: '32px 0', color: 'var(--accent)', fontFamily: 'var(--font-display)', fontSize: '22px', fontStyle: 'italic' }}>{children}</blockquote>
          ),
        },
        marks: {
          strong: ({ children }) => (
            <strong style={{ color: 'var(--foreground)', fontWeight: 500 }}>{children}</strong>
          ),
          em: ({ children }) => (
            <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{children}</em>
          ),
          link: ({ value, children }) => (
            <a href={value?.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>{children}</a>
          ),
        },
        types: {
          image: ({ value }) => (
            <div style={{ margin: '40px 0', borderRadius: '2px', overflow: 'hidden' }}>
              <img
                src={urlFor(value).url()}
                alt={value.caption || ''}
                style={{ width: '100%', objectFit: 'cover', display: 'block' }}
              />
              {value.caption && (
                <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '12px', textAlign: 'center' }}>
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

        {/* Watermark */}
        <div style={{ borderTop: '0.5px solid var(--border)', marginTop: '64px', paddingTop: '24px', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--accent)' }}>
            #AffaaClicks
          </p>
        </div>
      </div>
    </div>
  );
}