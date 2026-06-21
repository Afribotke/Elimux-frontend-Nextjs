import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const studentId = searchParams.get("student_id");

  let query = supabase
    .from("invoices")
    .select("*, students(*), applications(*, programs(*, institutions(*)))")
    .order("created_at", { ascending: false });

  if (id) query = query.eq("id", id);
  if (studentId) query = query.eq("student_id", studentId);

  const { data, error } = await query;

  if (error) return Response.json({ error }, { status: 400 });

  const mapped = (data || []).map((row: any) => ({
    raw: {
      id: row.id,
      student_id: row.student_id,
      application_id: row.application_id,
      amount: row.amount,
      currency: row.currency,
      status: row.status,
      created_at: row.created_at
    },
    expanded: {
      student: row.students,
      application: row.applications,
      program: row.applications?.programs,
      institution: row.applications?.programs?.institutions
    }
  }));

  if (id) return Response.json(mapped[0] || null);

  return Response.json(mapped);
}

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const body = await req.json();

  const { data, error } = await supabase
    .from("invoices")
    .insert(body)
    .select("*, students(*), applications(*, programs(*, institutions(*)))")
    .single();

  if (error) return Response.json({ error }, { status: 400 });

  return Response.json({
    raw: {
      id: data.id,
      student_id: data.student_id,
      application_id: data.application_id,
      amount: data.amount,
      currency: data.currency,
      status: data.status,
      created_at: data.created_at
    },
    expanded: {
      student: data.students,
      application: data.applications,
      program: data.applications?.programs,
      institution: data.applications?.programs?.institutions
    }
  });
}

export async function PUT(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const body = await req.json();
  const { id, ...rest } = body;

  const { data, error } = await supabase
    .from("invoices")
    .update(rest)
    .eq("id", id)
    .select("*, students(*), applications(*, programs(*, institutions(*)))")
    .single();

  if (error) return Response.json({ error }, { status: 400 });

  return Response.json({
    raw: {
      id: data.id,
      student_id: data.student_id,
      application_id: data.application_id,
      amount: data.amount,
      currency: data.currency,
      status: data.status,
      created_at: data.created_at
    },
    expanded: {
      student: data.students,
      application: data.applications,
      program: data.applications?.programs,
      institution: data.applications?.programs?.institutions
    }
  });
}

export async function DELETE(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { id } = await req.json();

  const { error } = await supabase
    .from("invoices")
    .delete()
    .eq("id", id);

  if (error) return Response.json({ error }, { status: 400 });

  return Response.json({ success: true });
}
