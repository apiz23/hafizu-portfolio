"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import { TextAnimate } from "./ui/text-animate";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
	GraduationCap,
	TrendingUp,
	Award,
	BookOpen,
	Sparkles,
	Star,
	Rocket,
	Brain,
	Target,
	Clock,
	MapPin,
	Calendar,
} from "lucide-react";
import { Badge } from "./ui/badge";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "./ui/select";

type EducationLevel = "diploma" | "bachelor" | "secondary";

const fetchData = async (selectedValue: EducationLevel) => {
	const res = await fetch(`/api/education?level=${selectedValue}`);

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
};

export default function Education() {
	const [selectedValue, setSelectedValue] = useState<EducationLevel>("diploma");
	const [chartData, setChartData] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [trend, setTrend] = useState<{
		value: string;
		direction: "up" | "down";
	}>({
		value: "0%",
		direction: "up",
	});

	useEffect(() => {
		const loadData = async () => {
			try {
				setIsLoading(true);
				setError(null);

				const data = await fetchData(selectedValue);
				setChartData(data);

				// Calculate trend
				if (data.length >= 2) {
					const lastTwo = data.slice(-2);
					const diff = lastTwo[1].GPA - lastTwo[0].GPA;
					const percentChange = ((diff / lastTwo[0].GPA) * 100).toFixed(1);
					setTrend({
						value: `${Math.abs(Number(percentChange))}%`,
						direction: diff >= 0 ? "up" : "down",
					});
				}
			} catch (err: any) {
				console.error(err);
				setError("Failed to load data");
			} finally {
				setIsLoading(false);
			}
		};

		loadData();
	}, [selectedValue]);

	const chartConfig = {
		GPA: {
			label: "GPA",
			color: "var(--chart-1)",
		},
		CPA: {
			label: "CPA",
			color: "var(--chart-2)",
		},
	} satisfies ChartConfig;

	const educationDetails = [
		{
			level: "Diploma",
			title: "Diploma In Information Technology",
			institution: "Universiti Tun Hussein Onn Malaysia",
			period: "2021-2023",
			achievement: "CGPA: 3.92",
			logo:
				"https://images.seeklogo.com/logo-png/14/1/universiti-tun-hussein-onn-malaysia-logo-png_seeklogo-145927.png",
			description:
				"Foundation in IT with focus on software development and database management",
			highlights: [
				"Software Development",
				"Database Management",
				"Web Technologies",
			],
			color: "from-blue-500/20 to-cyan-500/20",
			icon: <Brain className="h-5 w-5" />,
		},
		{
			level: "Bachelor",
			title: "Bachelor of Computer Science - Software Engineering",
			institution: "Universiti Tun Hussein Onn Malaysia",
			period: "2024-2026",
			achievement: "Current CGPA: 3.84",
			logo:
				"https://images.seeklogo.com/logo-png/14/1/universiti-tun-hussein-onn-malaysia-logo-png_seeklogo-145927.png",
			description:
				"Advanced software engineering principles, agile methodologies, and system architecture",
			highlights: [
				"Software Architecture",
				"Agile Methodologies",
				"System Design",
			],
			color: "from-purple-500/20 to-pink-500/20",
			icon: <Rocket className="h-5 w-5" />,
		},
		{
			level: "Secondary",
			title: "Mara Junior Science College Tun Ghafar Baba",
			institution: "Science Stream",
			period: "2017-2018",
			achievement: "SPM: 8A",
			logo:
				"https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_Maktab_Rendah_Sains_MARA.png",
			description:
				"Pure science with mathematics, physics, chemistry, and biology",
			highlights: ["Pure Science", "Mathematics", "Physics", "Chemistry"],
			color: "from-green-500/20 to-emerald-500/20",
			icon: <Target className="h-5 w-5" />,
		},
	];

	const stats = [
		{
			value: "3.92",
			label: "Diploma CGPA",
			icon: <Star className="h-4 w-4" />,
			color: "text-blue-500",
		},
		{
			value: "3.84",
			label: "Bachelor CGPA",
			icon: <Star className="h-4 w-4" />,
			color: "text-purple-500",
		},
		{
			value: "8A",
			label: "SPM Achievement",
			icon: <Award className="h-4 w-4" />,
			color: "text-green-500",
		},
	];

	return (
		<section
			id="education"
			className="relative py-20 md:py-32 bg-background overflow-hidden"
		>
			<div className="container mx-auto px-4 relative z-10">
				{/* Header Section - Improved visibility */}
				<div className="text-center mb-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<Badge
							variant="outline"
							className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 text-primary border-primary/30 mb-6 hover:scale-105 transition-transform backdrop-blur-sm"
						>
							<GraduationCap className="h-5 w-5 animate-pulse" />
							<span className="text-sm font-medium tracking-wide text-primary">
								Academic Journey
							</span>
							<Sparkles className="h-4 w-4 text-accent animate-spin-slow" />
						</Badge>
					</motion.div>

					{/* EDUCATION text - Fixed visibility for dark mode */}
					<div className="relative mb-6">
						<TextAnimate
							animation="slideUp"
							by="word"
							className="scroll-m-20 text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter"
						>
							Education
						</TextAnimate>

						{/* Glow effect */}
						<div className="absolute inset-0 -z-10 blur-3xl opacity-50">
							<div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full" />
						</div>
					</div>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2, duration: 0.5 }}
						className="text-muted-foreground mt-6 text-lg max-w-2xl mx-auto tracking-wide"
					>
						My academic journey and achievements throughout the years
					</motion.p>
				</div>

				<div className="max-w-7xl mx-auto">
					{/* Education Cards Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
						{educationDetails.map((edu, index) => (
							<motion.div
								key={edu.level}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1, duration: 0.5 }}
								viewport={{ once: true }}
								whileHover={{ y: -8, scale: 1.02 }}
								className="h-full group"
							>
								<Card className="relative h-full bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 rounded-lg overflow-hidden">
									{/* Gradient Overlay */}
									<div
										className={`absolute inset-0 bg-gradient-to-br ${edu.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
									/>

									{/* Animated Border */}
									<div className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-r from-primary/50 via-secondary/50 to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

									<CardContent className="relative p-6 flex flex-col h-full z-10">
										{/* Logo and Period */}
										<div className="flex items-start justify-between mb-4">
											<motion.div
												whileHover={{ rotate: 360 }}
												transition={{ duration: 0.5 }}
												className="h-16 w-16 relative p-2 bg-white rounded-xl border border-border/50 shadow-lg group-hover:shadow-primary/20"
											>
												<img
													src={edu.logo}
													alt={edu.institution}
													className="object-contain h-full w-full"
												/>
											</motion.div>
											<Badge
												variant="outline"
												className="bg-gradient-to-r from-secondary/20 to-secondary/5 text-secondary border-secondary/30 hover:bg-secondary/20 backdrop-blur-sm"
											>
												<Calendar className="h-3 w-3 mr-1" />
												{edu.period}
											</Badge>
										</div>

										{/* Title and Institution */}
										<div className="flex-1">
											<div className="flex items-center gap-2 mb-2">
												<span className="text-primary">{edu.icon}</span>
												<CardTitle className="text-lg md:text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors tracking-tight text-foreground">
													{edu.title}
												</CardTitle>
											</div>
											<CardDescription className="text-sm mb-3 font-medium flex items-center gap-1 text-muted-foreground">
												<MapPin className="h-3 w-3" />
												{edu.institution}
											</CardDescription>
											<p className="text-sm text-muted-foreground/80 mb-4 line-clamp-2">
												{edu.description}
											</p>

											{/* Highlights */}
											<div className="flex flex-wrap gap-2 mb-4">
												{edu.highlights.map((highlight, i) => (
													<Badge
														key={i}
														variant="secondary"
														className="bg-secondary/20 text-secondary border-secondary/30 text-xs backdrop-blur-sm"
													>
														{highlight}
													</Badge>
												))}
											</div>
										</div>

										{/* Achievement */}
										<motion.div
											whileHover={{ scale: 1.05 }}
											className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 p-[2px] rounded-md"
										>
											<div className="flex items-center gap-2 w-full bg-card/80 backdrop-blur-sm rounded-md px-3 py-2">
												<Award className="h-4 w-4 text-primary" />
												<span className="text-primary">{edu.achievement}</span>
											</div>
										</motion.div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>

					{/* Performance Chart */}
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<Card className="relative bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-sm border-2 border-border/50 shadow-lg hover:shadow-xl hover:border-primary/20 transition-all duration-500 rounded-lg overflow-hidden">
							{/* Animated gradient background */}
							<div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 animate-gradient-x" />

							<CardHeader className="relative pb-6 border-b border-border/50 bg-gradient-to-r from-background/30 to-transparent backdrop-blur-sm">
								<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
									<div>
										<div className="flex items-center gap-3 mb-2">
											<motion.div
												whileHover={{ rotate: 360 }}
												transition={{ duration: 0.5 }}
												className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg"
											>
												<TrendingUp className="h-5 w-5" />
											</motion.div>
											<div>
												<CardTitle className="text-2xl font-bold tracking-tight text-foreground">
													{`${selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)} Performance`}
												</CardTitle>
												<CardDescription className="text-base text-muted-foreground flex items-center gap-2">
													<Clock className="h-4 w-4" />
													Academic progress over semesters
												</CardDescription>
											</div>
										</div>
									</div>
									<Select
										value={selectedValue}
										onValueChange={(value) => setSelectedValue(value as EducationLevel)}
									>
										<SelectTrigger className="w-full sm:w-[220px] bg-gradient-to-r from-background/80 to-background/40 backdrop-blur-sm border-border/50 focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:ring-offset-background">
											<SelectValue placeholder="Select education level" />
										</SelectTrigger>
										<SelectContent className="bg-popover/95 backdrop-blur-sm border-border/50 shadow-lg">
											<SelectItem
												value="bachelor"
												className="focus:bg-gradient-to-r focus:from-primary/20 focus:to-secondary/20 focus:text-accent-foreground"
											>
												<div className="flex items-center gap-2">
													<span>🎓</span> Bachelor Program
												</div>
											</SelectItem>
											<SelectItem
												value="diploma"
												className="focus:bg-gradient-to-r focus:from-primary/20 focus:to-secondary/20 focus:text-accent-foreground"
											>
												<div className="flex items-center gap-2">
													<span>📚</span> Diploma Program
												</div>
											</SelectItem>
											<SelectItem
												value="secondary"
												className="focus:bg-gradient-to-r focus:from-primary/20 focus:to-secondary/20 focus:text-accent-foreground"
											>
												<div className="flex items-center gap-2">
													<span>🏫</span> Secondary School
												</div>
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardHeader>

							<CardContent className="relative pt-6">
								{isLoading ? (
									<div className="h-[400px] flex flex-col items-center justify-center gap-4">
										<motion.div
											animate={{ rotate: 360 }}
											transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
											className="rounded-full h-16 w-16 border-4 border-primary/30 border-t-primary border-r-secondary border-b-accent"
										/>
										<motion.p
											animate={{ opacity: [0.5, 1, 0.5] }}
											transition={{ duration: 1.5, repeat: Infinity }}
											className="text-primary tracking-wide font-medium"
										>
											Loading chart data...
										</motion.p>
									</div>
								) : error ? (
									<div className="h-[400px] flex flex-col items-center justify-center gap-4">
										<div className="text-destructive animate-bounce">
											<BookOpen className="h-16 w-16" />
										</div>
										<p className="text-destructive font-medium tracking-wide">
											Failed to load chart data
										</p>
										<p className="text-sm text-muted-foreground">
											Please try again later
										</p>
									</div>
								) : (
									<div className="h-[400px] w-full bg-">
										<ChartContainer config={chartConfig} className="h-full w-full">
											<LineChart
												accessibilityLayer
												data={chartData}
												margin={{
													left: 12,
													right: 12,
													top: 20,
													bottom: 20,
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
												<YAxis
													dataKey="GPA"
													domain={[3.0, 4.0]}
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
													wrapperStyle={{
														paddingTop: "10px",
													}}
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
								)}
							</CardContent>

							{!isLoading && !error && chartData.length > 0 && (
								<CardFooter className="relative border-t border-border/50 pt-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 backdrop-blur-sm">
									<div className="flex w-full items-start gap-2 text-sm">
										<div className="grid gap-2">
											<motion.div
												initial={{ x: -20, opacity: 0 }}
												animate={{ x: 0, opacity: 1 }}
												transition={{ duration: 0.5 }}
												className="flex items-center gap-2 leading-none font-medium"
											>
												<span className="text-foreground">
													{trend.direction === "up" ? "📈 Trending up" : "📉 Trending down"}
												</span>{" "}
												by <span className="text-primary font-bold">{trend.value}</span>{" "}
												this semester
												<motion.div
													animate={{ y: [0, -3, 0] }}
													transition={{ duration: 1.5, repeat: Infinity }}
												>
													<TrendingUp
														className={`h-4 w-4 ${trend.direction === "down" ? "rotate-180 text-destructive" : "text-primary"}`}
													/>
												</motion.div>
											</motion.div>
											<div className="text-muted-foreground flex items-center gap-2 leading-none">
												<Sparkles className="h-3 w-3 text-accent" />
												Showing academic performance for {selectedValue} program over{" "}
												<span className="text-foreground font-semibold">
													{chartData.length}
												</span>{" "}
												semesters
											</div>
										</div>
									</div>
								</CardFooter>
							)}
						</Card>
					</motion.div>

					{/* Academic Summary */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.3, duration: 0.5 }}
						className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4"
					>
						{stats.map((stat, index) => (
							<motion.div
								key={index}
								whileHover={{ scale: 1.05, y: -5 }}
								whileTap={{ scale: 0.95 }}
								className="group relative overflow-hidden"
							>
								<div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md" />
								<div className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 rounded-md p-4 text-center">
									<div
										className={`flex items-center justify-center gap-2 mb-2 ${stat.color}`}
									>
										{stat.icon}
										<div className="text-3xl font-bold text-foreground">{stat.value}</div>
									</div>
									<p className="text-sm text-muted-foreground tracking-wide">
										{stat.label}
									</p>
									<div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-secondary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
