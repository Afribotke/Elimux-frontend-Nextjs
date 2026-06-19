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
