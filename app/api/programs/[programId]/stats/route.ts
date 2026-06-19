import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { ProgramDetailStats } from "@/types/program-detail"

export async function GET(
  _req: Request,
  { params }: { params: { programId: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("program_detail_stats")
    .select("*")
    .eq("program_id", params.programId)
    .maybeSingle<ProgramDetailStats>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch program stats" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? {})
}