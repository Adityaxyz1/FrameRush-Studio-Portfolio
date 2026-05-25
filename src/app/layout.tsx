import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Frame Rush Studio | Premium Cinematic Motion Design & Production House",
  description: "A luxury motion design studio and premium digital agency. Specialize in Video Editing, 3D Motion Design, Brand Graphic Design, and high-end interactive website development.",
  keywords: "Video Editing, 3D Motion Design, Graphic Design, Interactive Websites, Cinematic Studio, Premium Design, Awwwards Agency, Frame Rush Studio",
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-[#0A0A0A] text-[#F2F2F2] antialiased scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
      </head>
      <body className="min-h-full font-sans bg-[#0A0A0A] text-[#F2F2F2] overflow-x-hidden selection:bg-[#D4AF37] selection:text-[#0A0A0A]" suppressHydrationWarning>
        {/* Cinematic Analog Texture */}
        <FilmGrain />

        {/* Luxury Spring-Based Cursor */}
        <CustomCursor />

        {/* Smooth Lenis scroll environment */}
        <SmoothScroll>
          {/* Floating Navigation */}
          <Navbar />
          
          <main className="w-full flex-grow">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
