import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { StudentSummary } from "@/types/student"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("institution_students_summary")
    .select("*")
    .eq("institution_id", params.id)
    .order("created_at", { ascending: false })
    .returns<StudentSummary[]>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch student summaries" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? [])
}