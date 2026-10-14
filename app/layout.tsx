import type { Metadata } from "next";
import "./globals.css";
import { Instrument_Serif, Inter, Space_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/providers";
import SplashGate from "@/components/splash-gate";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hafizuddin-portfolio.vercel.app"),
  title: "Hafizu | Portfolio",
  description: "Personal Portfolio by Hafizu - Software Developer",
  manifest: "/icon/site.webmanifest",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/icon/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Hafizu | Portfolio",
    description: "Personal Portfolio by Hafizu - Software Developer",
    type: "website",
    url: "https://hafizuddin-portfolio.vercel.app",
    siteName: "Hafizu Portfolio",
    locale: "en_US",
    // Images come from app/opengraph-image.tsx (auto-injected).
  },
  twitter: {
    card: "summary_large_image",
    title: "Hafizu | Portfolio",
    description: "Personal Portfolio by Hafizu - Software Developer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.variable} ${instrument.variable} ${spaceMono.variable} font-sans bg-background antialiased`}
      >
        <Providers>
          <SplashGate />
          <div className="relative min-h-screen">
            {children}
            <Toaster position="top-center" />
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}