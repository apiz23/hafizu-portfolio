import type { Metadata } from "next";
import "./globals.css";
import { Sora, Figtree, JetBrains_Mono } from "next/font/google";
import Squares from "@/components/light-rays";
import { Toaster } from "sonner";
import ScrollToTop from "@/components/scroll-top";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/providers";

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
					<div className="fixed inset-0 opacity-20 pointer-events-none">
						<Squares
							speed={0.5}
							squareSize={60}
							direction="diagonal"
							borderColor="currentColor"
							hoverFillColor="transparent"
						/>
					</div>
					<div className="relative min-h-screen">
						<div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-12">
							<div className="relative bg-background/90 backdrop-blur-sm rounded-2xl border border-border/30 shadow-sm p-2">
								{children}
								<Toaster richColors position="top-center" />
							</div>
						</div>
					</div>
					<ScrollToTop />
					<Analytics />
				</Providers>
			</body>
		</html>
	);
}

