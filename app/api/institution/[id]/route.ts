import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(req: Request, context: any) {
  const id = getClientIdentifier(req);
  const { allowed, retryAfter } = checkRateLimit(id, 60, 60_000);

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

  const supabase = createRouteHandlerClient({ cookies });
  const institutionId = context.params.id;

  const { data: institution, error: instError } = await supabase.rpc(
    "get_institution_details",
    { institution_id: institutionId }
  );

  if (instError) {
    return NextResponse.json({ error: instError.message }, { status: 500 });
  }

  const { data: programs } = await supabase.rpc("get_institution_programs", {
    institution_id: institutionId,
  });

  const { data: exams } = await supabase.rpc("get_institution_exams", {
    institution_id: institutionId,
  });

  return NextResponse.json(
    {
      institution: institution?.[0] || null,
      programs: programs || [],
      exams: exams || [],
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    }
  );
}