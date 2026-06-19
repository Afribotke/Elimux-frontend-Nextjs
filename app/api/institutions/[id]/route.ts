import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase/server'

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from('institutions')
    .select('*')
    .eq('id', params.id)
    .maybeSingle()

  if (error) {
    return NextResponse.json(
      { error: 'Failed to fetch institution' },
      { status: 500 }
    )
  }

  if (!data) {
    return NextResponse.json(
      { error: 'Institution not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(data)
}