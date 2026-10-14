import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import { isAuthorized } from "@/lib/admin-auth";

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
	if (!(await isAuthorized(req))) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { id } = await context.params;

	const { error } = await supabase.from("projects").delete().eq("id", id);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ success: true });
}

export async function PATCH(
	req: NextRequest,
	context: { params: Promise<{ id: string }> },
) {
	if (!(await isAuthorized(req))) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { id } = await context.params;

	try {
		const contentType = req.headers.get("content-type") || "";
		const values: Record<string, any> = {};

		if (contentType.includes("multipart/form-data")) {
			const formData = await req.formData();

			const str = (k: string) => formData.get(k) as string | null;

			const title = str("title");
			const description = str("description");
			const github_link = str("github_link");
			const visit_link = str("visit_link");
			const category = str("category");
			const year = str("year");
			const featured = str("featured");
			const badgesRaw = str("badges");
			const file = formData.get("file") as File | null;

			if (title !== null) values.title = title;
			if (description !== null) values.description = description;
			if (github_link !== null) values.github_link = github_link;
			if (visit_link !== null) values.visit_link = visit_link;
			if (category !== null) values.category = category;
			if (year !== null) values.year = year;
			if (featured !== null) values.featured = featured === "true";
			if (badgesRaw !== null) {
				values.badges = badgesRaw
					.split(",")
					.map((b) => b.trim())
					.filter(Boolean);
			}

			if (file && file.size > 0) {
				const fileExt = file.name.split(".").pop() || "png";
				const fileName = `${crypto.randomUUID()}.${fileExt}`;

				const { error: uploadError } = await supabase.storage
					.from("portfolio")
					.upload(`img-project/${fileName}`, file);

				if (uploadError) throw uploadError;

				const { data } = supabase.storage
					.from("portfolio")
					.getPublicUrl(`img-project/${fileName}`);

				values.image_src = data.publicUrl;
			}
		} else {
			const body = await req.json();
			const allowed = [
				"title",
				"description",
				"github_link",
				"visit_link",
				"category",
				"year",
				"featured",
				"image_src",
				"badges",
			];
			for (const k of allowed) {
				if (k in body) values[k] = body[k];
			}
		}

		if (Object.keys(values).length === 0) {
			return NextResponse.json(
				{ error: "No fields to update" },
				{ status: 400 },
			);
		}

		const { data, error } = await supabase
			.from("projects")
			.update(values)
			.eq("id", id)
			.select()
			.single();

		if (error) throw error;

		return NextResponse.json(data);
	} catch (err: any) {
		return NextResponse.json(
			{ error: err.message || "Failed to update project" },
			{ status: 500 },
		);
	}
}
