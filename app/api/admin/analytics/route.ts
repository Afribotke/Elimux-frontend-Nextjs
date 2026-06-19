import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { AdminAnalytics } from "@/types/admin-analytics"

export async function GET() {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("admin_analytics_summary")
    .select("*")
    .maybeSingle<AdminAnalytics>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch admin analytics" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? {})
}