import { client, urlFor } from "@/lib/sanity/client";
import { allPostsQuery } from "@/lib/sanity/queries";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await client.fetch(allPostsQuery);

  return (
    <div className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-7xl mx-auto px-8 py-24">

        {/* Header */}
        <div className="text-center mb-16">
          <p style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>
            Stories & Guides
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 8vw, 80px)', fontWeight: 300, lineHeight: 1.05 }}>
            The Journal
          </h1>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <p style={{ color: 'var(--muted)', letterSpacing: '2px', fontSize: '12px', textTransform: 'uppercase' }}>
              No posts yet — coming soon
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <Link key={post._id} href={`/blog/${post.slug.current}`}
                style={{ textDecoration: 'none', color: 'inherit' }}>
                <article>
                  {/* Cover Image */}
                  <div style={{ aspectRatio: '16/9', borderRadius: '2px', overflow: 'hidden', marginBottom: '20px', backgroundColor: 'rgba(107,140,126,0.15)' }}>
                    {post.coverImage && (
                      <img
                        src={urlFor(post.coverImage).url()}
                        alt={post.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                  </div>

                  {/* Meta */}
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
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
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 300, marginBottom: '10px', lineHeight: 1.3 }}>
                    {post.title}
                  </h2>

                 {/* Excerpt */}
{post.excerpt && (
  <p style={{ 
    color: 'var(--muted)', fontSize: '14px', lineHeight: 1.8,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  }}>
    {post.excerpt}
  </p>
)}

                  {/* Read More */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', color: 'var(--accent)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    Read More
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}