"use client";
import { useEffect, useRef, useState } from "react";
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
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import supabase from "@/lib/supabase";
import { useQuery } from "react-query";
import { TextAnimate } from "./ui/text-animate";

type EducationLevel = "diploma" | "degree" | "secondary";

const fetchData = async (selectedValue: EducationLevel) => {
	const { data, error } = await supabase
		.from("pointer")
		.select("*")
		.eq("education_level", selectedValue);

	if (error) {
		throw new Error(`Error fetching data: ${error.message}`);
	}

	return data.map(({ sem, gpa, cgpa }) => ({
		sem,
		GPA: gpa,
		CPA: cgpa,
	}));
};

export default function Education() {
	const [selectedValue, setSelectedValue] = useState<EducationLevel>("diploma");
	const { data: chartData = [], error } = useQuery(
		["chartData", selectedValue],
		() => fetchData(selectedValue),
		{
			onError: (error) => {
				console.error("Error fetching data:", error);
			},
		}
	);

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
				<div className="text-center">
					<TextAnimate
						animation="slideUp"
						by="word"
						className="scroll-m-20 text-5xl uppercase font-extrabold tracking-tight md:text-[12vh]"
					>
						Education
					</TextAnimate>
				</div>
				<div className="max-w-3xl mx-auto mt-10 md:px-0 px-2">
					<div className="grid grid-cols-2 gap-6 mb-5">
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
								<CardTitle>{`${
									selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)
								} Chart`}</CardTitle>
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
									data={chartData}
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
