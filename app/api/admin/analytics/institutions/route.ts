import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

function getTenantContext() {
  const cookieStore = cookies()
  const token = cookieStore.get('sb-access-token')?.value

  if (!token) {
    return { user_id: null, email: null, role: null, institution_id: null }
  }

  const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())

  return {
    user_id: payload.sub || null,
    email: payload.email || null,
    role: payload.role || null,
    institution_id: payload.institution_id || null
  }
}

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })
  const ctx = getTenantContext()

  if (!ctx.user_id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return Response.json({ ok: true, ctx })
}

export async function GET(req: Request) {
  // TODO: implement READ (list or single) using supabase and ctx
  // const supabase = createRouteHandlerClient({ cookies })
  // const ctx = getTenantContext()
  // Example:
  // const { data, error } = await supabase
  //   .from('<TABLE_NAME>')
  //   .select('*')
  //   .eq('institution_id', ctx.institution_id)

  return Response.json({ ok: true, operation: 'GET' })
}

export async function POST(req: Request) {
  // TODO: implement CREATE
  // const body = await req.json()
  // const supabase = createRouteHandlerClient({ cookies })
  // const ctx = getTenantContext()

  return Response.json({ ok: true, operation: 'POST' })
}

export async function PUT(req: Request) {
  // TODO: implement UPDATE
  // const body = await req.json()
  // const supabase = createRouteHandlerClient({ cookies })
  // const ctx = getTenantContext()

  return Response.json({ ok: true, operation: 'PUT' })
}

export async function DELETE(req: Request) {
  // TODO: implement DELETE
  // const supabase = createRouteHandlerClient({ cookies })
  // const ctx = getTenantContext()

  return Response.json({ ok: true, operation: 'DELETE' })
}

