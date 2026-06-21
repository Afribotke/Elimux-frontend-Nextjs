import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

function getTenantContext() {
  const cookieStore = cookies();
  const token = cookieStore.get("sb-access-token")?.value;

  if (!token) {
    return { user_id: null, email: null, role: null, institution_id: null };
  }

  const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

  return {
    user_id: payload.sub || null,
    email: payload.email || null,
    role: payload.role || null,
    institution_id: payload.institution_id || null,
  };
}

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  const ctx = getTenantContext();

  if (!ctx.user_id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("institution_verification")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ data });
}

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const ctx = getTenantContext();

  if (!ctx.user_id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const payload = {
    ...body,
    created_by: ctx.user_id,
  };

  const { data, error } = await supabase
    .from("institution_verification")
    .insert(payload)
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ data });
}

export async function PUT(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const ctx = getTenantContext();

  if (!ctx.user_id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  if (!body.id) {
    return Response.json({ error: "Missing id" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("institution_verification")
    .update(body)
    .eq("id", body.id)
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ data });
}

export async function DELETE(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const ctx = getTenantContext();

  if (!ctx.user_id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 });
  }

  const { error } = await supabase
    .from("institution_verification")
    .delete()
    .eq("id", id);

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ success: true });
}
