import supabase from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

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
