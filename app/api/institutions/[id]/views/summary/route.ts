import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { ViewSummary } from "@/types/views"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("institution_views_summary")
    .select("*")
    .eq("institution_id", params.id)
    .maybeSingle<ViewSummary>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch view summary" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? {})
}