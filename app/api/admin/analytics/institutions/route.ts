import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { AdminInstitutionStat } from "@/types/admin-analytics"

export async function GET() {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("admin_institution_stats")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<AdminInstitutionStat[]>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch institution analytics" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? [])
}