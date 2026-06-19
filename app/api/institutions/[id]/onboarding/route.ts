import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { InstitutionOnboarding } from "@/types/institution-onboarding"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("institutions")
    .select("*")
    .eq("id", params.id)
    .maybeSingle<InstitutionOnboarding>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch onboarding state" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? {})
}