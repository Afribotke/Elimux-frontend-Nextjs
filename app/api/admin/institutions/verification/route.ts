import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { InstitutionVerificationAdminItem } from "@/types/institution-verification-admin"

export async function GET() {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("admin_institution_verification_summary")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<InstitutionVerificationAdminItem[]>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch institution verification list" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? [])
}