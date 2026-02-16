import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const level = searchParams.get("level");

	if (!level) {
		return NextResponse.json(
			{ error: "Education level is required" },
			{ status: 400 },
		);
	}

	const { data, error } = await supabase
		.from("pointer")
		.select("sem, gpa, cgpa, education_level")
		.eq("education_level", level)
		.order("sem", { ascending: true });

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	const formatted = data.map((row) => ({
		sem: Number(row.sem),
		GPA: Number(row.gpa),
		CPA: Number(row.cgpa),
	}));

	const latest = formatted.at(-1);

	return NextResponse.json({
		chart: formatted,
		latestCGPA: latest?.CPA ?? null,
	});
}
