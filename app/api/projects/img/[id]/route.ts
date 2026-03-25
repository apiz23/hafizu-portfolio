import supabase from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	context: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await context.params;

		// 👉 build path inside bucket
		const filePath = `img-project/${id}.png`;

		// 👉 get public URL
		const { data } = supabase.storage.from("portfolio").getPublicUrl(filePath);

		return NextResponse.json({
			url: data.publicUrl,
			path: filePath,
		});
	} catch (err: any) {
		return NextResponse.json(
			{ error: err.message || "Failed to get image URL" },
			{ status: 500 },
		);
	}
}
