import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";
import FloatingButtons from "./components/FloatingButtons";

export const metadata: Metadata = {
  title: "Affaa Clicks",
  description: "Travel blogger and photographer from Chitral, Pakistan — capturing the beauty of Hindu Kush and beyond.",
  keywords: "Affaa Clicks, Chitral photography, Pakistan travel blogger, Hindu Kush, nature photography, landscape photography",
  openGraph: {
    title: "Affaa Clicks",
    description: "Travel blogger and photographer from Chitral, Pakistan",
    url: "https://affaaclicks.com",
    siteName: "Affaa Clicks",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body
        className="min-h-full flex flex-col"
        style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)', fontFamily: 'var(--font-body)' }}
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