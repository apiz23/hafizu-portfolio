"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen } from "lucide-react";
import { fadeUp, clipReveal } from "@/lib/animations";
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

const fetchData = async (selectedValue: EducationLevel): Promise<EducationResponse> => {
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
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const h2InView = useInView(h2Ref, { once: true, margin: "-10%" });
  const rowsRef = useRef<HTMLDivElement>(null);
  const rowsInView = useInView(rowsRef, { once: true });
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInView = useInView(chartRef, { once: true });

  const [selectedValue, setSelectedValue] = useState<EducationLevel>("bachelor");
  const [latestCGPA, setLatestCGPA] = useState<number | null>(null);
  const [chartData, setChartData] = useState<Pointer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trend, setTrend] = useState<{ value: string; direction: "up" | "down" }>({
    value: "0%",
    direction: "up",
  });

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
    GPA: { label: "GPA", color: "hsl(var(--chart-1))" },
    CPA: { label: "CPA", color: "hsl(var(--chart-2))" },
  } satisfies ChartConfig;

  const minGPA = chartData.length > 0 ? Math.min(...chartData.map((d) => d.GPA)) : 0;
  const yMin = Math.max(0, Math.floor(minGPA * 10) / 10 - 0.1);

  return (
    <section id="education" className="py-14 bg-background border-t border-[#e8e8e8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 w-full">

        <motion.h2
          ref={h2Ref}
          variants={clipReveal}
          initial="hidden"
          animate={h2InView ? "visible" : "hidden"}
          className="font-serif font-black uppercase tracking-[-0.04em] text-foreground mb-10"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          EDUCATION
        </motion.h2>

        {/* Timeline rows */}
        <div ref={rowsRef}>
        {educationDetails.map((edu, index) => (
          <motion.div
            key={edu.level}
            custom={index}
            variants={fadeUp}
            initial="hidden"
            animate={rowsInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 border-t border-[#e8e8e8] py-5"
          >
            <div className="pt-0.5">
              <p className="font-mono text-[12px] text-muted-foreground">{edu.period}</p>
              <p className="font-mono text-[15px] text-muted-foreground/70 mt-0.5">{edu.note}</p>
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-foreground mb-1">{edu.title}</h3>
              <p className="font-mono text-[12px] text-muted-foreground mb-3">{edu.institution}</p>
              <div className="flex flex-wrap gap-1.5">
                {edu.highlights.map((h) => (
                  <span
                    key={h}
                    className="font-mono text-[15px] text-muted-foreground border border-[#e8e8e8] px-2 py-0.5 rounded-[2px]"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
        </div>

        <div className="border-t border-[#e8e8e8] mb-12" />

        {/* GPA Chart */}
        <motion.div
          ref={chartRef}
          initial={{ opacity: 0, y: 12 }}
          animate={chartInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <p className="font-mono text-[15px] uppercase tracking-[0.1em] text-muted-foreground mb-1">
                Academic Performance
              </p>
              <h3 className="text-[20px] font-semibold text-foreground">GPA over semesters</h3>
            </div>
            <Select
              value={selectedValue}
              onValueChange={(value) => setSelectedValue(value as EducationLevel)}
            >
              <SelectTrigger className="w-[160px] rounded-[3px] border-[#e8e8e8] font-mono text-[15px]">
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
            <div className="h-[280px] flex items-center justify-center border border-[#e8e8e8] rounded-[6px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="h-8 w-8 rounded-full border-2 border-[#e8e8e8] border-t-[#111]"
              />
            </div>
          ) : error ? (
            <div className="h-[280px] flex flex-col items-center justify-center gap-3 text-muted-foreground border border-[#e8e8e8] rounded-[6px]">
              <BookOpen className="h-8 w-8" />
              <p className="font-mono text-[15px]">Failed to load chart data</p>
            </div>
          ) : (
            <>
              <div className="h-[280px] w-full border border-[#e8e8e8] rounded-[6px] p-4">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <LineChart
                    accessibilityLayer
                    data={chartData}
                    margin={{ left: 12, right: 12, top: 16, bottom: 20 }}
                  >
                    <CartesianGrid vertical={false} stroke="#f0f0f0" />
                    <XAxis
                      dataKey="sem"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tick={{ fontFamily: "var(--font-mono)", fontSize: 10, fill: "#888" }}
                      label={{ value: "Semester", position: "insideBottom", offset: -10, style: { fontFamily: "var(--font-mono)", fontSize: 10, fill: "#888" } }}
                      tickFormatter={(value) => `Sem ${value}`}
                    />
                    <YAxis
                      dataKey="GPA"
                      domain={[yMin, 4]}
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tick={{ fontFamily: "var(--font-mono)", fontSize: 10, fill: "#888" }}
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
                      wrapperStyle={{ fontFamily: "var(--font-mono)", fontSize: 10 }}
                    />
                    <Line dataKey="GPA" type="monotone" stroke="var(--color-GPA)" strokeWidth={1.5} dot={false} />
                    <Line dataKey="CPA" type="monotone" stroke="var(--color-CPA)" strokeWidth={1.5} dot={false} />
                  </LineChart>
                </ChartContainer>
              </div>
              {chartData.length > 0 && (
                <p className="font-mono text-[12px] text-muted-foreground mt-2">
                  Trending {trend.direction} by {trend.value} · {chartData.length} semesters recorded
                </p>
              )}
            </>
          )}
        </motion.div>

      </div>
    </section>
  );
}
