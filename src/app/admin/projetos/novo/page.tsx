import { requireAuth } from '@/lib/admin-auth'
import Link from 'next/link'
import { ArrowLeft, LayoutGrid } from 'lucide-react'
import ProjectForm from '../../_components/ProjectForm'
import AdminLogout from '../../_components/AdminLogout'

export default function NovoProjetoPage() {
  requireAuth()

  return (
    <div className="min-h-screen flex">
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#1A1714] flex flex-col z-40">
        <div className="p-8 border-b border-white/10">
          <p className="font-serif text-xl text-white">Horst & Co.</p>
          <p className="text-xs text-white/40 mt-1 tracking-wider">Admin</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors">
            <LayoutGrid size={16} /> Dashboard
          </Link>
          <Link href="/admin/projetos" className="flex items-center gap-3 px-4 py-3 text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors">
            <LayoutGrid size={16} /> Projetos
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10 space-y-1">
          <Link href="/" target="_blank" className="flex items-center gap-3 px-4 py-3 text-sm text-white/50 hover:text-white transition-colors">
            Ver site
          </Link>
          <AdminLogout />
        </div>
      </aside>

      <main className="flex-1 p-8 lg:p-12 ml-64">
        <div className="max-w-4xl">
          <div className="mb-10">
            <Link href="/admin/projetos" className="flex items-center gap-2 text-xs text-[#9E9188] hover:text-[#1A1714] transition-colors mb-4">
              <ArrowLeft size={14} /> Voltar aos projetos
            </Link>
            <p className="text-xs tracking-[0.3em] uppercase text-[#9E9188] mb-1">Criar</p>
            <h1 className="font-serif text-4xl text-[#1A1714]">Novo Projeto</h1>
          </div>
          <ProjectForm mode="create" />
        </div>
      </main>
    </div>
  )
}
