import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const studentId = searchParams.get("student_id");
  const programId = searchParams.get("program_id");

  let query = supabase
    .from("applications")
    .select("*, students(*), programs(*, institutions(*))")
    .order("created_at", { ascending: false });

  if (id) query = query.eq("id", id);
  if (studentId) query = query.eq("student_id", studentId);
  if (programId) query = query.eq("program_id", programId);

  const { data, error } = await query;

  if (error) return Response.json({ error }, { status: 400 });

  const mapped = (data || []).map((row: any) => ({
    raw: {
      id: row.id,
      student_id: row.student_id,
      program_id: row.program_id,
      status: row.status,
      created_at: row.created_at
    },
    expanded: {
      student: row.students,
      program: row.programs,
      institution: row.programs?.institutions
    }
  }));

  if (id) return Response.json(mapped[0] || null);

  return Response.json(mapped);
}

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const body = await req.json();

  const { data, error } = await supabase
    .from("applications")
    .insert(body)
    .select("*, students(*), programs(*, institutions(*))")
    .single();

  if (error) return Response.json({ error }, { status: 400 });

  return Response.json({
    raw: {
      id: data.id,
      student_id: data.student_id,
      program_id: data.program_id,
      status: data.status,
      created_at: data.created_at
    },
    expanded: {
      student: data.students,
      program: data.programs,
      institution: data.programs?.institutions
    }
  });
}

export async function PUT(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const body = await req.json();
  const { id, ...rest } = body;

  const { data, error } = await supabase
    .from("applications")
    .update(rest)
    .eq("id", id)
    .select("*, students(*), programs(*, institutions(*))")
    .single();

  if (error) return Response.json({ error }, { status: 400 });

  return Response.json({
    raw: {
      id: data.id,
      student_id: data.student_id,
      program_id: data.program_id,
      status: data.status,
      created_at: data.created_at
    },
    expanded: {
      student: data.students,
      program: data.programs,
      institution: data.programs?.institutions
    }
  });
}

export async function DELETE(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { id } = await req.json();

  const { error } = await supabase
    .from("applications")
    .delete()
    .eq("id", id);

  if (error) return Response.json({ error }, { status: 400 });

  return Response.json({ success: true });
}
