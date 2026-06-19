import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const supabase = createSupabaseServer()
  const body = await req.json()

  const { data, error } = await supabase
    .from("institutions")
    .insert({
      name: body.name,
      type: body.type,
      country: body.country,
      email: body.email,
      phone: body.phone,
      website: body.website,
      documents_submitted: false,
      verification_status: "pending",
    })
    .select("*")
    .single()

  if (error) {
    return NextResponse.json(
      { error: "Failed to create onboarding record" },
      { status: 500 }
    )
  }

  return NextResponse.json(data)
}