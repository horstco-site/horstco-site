import { requireAuth } from '@/lib/admin-auth'
import { getAllProjects } from '@/lib/projects-db'
import Link from 'next/link'
import { Plus, ArrowLeft, LayoutGrid } from 'lucide-react'
import AdminLogout from '../_components/AdminLogout'

export default async function ProjetosAdminPage() {
  requireAuth()
  const projects = await getAllProjects()

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
          <Link href="/admin/projetos" className="flex items-center gap-3 px-4 py-3 text-sm bg-white/10 text-white transition-colors">
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
        <div className="max-w-5xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#9E9188] mb-1">Gerenciar</p>
              <h1 className="font-serif text-4xl text-[#1A1714]">Projetos</h1>
            </div>
            <Link
              href="/admin/projetos/novo"
              className="flex items-center gap-2 bg-[#1A1714] text-white px-5 py-3 text-xs tracking-[0.2em] uppercase hover:bg-[#3D3530] transition-colors"
            >
              <Plus size={14} /> Novo projeto
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/admin/projetos/${project.slug}`}
                className="bg-white shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="relative aspect-video bg-[#E8DDD0] overflow-hidden">
                  {project.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="text-xs bg-white/90 px-2 py-1 text-[#1A1714]">{project.category}</span>
                  </div>
                  {project.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="text-xs bg-[#1A1714] text-white px-2 py-1">Destaque</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg text-[#1A1714]">{project.title}</h3>
                  <p className="text-xs text-[#9E9188] mt-0.5">{project.subtitle}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-[#9E9188]">{project.year} · {project.area}</span>
                    <span className="text-xs text-[#9E9188] group-hover:text-[#1A1714] transition-colors">Editar →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
