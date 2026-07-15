import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import { Toaster } from "sonner";
import ScrollToTop from "@/components/scroll-top";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/providers";
import Navbar from "@/components/Navbar";
import TitleBlock from "@/components/TitleBlock";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Hafizu | Portfolio",
  description: "Personal Portfolio by Hafizu - Software Developer",
  icons: {
    icon: [{ url: "/favicon.ico", href: "/favicon.ico" }],
  },
  openGraph: {
    title: "Hafizu | Portfolio",
    description: "Personal Portfolio by Hafizu - Software Developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} font-sans bg-background antialiased`}
      >
        <Providers>
          {/* Graph-paper grid */}
          <div aria-hidden="true" className="dot-grid" />
          {/* Grain overlay */}
          <div aria-hidden="true" className="grain-overlay" />
          {/* Sheet crop marks */}
          <div aria-hidden="true" className="crop-marks" />
          <Navbar />
          <div className="relative min-h-screen">
            {children}
            <Toaster position="top-center" />
          </div>
          <TitleBlock />
          <ScrollToTop />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
