import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { Student } from "@/types/student"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("institution_id", params.id)
    .order("created_at", { ascending: false })
    .returns<Student[]>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? [])
}