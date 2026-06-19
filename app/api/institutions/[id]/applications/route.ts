import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { Application } from "@/types/application"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("institution_id", params.id)
    .order("created_at", { ascending: false })
    .returns<Application[]>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? [])
}