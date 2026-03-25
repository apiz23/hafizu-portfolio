import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET(
	req: NextRequest,
	context: { params: Promise<{ id: string }> },
) {
	const { id } = await context.params;

	const { data, error } = await supabase
		.from("projects")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json(data);
}

export async function DELETE(
	req: NextRequest,
	context: { params: Promise<{ id: string }> },
) {
	const { id } = await context.params;

	const { error } = await supabase.from("projects").delete().eq("id", id);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ success: true });
}
