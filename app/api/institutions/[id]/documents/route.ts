import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import type { InstitutionDocument } from "@/types/institution-document"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("institution_documents")
    .select("*")
    .eq("institution_id", params.id)
    .order("uploaded_at", { ascending: false })
    .returns<InstitutionDocument[]>()

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? [])
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()
  const body = await req.json()

  const { data, error } = await supabase
    .from("institution_documents")
    .insert({
      institution_id: params.id,
      type: body.type,
      name: body.name,
      url: body.url,
      uploaded_by: body.uploaded_by ?? null,
    })
    .select("*")
    .single()

  if (error) {
    return NextResponse.json(
      { error: "Failed to upload document" },
      { status: 500 }
    )
  }

  return NextResponse.json(data)
}