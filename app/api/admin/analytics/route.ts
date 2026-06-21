import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase.from("analytics").select("*");
  return Response.json({ data, error });
}

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const body = await req.json();
  const { data, error } = await supabase.from("analytics").insert(body).select();
  return Response.json({ data, error });
}

export async function PUT(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const body = await req.json();
  const { id, ...rest } = body;
  const { data, error } = await supabase.from("analytics").update(rest).eq("id", id).select();
  return Response.json({ data, error });
}

export async function DELETE(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { id } = await req.json();
  const { error } = await supabase.from("analytics").delete().eq("id", id);
  return Response.json({ success: !error, error });
}
