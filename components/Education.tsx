"use client";

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";
import {
	CartesianGrid,
	XAxis,
	YAxis,
	Legend,
	Area,
	AreaChart,
} from "recharts";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen } from "lucide-react";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "./ui/select";
import SectionHeader from "@/components/section-header";

import type { EducationData, EducationPointer } from "@/lib/education";

type Pointer = EducationPointer;
type EducationLevel = "diploma" | "bachelor" | "secondary";

const fetchData = async (
	selectedValue: EducationLevel,
): Promise<EducationData> => {
	const res = await fetch(`/api/education?level=${selectedValue}`);
	if (!res.ok) throw new Error("Failed to fetch data");
	return res.json();
};

const educationDetails = [
	{
		level: "bachelor",
		title: "Bachelor of Computer Science — Software Engineering",
		institution: "Universiti Tun Hussein Onn Malaysia (UTHM)",
		period: "2024 — 2026",
		note: "Ongoing · Final year",
		highlights: ["Software Engineering", "System Design", "Software Testing"],
	},
	{
		level: "diploma",
		title: "Diploma in Information Technology",
		institution: "Universiti Tun Hussein Onn Malaysia (UTHM)",
		period: "2021 — 2024",
		note: "Graduated",
		highlights: ["Software Development", "Database", "Web Technology"],
	},
	{
		level: "secondary",
		title: "Mara Junior Science College",
		institution: "Science Stream",
		period: "2017 — 2018",
		note: "SPM: 7A 2B",
		highlights: ["Mathematics", "Physics", "Chemistry"],
	},
];

