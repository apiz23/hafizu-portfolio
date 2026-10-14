import supabase from "@/lib/supabase";

export type EducationPointer = { sem: number; GPA: number; CPA: number };

export type EducationData = {
	chart: EducationPointer[];
	latestCGPA: number | null;
};

/**
 * Academic performance series for a given level. Shared by the API route and
 * the server-rendered homepage so the first paint already contains the chart
 * instead of a loading spinner.
 */
export async function getEducationData(level: string): Promise<EducationData> {
	const { data, error } = await supabase
		.from("pointer")
		.select("sem, gpa, cgpa, education_level")
		.eq("education_level", level)
		.order("sem", { ascending:true });

	if (error) throw error;

	const chart = (data ??[]).map((row) => ({
		sem: Number(row.sem),
		GPA: Number(row.gpa),
		CPA: Number(row.cgpa),
	}));

	return { chart, latestCGPA: chart.at(-1)?.CPA ?? null };
}
