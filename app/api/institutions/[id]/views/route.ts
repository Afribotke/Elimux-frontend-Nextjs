import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { ViewEvent } from "@/types/views"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("institution_events")
    .select("*")
    .eq("institution_id", params.id)
    .order("created_at", { ascending: false })
    .returns<ViewEvent[]>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch view events" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? [])
}