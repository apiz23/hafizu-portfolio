"use client";

import { Linkedin } from "lucide-react";
import Link from "next/link";
import { Dock, DockIcon } from "./magicui/dock";
import { RiTwitterXFill, RiGithubFill, RiBloggerLine } from "react-icons/ri";
import { Separator } from "./ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const dockIcons = [
	{
		icon: <RiBloggerLine className="size-6" />,
		href: "https://hafizu-blog.vercel.app/",
		tooltip: "Hafizu Blog",
	},
];

const dockIconsSocial = [
	{
		icon: <RiGithubFill className="size-6" />,
		href: "https://github.com/apiz23",
		tooltip: "GitHub",
	},
	{
		icon: <Linkedin className="size-6" />,
		href: "https://www.linkedin.com/in/muh-hafizuddin",
		tooltip: "LinkedIn",
	},
	{
		icon: <RiTwitterXFill className="size-6" />,
		href: "https://x.com/piz230601",
		tooltip: "Twitter",
	},
];

export default function Navbar() {
	return (
		<>
			<div className="fixed bottom-5 left-0 right-0 z-50">
				<div className="relative flex justify-center">
					<TooltipProvider>
						<Dock
							direction="middle"
							className="border-neutral-200 bg-zinc-800 text-white"
						>
							{dockIcons.map((item, index) => (
								<DockIcon key={index}>
									<Tooltip>
										<TooltipTrigger asChild>
											<Link href={item.href} target="_blank">
												{item.icon}
												<TooltipContent>
													<p>{item.tooltip}</p>
												</TooltipContent>
											</Link>
										</TooltipTrigger>
									</Tooltip>
								</DockIcon>
							))}

							<Separator orientation="vertical" className="h-full bg-neutral-400" />

							{dockIconsSocial.map((item, index) => (
								<DockIcon key={index}>
									<Tooltip>
										<TooltipTrigger asChild>
											<Link href={item.href} target="_blank">
												{item.icon}
												<TooltipContent>
													<p>{item.tooltip}</p>
												</TooltipContent>
											</Link>
										</TooltipTrigger>
									</Tooltip>
								</DockIcon>
							))}
						</Dock>
					</TooltipProvider>
				</div>
			</div>
		</>
	);
}
