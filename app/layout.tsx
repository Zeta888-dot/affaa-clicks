import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";
import FloatingButtons from "./components/FloatingButtons";

export const metadata: Metadata = {
  metadataBase: new URL("https://affaaclicks.com"),
  title: {
    default: "Affaa Clicks | Nature & Landscape Photography from Chitral",
    template: "%s | Affaa Clicks",
  },
  description:
    "Explore stunning nature and landscape photography from Chitral, Pakistan by Affaa. Travel guides, photo tips, and cultural insights from the Hindu Kush.",
  keywords: [
    "Affaa Clicks",
    "Chitral photography",
    "Pakistan landscape",
    "Hindu Kush photos",
    "nature photography Pakistan",
    "travel blogger Chitral",
    "landscape photographer",
    "mountain photography",
  ],
  authors: [{ name: "Affaa", url: "https://affaaclicks.com" }],
  creator: "Affaa",
  publisher: "Affaa Clicks",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Affaa Clicks | Nature & Landscape Photography from Chitral",
    description:
      "Travel blogger and photographer from Chitral, Pakistan, capturing the beauty of Hindu Kush and beyond.",
    url: "https://affaaclicks.com",
    siteName: "Affaa Clicks",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Hero.jpeg",
        width: 1200,
        height: 630,
        alt: "Affaa Clicks | Nature Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Affaa Clicks | Nature & Landscape Photography from Chitral",
    description:
      "Travel blogger and photographer from Chitral, Pakistan, capturing the beauty of Hindu Kush and beyond.",
    images: ["/Hero.jpeg"],
    creator: "@affaaclicks",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  category: "Photography",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased dark"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Affaa Clicks",
              description:
                "Nature & landscape photography from Chitral, Pakistan",
              url: "https://affaaclicks.com",
              image: "https://affaaclicks.com/Hero.jpeg",
              telephone: "+923456331153",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Chitral",
                addressCountry: "PK",
              },
              sameAs: [
                "https://www.instagram.com/affaaclicks",
                "https://www.facebook.com/affaa.clicks",
                "https://www.tiktok.com/@affaa.clicks",
              ],
              priceRange: "$$",
              areaServed: "Worldwide",
            }),
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          fontFamily: "var(--font-body)",
        }}
      >
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
          <FloatingButtons />
        </ThemeProvider>
      </body>
    </html>
  );
}