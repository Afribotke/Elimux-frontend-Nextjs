import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase/server'
import type { InstitutionDashboardSummary } from '@/types/institution'

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from('institution_dashboard_summary')
    .select('*')
    .eq('institution_id', params.id)
    .maybeSingle<InstitutionDashboardSummary>()

  if (error) {
    return NextResponse.json(
      { error: 'Failed to fetch institution dashboard' },
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