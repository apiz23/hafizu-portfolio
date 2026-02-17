import type { Metadata } from "next";
import "./globals.css";
import { Sora, Inter } from "next/font/google";
import Squares from "@/components/light-rays";
import { Toaster } from "sonner";

const sora = Sora({
	subsets: ["latin"],
	variable: "--font-heading",
	weight: ["500", "600", "700"],
});
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-body",
});

export const metadata: Metadata = {
	title: "Hafizu | Portfolio",
	description: "Personal Portfolio by Hafizu - Software Developer",
	icons: {
		icon: [
			{
				url: "/logo.png",
				href: "/logo.png",
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
				<link rel="icon" href="/logo.png" />
			</head>
			<body
				className={`${sora.className} ${inter.className} font-sans bg-gradient-to-br from-gray-50 to-white`}
			>
				<div className="fixed inset-0 opacity-30">
					<Squares
						speed={1}
						squareSize={50}
						direction="diagonal"
						borderColor="#000000"
						hoverFillColor="#f0f0f0"
					/>
				</div>

				<div className="fixed inset-0 bg-gradient-to-br from-white/50 via-transparent to-white/30 pointer-events-none" />

				<div className="relative min-h-screen">
					<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
						{/* Subtle Shadow and Clean White Background */}
						<div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-2">
							{children}
							<Toaster richColors position="top-center" />
						</div>
					</div>
				</div>
			</body>
		</html>
	);
}
