'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export default function AdminLogout() {
  const router = useRouter()

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
    router.refresh()
  }

  return (
    <button
      onClick={logout}
      className="flex items-center gap-3 px-4 py-3 text-sm text-white/50 hover:text-white transition-colors w-full text-left"
    >
      <LogOut size={16} />
      Sair
    </button>
  )
}
