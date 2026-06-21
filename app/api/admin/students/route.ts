import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  let query = supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: false });

  if (id) query = query.eq("id", id);

  const { data, error } = await query;

  if (error) return Response.json({ error }, { status: 400 });

  return Response.json(data);
}

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const body = await req.json();

  const { data, error } = await supabase
    .from("students")
    .insert(body)
    .select()
    .single();

  if (error) return Response.json({ error }, { status: 400 });

  return Response.json(data);
}

export async function PUT(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const body = await req.json();
  const { id, ...rest } = body;

  const { data, error } = await supabase
    .from("students")
    .update(rest)
    .eq("id", id)
    .select()
    .single();

  if (error) return Response.json({ error }, { status: 400 });

  return Response.json(data);
}

export async function DELETE(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { id } = await req.json();

  const { error } = await supabase
    .from("students")
    .delete()
    .eq("id", id);

  if (error) return Response.json({ error }, { status: 400 });

  return Response.json({ success: true });
}
