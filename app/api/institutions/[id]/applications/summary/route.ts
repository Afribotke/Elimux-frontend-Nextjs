import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { ApplicationSummary } from "@/types/application"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("institution_applications_summary")
    .select("*")
    .eq("institution_id", params.id)
    .order("created_at", { ascending: false })
    .returns<ApplicationSummary[]>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch application summaries" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? [])
}