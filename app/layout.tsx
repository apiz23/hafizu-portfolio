import type { Metadata } from "next";
import "./globals.css";
import { Sora, Figtree, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import ScrollToTop from "@/components/scroll-top";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/providers";
import Navbar from "@/components/Navbar";

const sora = Sora({
	subsets: ["latin"],
	variable: "--font-heading",
	weight: ["500", "600", "700", "800"],
});
const figtree = Figtree({
	subsets: ["latin"],
	variable: "--font-sans",
	weight: ["300", "400", "500", "600", "700"],
});
const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
	weight: ["400", "500"],
});

export const metadata: Metadata = {
	title: "Hafizu | Portfolio",
	description: "Personal Portfolio by Hafizu - Software Developer",
	icons: {
		icon: [
			{
				url: "/favicon.ico",
				href: "/favicon.ico",
			},
		],
	},
	openGraph: {
		title: "Hafizu | Portfolio",
		description: "Personal Portfolio by Hafizu - Software Developer",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body
				className={`${sora.variable} ${figtree.variable} ${jetbrainsMono.variable} font-sans bg-background antialiased`}
			>
				<Providers>
					{/* Ambient top-light — soft indigo radial, purpose: depth without decoration */}
					<div
						className="fixed inset-0 pointer-events-none z-0"
						aria-hidden="true"
						style={{
							background:
								"radial-gradient(ellipse 100% 55% at 50% -5%, oklch(0.72 0.12 277 / 0.09) 0%, transparent 68%)",
						}}
					/>
					<Navbar />
					<div className="relative min-h-screen">
						{children}
						<Toaster richColors position="top-center" />
					</div>
					<ScrollToTop />
					<Analytics />
				</Providers>
			</body>
		</html>
	);
}
