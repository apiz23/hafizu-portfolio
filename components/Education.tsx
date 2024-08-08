"use client";
import React, { useState } from "react";
import TypingAnimation from "./magicui/typing-animation";
import gsap from "gsap";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
	Line,
	LineChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
} from "recharts";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type EducationLevel = "diploma" | "degree" | "secondary";

export default function Education() {
	const gradualSpaceRef = React.useRef(null);
	const [selectedValue, setSelectedValue] = useState<EducationLevel>("diploma");

	React.useEffect(() => {
		if (gradualSpaceRef.current) {
			gsap.fromTo(
				gradualSpaceRef.current,
				{ opacity: 0, y: 100 },
				{
					opacity: 1,
					y: 0,
					duration: 3.5,
					ease: "power4.out",
					scrollTrigger: {
						trigger: gradualSpaceRef.current,
						start: "top 80%",
						toggleActions: "play none none none",
					},
				}
			);
		}
	}, []);

	const diplomaData = [
		{ sem: "0", GPA: 3.71, CPA: 3.71 },
		{ sem: "1", GPA: 3.87, CPA: 3.83 },
		{ sem: "2", GPA: 3.83, CPA: 3.83 },
		{ sem: "1", GPA: 3.88, CPA: 3.84 },
		{ sem: "2", GPA: 3.68, CPA: 3.81 },
	];

	const degreeData = [{ sem: "2", GPA: 3.82, CPA: 3.82 }];

	const secondarySchoolData = [
		{ sem: "1", GPA: 3.42, CPA: 3.42 },
		{ sem: "2", GPA: 3.53, CPA: 3.47 },
		{ sem: "3", GPA: 3.77, CPA: 3.57 },
		{ sem: "4", GPA: 3.59, CPA: 3.58 },
	];

	const chartDataMap: Record<
		EducationLevel,
		{ sem: string; GPA: number; CPA: number }[]
	> = {
		diploma: diplomaData,
		degree: degreeData,
		secondary: secondarySchoolData,
	};

	const chartConfig = {
		GPA: {
			label: "GPA",
			color: "#0512ff",
		},
		CPA: {
			label: "CPA",
			color: "#1ac95d",
		},
	} satisfies ChartConfig;

	return (
		<>
			<section className="pt-[70%] md:pt-[15%]">
				<div className="text-center" ref={gradualSpaceRef}>
					<TypingAnimation
						className="scroll-m-20 text-6xl uppercase font-extrabold tracking-tight md:text-[12vh]"
						text="Education"
					/>
				</div>
				<div className="max-w-3xl mx-auto mt-10 md:px-0 px-2">
					<div className="grid grid-cols-2 gap-6">
						<Card className="bg-yellow-50 border-neutral-500 border-b-4 border-x-0 border-t-0 shadow-md">
							<CardContent className="p-4">
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/9/95/UTHM_Logo.png?20221014163012"
									alt="logo"
									className="mx-auto h-20 w-20 md:h-32 md:w-32 mb-5"
								/>
								<CardTitle className="mb-3 text-xl md:text-2xl">
									Diploma In Information Technology
								</CardTitle>
								<CardDescription>Universiti Tun Hussein Onn Malaysia</CardDescription>
							</CardContent>
						</Card>
						<Card className="bg-yellow-50 border-neutral-500 border-b-4 border-x-0 border-t-0 shadow-md">
							<CardContent className="p-4">
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/9/95/UTHM_Logo.png?20221014163012"
									alt="logo"
									className="mx-auto h-20 w-20 md:h-32 md:w-32 mb-5"
								/>
								<CardTitle className="mb-3 text-xl md:text-2xl">
									Bachelor of Computer Science - Software Engineering
								</CardTitle>
								<CardDescription>Universiti Tun Hussein Onn Malaysia</CardDescription>
							</CardContent>
						</Card>
						<Card className="col-span-2 bg-yellow-50 border-neutral-500 border-b-4 border-x-0 border-t-0 shadow-md">
							<CardContent className="p-4">
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_Maktab_Rendah_Sains_MARA.png?20220826014551"
									alt="logo"
									className="mx-auto h-20 md:h-32 md:w-fit mb-5"
								/>
								<CardTitle className="mb-3 text-xl md:text-2xl">
									Mara Junior Science College Tun Ghafar Baba
								</CardTitle>
								<CardDescription>Science Stream</CardDescription>
							</CardContent>
						</Card>
					</div>
					<Card className="col-span-2 bg-amber-50 border-neutral-500 border-b-4 border-x-0 border-t-0 shadow-md mt-10">
						<CardHeader>
							<div className="flex justify-between">
								<CardTitle>Diploma Chart</CardTitle>
								<Select
									onValueChange={(value) => setSelectedValue(value as EducationLevel)}
								>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Diploma" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="degree">Degree</SelectItem>
										<SelectItem value="diploma">Diploma</SelectItem>
										<SelectItem value="secondary">Secondary School</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</CardHeader>
						<CardContent>
							<ChartContainer config={chartConfig}>
								<LineChart
									accessibilityLayer
									data={chartDataMap[selectedValue]}
									margin={{
										top: 20,
										left: 12,
										right: 12,
									}}
								>
									<CartesianGrid vertical={false} />
									<XAxis
										dataKey="sem"
										tickLine={false}
										axisLine={false}
										tickMargin={8}
										tickFormatter={(value) => `Sem ${value}`}
									/>
									<YAxis domain={[3.5, 4]} />
									<Tooltip />
									<Legend />
									<Line
										dataKey="GPA"
										type="monotone"
										stroke="var(--color-GPA)"
										strokeWidth={2}
										dot={{ r: 4 }}
									/>
									<Line
										dataKey="CPA"
										type="monotone"
										stroke="var(--color-CPA)"
										strokeWidth={2}
										dot={{ r: 4 }}
									/>
								</LineChart>
							</ChartContainer>
						</CardContent>
					</Card>
				</div>
			</section>
		</>
	);
}
