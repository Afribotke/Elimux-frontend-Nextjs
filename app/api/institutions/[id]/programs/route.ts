import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { Program } from "@/types/program"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("programs")
    .select("*")
    .eq("institution_id", params.id)
    .order("created_at", { ascending: false })
    .returns<Program[]>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch programs" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? [])
}