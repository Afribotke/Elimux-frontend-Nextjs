import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { ProgramDetail } from "@/types/program-detail"

export async function GET(
  _req: Request,
  { params }: { params: { programId: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("programs")
    .select("*")
    .eq("id", params.programId)
    .maybeSingle<ProgramDetail>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch program detail" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? {})
}