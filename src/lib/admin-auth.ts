import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import crypto from 'crypto'

const COOKIE = 'horstco_admin_session'

function hash(value: string): string {
  const secret = process.env.ADMIN_SECRET || 'horstco-salt-2024'
  return crypto.createHmac('sha256', secret).update(value).digest('hex')
}

export function validatePassword(password: string): boolean {
  return password === (process.env.ADMIN_PASSWORD || 'horstco2024')
}

export function getSessionToken(): string {
  return hash(process.env.ADMIN_PASSWORD || 'horstco2024')
}

export function isAuthenticated(): boolean {
  return cookies().get(COOKIE)?.value === getSessionToken()
}

export function requireAuth() {
  if (!isAuthenticated()) redirect('/admin')
}

export function setAuthCookie() {
  cookies().set(COOKIE, getSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })
}

export function clearAuthCookie() {
  cookies().delete(COOKIE)
}