export default function Education({
	initialData,
}: {
	initialData?: EducationData | null;
}) {
	const sectionRef = useRef<HTMLElement>(null);
	const sectionInView = useInView(sectionRef, { once:true, margin: "-10%" });

	const [selectedValue, setSelectedValue] = useState<EducationLevel>("bachelor");
	const [chartData, setChartData] = useState<Pointer[]>(initialData?.chart ?? []);
	const [isLoading, setIsLoading] = useState(!initialData);
	const [error, setError] = useState<string | null>(null);

	const loadedRef = useRef(false);

	const loadData = async () => {
		try {
			setIsLoading(true);
			setError(null);
			const res = await fetchData(selectedValue);
			setChartData(res.chart);
		} catch (err) {
			console.error(err);
			setError("Failed to load chart data");
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		// The default level is already server-rendered; only fetch when the
		// visitor switches level (or when no initial data was provided).
		if (!loadedRef.current && initialData) {
			loadedRef.current =true;
			return;
		}
		loadedRef.current =true;
		loadData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedValue]);

	const chartConfig = {
		GPA: { label: "GPA", color: "hsl(var(--ink))" },
		CPA: { label: "CPA", color: "hsl(var(--hover))" },
	} satisfies ChartConfig;

	const minGPA =
		chartData.length > 0 ? Math.min(...chartData.map((d) => d.GPA)) : 0;
	const yMin = Math.max(0, Math.floor(minGPA * 10) / 10 - 0.1);

	return (
		<section
			ref={sectionRef}
			id="education"
			className="relative border-t border-edge-strong/15 py-24 sm:py-28"
		>
			<div className="mx-auto max-w-[1400px] px-6 sm:px-10">
				<SectionHeader index="02" label="Academic" title="Education" variant="stacked" />

				{/* Timeline: left rule with ink dots, no boxes */}
				<ol className="mt-4">
					{educationDetails.map((edu, index) => (
						<motion.li
							key={edu.level}
							initial={{ opacity: 0, y: 14 }}
							animate={sectionInView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: index * 0.08, duration: 0.45 }}
							className="group relative grid grid-cols-1 gap-4 border-b border-edge-strong/10 py-7 md:grid-cols-[160px_1fr]"
						>
							{/* dot on the shared left rule */}
							<span
								aria-hidden="true"
								className={`absolute left-0 top-9 hidden h-2 w-2 -translate-x-[calc(50%+0.5px)] rounded-full transition-transform duration-300 group-hover:scale-150 md:block ${
									index === 0 ? "bg-accent" : "bg-foreground/30"
								}`}
							/>
							<div className="pl-0 md:pl-8">
								<p className="font-mono text-[12px] tracking-[0.06em] text-foreground">
									{edu.period}
								</p>
								<p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-dim">
									{edu.note}
								</p>
							</div>
							<div>
								<h3 className="font-display text-2xl leading-tight text-foreground">
									{edu.title}
								</h3>
								<p className="mt-1 text-[14px] text-ink-dim">{edu.institution}</p>
								<div className="mt-4 flex flex-wrap gap-2">
									{edu.highlights.map((h) => (
										<span
											key={h}
											className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-dim ring-hairline px-2.5 py-1"
										>
											{h}
										</span>
									))}
								</div>
							</div>
						</motion.li>
					))}
				</ol>

				{/* GPA chart */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={sectionInView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 0.3, duration: 0.45 }}
					className="mt-14"
				>
					<div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
						<div>
							<p className="eyebrow">Academic performance</p>
							<h3 className="mt-2 font-display text-2xl text-foreground">
								GPA &amp; CGPA over semesters
							</h3>
						</div>
						<Select
							value={selectedValue}
							onValueChange={(v) => setSelectedValue(v as EducationLevel)}
						>
							<SelectTrigger className="w-[160px] font-mono text-[12px] ring-hairline">
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
						<div className="flex h-[280px] items-center justify-center ring-hairline">
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
								className="h-7 w-7 rounded-full border border-edge-strong/20 border-t-foreground"
							/>
						</div>
					) : error ? (
						<div className="flex h-[280px] flex-col items-center justify-center gap-3 ring-hairline">
							<BookOpen className="h-7 w-7 text-ink-dim" />
							<p className="font-mono text-[12px] text-ink-dim">{error}</p>
							<button
								type="button"
								onClick={loadData}
								className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground link-underline"
							>
								Try again
							</button>
						</div>
					) : chartData.length === 0 ? (
						<div className="flex h-[280px] flex-col items-center justify-center gap-3 ring-hairline">
							<BookOpen className="h-7 w-7 text-ink-dim" />
							<p className="font-mono text-[12px] text-ink-dim">
								No academic results recorded yet.
							</p>
						</div>
					) : (
						<div className="h-[300px] w-full p-4 ring-hairline sm:p-6">
							<ChartContainer config={chartConfig} className="h-full w-full">
								<AreaChart
									accessibilityLayer
									data={chartData}
									margin={{ left: 12, right: 12, top: 16, bottom: 20 }}
								>
									<defs>
										<linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
											<stop offset="0%" stopColor="hsl(var(--ink))" stopOpacity={0.14} />
											<stop offset="100%" stopColor="hsl(var(--ink))" stopOpacity={0} />
										</linearGradient>
										<linearGradient id="cpaGradient" x1="0" y1="0" x2="0" y2="1">
											<stop offset="0%" stopColor="hsl(var(--hover))" stopOpacity={0.12} />
											<stop offset="100%" stopColor="hsl(var(--hover))" stopOpacity={0} />
										</linearGradient>
									</defs>
									<CartesianGrid vertical={false} stroke="hsl(var(--edge-strong) / 0.12)" />
									<XAxis
										dataKey="sem"
										tickLine={false}
										axisLine={false}
										tickMargin={8}
										tick={{
											fontFamily: "var(--font-mono)",
											fontSize: 10,
											fill: "hsl(var(--ink-dim))",
										}}
										tickFormatter={(value) => `S${value}`}
									/>
									<YAxis
										domain={[yMin, 4]}
										tickLine={false}
										axisLine={false}
										tickMargin={8}
										tick={{
											fontFamily: "var(--font-mono)",
											fontSize: 10,
											fill: "hsl(var(--ink-dim))",
										}}
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
										iconSize={8}
										wrapperStyle={{
											fontFamily: "var(--font-mono)",
											fontSize: 10,
											textTransform: "uppercase",
										}}
									/>
									<Area
										type="monotone"
										dataKey="GPA"
										stroke="var(--color-GPA)"
										strokeWidth={2}
										fill="url(#gpaGradient)"
										dot={false}
									/>
									<Area
										type="monotone"
										dataKey="CPA"
										stroke="var(--color-CPA)"
										strokeWidth={2}
										fill="url(#cpaGradient)"
										dot={false}
										strokeDasharray="4 3"
									/>
								</AreaChart>
							</ChartContainer>
						</div>
					)}
				</motion.div>
			</div>
		</section>
	);
}
