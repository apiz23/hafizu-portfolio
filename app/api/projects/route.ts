import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const github_link = formData.get("github_link") as string;
    const visit_link = formData.get("visit_link") as string;
    const category = formData.get("category") as string;
    const year = formData.get("year") as string;
    const featured = formData.get("featured") === "true";
    const badgesRaw = formData.get("badges") as string;

    const file = formData.get("file") as File | null;

    let imageUrl = "";

    if (file) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(`img-project/${fileName}`, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("portfolio")
        .getPublicUrl(`img-project/${fileName}`);

      imageUrl = data.publicUrl;
    }

    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          title,
          description,
          github_link,
          visit_link,
          category,
          year,
          featured,
          image_src: imageUrl,
          badges: badgesRaw ? badgesRaw.split(",").map((b) => b.trim()) : [],
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
