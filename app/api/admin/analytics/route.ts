import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(req.url);
  const institutionId = searchParams.get("institution_id");

  let query = supabase
    .from("analytics_events")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (institutionId) query = query.eq("institution_id", institutionId);

  const { data, error } = await query;

  if (error) return Response.json({ error }, { status: 400 });

  return Response.json(data);
}

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const body = await req.json();

  const { data, error } = await supabase
    .from("analytics_events")
    .insert(body)
    .select()
    .single();

  if (error) return Response.json({ error }, { status: 400 });

  return Response.json(data);
}
