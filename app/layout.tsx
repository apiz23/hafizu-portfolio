import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ReactQueryProvider from "@/lib/react-query";

const poppins = Montserrat({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Hafizu Portfolio",
	description: "Personal Portfolio by Hafizu",
	icons: {
		icon: [
			{
				url: "/logo.png",
				href: "/logo.png",
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={poppins.className}>
				<div className="min-h-screen bg-orange-100">
					<div className="max-w-4xl md:mx-auto">
						<Navbar />
						<ReactQueryProvider>{children}</ReactQueryProvider>
					</div>
				</div>
			</body>
		</html>
	);
}
