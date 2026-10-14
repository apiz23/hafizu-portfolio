import { OG_SIZES, renderOgCard, type OgSizeKey } from "@/lib/og-card";

export const runtime = "nodejs";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("size") as OgSizeKey | null;
  const dims = (key && OG_SIZES[key]) || OG_SIZES.wide;

  return renderOgCard(dims.width, dims.height);
}
