import { NextRequest, NextResponse } from 'next/server'
import { validatePassword, getSessionToken } from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  if (!validatePassword(password)) {
    return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 })
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set('horstco_admin_session', getSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })
  return res
}
