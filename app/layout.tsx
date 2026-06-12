import type { Metadata } from "next";
import "./globals.css";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import ScrollToTop from "@/components/scroll-top";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/providers";
import Navbar from "@/components/Navbar";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "600", "700", "800"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
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
        className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans bg-background antialiased`}
      >
        <Providers>
          {/* Dot grid */}
          <div aria-hidden="true" className="dot-grid" />
          {/* Grain overlay */}
          <div aria-hidden="true" className="grain-overlay" />
          <Navbar />
          <div className="relative min-h-screen">
            {children}
            <Toaster position="top-center" />
          </div>
          <ScrollToTop />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
