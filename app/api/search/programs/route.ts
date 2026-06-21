import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const id = getClientIdentifier(req);
  const { allowed, retryAfter } = checkRateLimit(id, 60, 60_000); // 60 req / 60s

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests, please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter ?? 60),
        },
      }
    );
  }

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase
    .from("programs")
    .select("id, title, level, institutions(name)")
    .ilike("title", `%${q}%`)
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    {
      data: (data || []).map((p) => ({
        id: p.id,
        title: p.title,
        level: p.level,
        institution_name: p.institutions?.name ?? null,
      })),
    },
    {
      // CDN caching (Vercel / edge)
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    }
  );
}