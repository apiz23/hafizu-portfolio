import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { name: string } },
) {
  try {
    const fileName = params.name;

    // 👉 build path inside bucket
    const filePath = `img-project/${fileName}.png`;

    // 👉 get public URL
    const { data } = supabase.storage
      .from("portfolio") // bucket name
      .getPublicUrl(filePath);

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
