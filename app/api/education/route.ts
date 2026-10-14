import { NextResponse } from "next/server";
import { getEducationData } from "@/lib/education";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const level = searchParams.get("level");

	if (!level) {
		return NextResponse.json(
			{ error: "Education level is required" },
			{ status: 400 },
		);
	}

	try {
		return NextResponse.json(await getEducationData(level));
	} catch (err: any) {
		return NextResponse.json(
			{ error: err.message || "Failed to fetch data" },
			{ status: 500 },
		);
	}
}
