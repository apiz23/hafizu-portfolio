import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const level = searchParams.get("level");

	if (!level) {
		return NextResponse.json(
			{ error: "Education level is required" },
			{ status: 400 }
		);
	}

	const { data, error } = await supabase
		.from("pointer")
		.select("*")
		.eq("education_level", level);

	if (error) {
		return NextResponse.json(
			{ error: error.message },
			{ status: 500 }
		);
	}

	const formatted = data.map(({ sem, gpa, cgpa }) => ({
		sem,
		GPA: gpa,
		CPA: cgpa,
	}));

	return NextResponse.json(formatted);
}
