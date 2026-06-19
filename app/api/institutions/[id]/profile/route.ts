import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { InstitutionProfile } from "@/types/institution-profile"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("institutions")
    .select(`
      id,
      name,
      type,
      country,
      city,
      description,
      branding:branding->logoUrl,
      website:branding->website,
      contact:contact->name,
      contact_email:contact->email,
      contact_phone:contact->phone,
      created_at
    `)
    .eq("id", params.id)
    .maybeSingle<InstitutionProfile>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch institution profile" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? {})
}