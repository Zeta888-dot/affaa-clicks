export default function AboutPage() {
  return (
    <div className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-5xl mx-auto px-8 py-24">

        {/* Header */}
        <div className="text-center mb-20">
          <p style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>
            The Photographer
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 8vw, 80px)', fontWeight: 300, lineHeight: 1.05 }}>
            About Affaa
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Photo */}
          <div style={{ position: 'relative', aspectRatio: '3/4', borderRadius: '2px', overflow: 'hidden', border: '0.5px solid var(--border)' }}>
            <img
              src="/afaa.jpg"
              alt="Affaa — Travel Blogger & Photographer"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', bottom: '16px', right: '16px',
              fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)'
            }}>
              #AffaaClicks
            </div>
          </div>

          {/* Content */}
          <div style={{ paddingTop: '24px' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 300,
              color: 'var(--accent)', marginBottom: '24px', fontStyle: 'italic'
            }}>
              From Chitral to the World
            </h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.9, marginBottom: '20px', fontSize: '15px' }}>
              Hi, I'm Affaa — a travel blogger and photographer from the breathtaking valleys of Chitral, Pakistan.
              I share destination guides, photo tips, and cultural insights from my adventures around the world.
            </p>
            <p style={{ color: 'var(--muted)', lineHeight: 1.9, marginBottom: '48px', fontSize: '15px' }}>
              From the mighty Hindu Kush to distant shores, every frame tells a story of light, land, and the people
              who call these places home. Follow along at <span style={{ color: 'var(--accent)' }}>#AffaaClicks</span>.
            </p>

            {/* Stats */}
            <div style={{
              borderTop: '0.5px solid var(--border)', paddingTop: '40px',
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px'
            }}>
              {[
                { num: '500+', label: 'Projects' },
                { num: '10+', label: 'Years' },
                { num: '200+', label: 'Clients' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: '48px',
                    fontWeight: 300, color: 'var(--accent)', lineHeight: 1
                  }}>
                    {s.num}
                  </div>
                  <div style={{
                    fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
                    color: 'var(--muted)', marginTop: '8px'
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}