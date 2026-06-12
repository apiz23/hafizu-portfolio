"use client";

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, BookOpen } from "lucide-react";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "./ui/select";

type Pointer = { sem: number; GPA: number; CPA: number };
type EducationLevel = "diploma" | "bachelor" | "secondary";
type EducationResponse = { chart: Pointer[]; latestCGPA: number | null };

const fetchData = async (
	selectedValue: EducationLevel,
): Promise<EducationResponse> => {
	const res = await fetch(`/api/education?level=${selectedValue}`);
	if (!res.ok) throw new Error("Failed to fetch data");
	return res.json();
};

const educationDetails = [
	{
		level: "bachelor",
		title: "Bachelor of Computer Science — Software Engineering",
		institution: "Universiti Tun Hussein Onn Malaysia (UTHM)",
		period: "2024 – 2026",
		note: "Ongoing · Final year",
		highlights: ["Software Engineering", "System Design", "Software Testing"],
	},
	{
		level: "diploma",
		title: "Diploma in Information Technology",
		institution: "Universiti Tun Hussein Onn Malaysia (UTHM)",
		period: "2021 – 2024",
		note: "Graduated",
		highlights: ["Software Development", "Database", "Web Technology"],
	},
	{
		level: "secondary",
		title: "Mara Junior Science College",
		institution: "Science Stream",
		period: "2017 – 2018",
		note: "SPM: 7A 2B",
		highlights: ["Mathematics", "Physics", "Chemistry"],
	},
];

export default function Education() {
	const [selectedValue, setSelectedValue] =
		useState<EducationLevel>("bachelor");
	const [latestCGPA, setLatestCGPA] = useState<number | null>(null);
	const [chartData, setChartData] = useState<Pointer[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [trend, setTrend] = useState<{
		value: string;
		direction: "up" | "down";
	}>({ value: "0%", direction: "up" });

	useEffect(() => {
		const loadData = async () => {
			try {
				setIsLoading(true);
				setError(null);
				const res = await fetchData(selectedValue);
				setChartData(res.chart);
				setLatestCGPA(res.latestCGPA);
				if (res.chart.length >= 2) {
					const lastTwo = res.chart.slice(-2);
					const diff = lastTwo[1].GPA - lastTwo[0].GPA;
					const percent = ((diff / lastTwo[0].GPA) * 100).toFixed(1);
					setTrend({
						value: `${Math.abs(Number(percent))}%`,
						direction: diff >= 0 ? "up" : "down",
					});
				}
			} catch (err) {
				console.error(err);
				setError("Failed to load data");
			} finally {
				setIsLoading(false);
			}
		};
		loadData();
	}, [selectedValue]);

	const chartConfig = {
		GPA: { label: "GPA", color: "var(--chart-1)" },
		CPA: { label: "CPA", color: "var(--chart-2)" },
	} satisfies ChartConfig;

	const minGPA =
		chartData.length > 0 ? Math.min(...chartData.map((d) => d.GPA)) : 0;
	const yMin = Math.max(0, Math.floor(minGPA * 10) / 10 - 0.1);

	return (
		<section id="education" className="py-20 md:py-32 bg-background">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground mb-16"
				>
					EDUCATION
				</motion.h2>

				{/* Education entries */}
				{educationDetails.map((edu, index) => (
					<motion.div
						key={edu.level}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: index * 0.08 }}
						className="group border-t border-foreground/10 py-8 hover:bg-primary/[0.02] transition-colors -mx-4 px-4 sm:-mx-6 sm:px-6"
					>
						<div className="grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-4 items-start">
							{/* Left: period */}
							<div>
								<p className="font-mono text-sm text-muted-foreground">
									{edu.period}
								</p>
								<p className="text-xs text-muted-foreground/70 mt-1">
									{edu.note}
								</p>
							</div>

							{/* Center: title + institution */}
							<div>
								<h3 className="text-lg font-bold text-foreground mb-1">
									{edu.title}
								</h3>
								<p className="text-sm text-muted-foreground mb-4">
									{edu.institution}
								</p>
								<div className="flex flex-wrap gap-1.5">
									{edu.highlights.map((h) => (
										<span
											key={h}
											className="text-xs font-mono bg-muted/60 text-muted-foreground px-2 py-0.5 rounded"
										>
											{h}
										</span>
									))}
								</div>
							</div>

							{/* Right: CGPA for bachelor/diploma */}
							{(edu.level === "bachelor" || edu.level === "diploma") && (
								<div className="text-right shrink-0">
									<p className="text-xs uppercase tracking-widest text-muted-foreground">
										CGPA
									</p>
									<p className="text-2xl font-black text-foreground font-mono">
										{selectedValue === edu.level && latestCGPA
											? latestCGPA.toFixed(2)
											: "—"}
									</p>
								</div>
							)}
						</div>
					</motion.div>
				))}

				<div className="border-t border-foreground/10 mb-16" />

				{/* Performance Chart */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2 }}
				>
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
						<div>
							<p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
								Academic Performance
							</p>
							<h3 className="text-2xl font-bold text-foreground">
								GPA over semesters
							</h3>
						</div>
						<Select
							value={selectedValue}
							onValueChange={(value) =>
								setSelectedValue(value as EducationLevel)
							}
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Select level" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="bachelor">Bachelor</SelectItem>
								<SelectItem value="diploma">Diploma</SelectItem>
								<SelectItem value="secondary">Secondary</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{isLoading ? (
						<div className="h-[320px] flex items-center justify-center">
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
								className="rounded-full h-10 w-10 border-2 border-primary/30 border-t-primary"
							/>
						</div>
					) : error ? (
						<div className="h-[320px] flex flex-col items-center justify-center gap-3 text-muted-foreground">
							<BookOpen className="h-10 w-10" />
							<p className="text-sm">Failed to load chart data</p>
						</div>
					) : (
						<>
							<div className="h-[320px] w-full border border-border rounded-lg p-4">
								<ChartContainer config={chartConfig} className="h-full w-full">
									<LineChart
										accessibilityLayer
										data={chartData}
										margin={{ left: 12, right: 12, top: 16, bottom: 20 }}
									>
										<CartesianGrid vertical={false} />
										<XAxis
											dataKey="sem"
											tickLine={false}
											axisLine={false}
											tickMargin={8}
											label={{
												value: "Semester",
												position: "insideBottom",
												offset: -10,
											}}
											tickFormatter={(value) => `Sem ${value}`}
										/>
										<YAxis
											dataKey="GPA"
											domain={[yMin, 4]}
											tickLine={false}
											axisLine={false}
											tickMargin={8}
											tickFormatter={(value) => value.toFixed(2)}
										/>
										<ChartTooltip
											cursor={false}
											content={<ChartTooltipContent indicator="line" />}
										/>
										<Legend
											verticalAlign="top"
											height={36}
											iconType="circle"
											iconSize={10}
										/>
										<Line
											dataKey="GPA"
											type="monotone"
											stroke="var(--color-GPA)"
											strokeWidth={2}
											dot={false}
										/>
										<Line
											dataKey="CPA"
											type="monotone"
											stroke="var(--color-CPA)"
											strokeWidth={2}
											dot={false}
										/>
									</LineChart>
								</ChartContainer>
							</div>
							{chartData.length > 0 && (
								<p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
									<TrendingUp className="h-3.5 w-3.5" />
									Trending {trend.direction} by {trend.value} this semester ·{" "}
									{chartData.length} semesters recorded
								</p>
							)}
						</>
					)}
				</motion.div>
			</div>
		</section>
	);
}
