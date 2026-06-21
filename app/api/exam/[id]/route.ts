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
  const examId = context.params.id;

  const { data, error } = await supabase.rpc("get_exam_program", {
    exam_id: examId,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const exam = data?.[0] || null;

  return NextResponse.json(
    { exam },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    }
  );
}