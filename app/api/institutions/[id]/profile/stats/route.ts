import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { InstitutionProfileStats } from "@/types/institution-profile"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("institution_profile_stats")
    .select("*")
    .eq("institution_id", params.id)
    .maybeSingle<InstitutionProfileStats>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch institution profile stats" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? {})
}