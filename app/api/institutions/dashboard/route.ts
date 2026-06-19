import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase/server'
import type { InstitutionDashboardSummary } from '@/types/institution'

export async function GET() {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from('institution_dashboard_summary')
    .select('*')
    .order('created_at', { ascending: false })
    .returns<InstitutionDashboardSummary[]>()

  if (error) {
    console.error('Error fetching institutions dashboard list:', error)
    return NextResponse.json(
      { error: 'Failed to fetch institutions dashboard' },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? [])
}
