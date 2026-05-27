'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    setLoading(false)
    if (res.ok) {
      router.push('/admin/dashboard')
      router.refresh()
    } else {
      setError('Senha incorreta. Tente novamente.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-[#9E9188] mb-3">Área restrita</p>
          <h1 className="font-serif text-4xl text-[#1A1714]">Horst & Co.</h1>
          <p className="text-sm text-[#9E9188] mt-2">Painel Administrativo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 shadow-sm">
          <div>
            <label className="block text-xs tracking-[0.3em] uppercase text-[#9E9188] mb-3">
              Senha de acesso
            </label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border-b border-[#E8DDD0] bg-transparent py-3 pr-10 text-[#1A1714] placeholder:text-[#9E9188]/40 focus:outline-none focus:border-[#1A1714] transition-colors text-sm"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#9E9188] hover:text-[#1A1714] transition-colors"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-[#1A1714] text-[#FAF9F7] py-4 text-xs tracking-[0.3em] uppercase font-medium transition-colors hover:bg-[#3D3530] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-center text-xs text-[#9E9188] mt-6">
          Senha padrão: <code className="font-mono bg-white px-2 py-0.5">horstco2024</code>
          <br />
          <span className="opacity-60">Configure ADMIN_PASSWORD nas variáveis de ambiente.</span>
        </p>
      </div>
    </div>
  )
}
