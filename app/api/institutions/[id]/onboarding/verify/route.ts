import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()
  const body = await req.json()

  const { data, error } = await supabase
    .from("institutions")
    .update({
      verification_status: body.status,
      documents_submitted: body.documents_submitted ?? true,
    })
    .eq("id", params.id)
    .select("*")
    .single()

  if (error) {
    return NextResponse.json(
      { error: "Failed to update verification status" },
      { status: 500 }
    )
  }

  return NextResponse.json(data)
}