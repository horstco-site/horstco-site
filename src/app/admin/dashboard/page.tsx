import { requireAuth } from '@/lib/admin-auth'
import { getAllProjects, isKVReady } from '@/lib/projects-db'
import Link from 'next/link'
import { LayoutGrid, Plus, Settings, LogOut, AlertTriangle, CheckCircle } from 'lucide-react'
import AdminLogout from '../_components/AdminLogout'

export default async function DashboardPage() {
  requireAuth()
  const [projects, kvReady] = await Promise.all([getAllProjects(), isKVReady()])
  const featured = projects.filter((p) => p.featured).length
  const categories = Array.from(new Set(projects.map((p) => p.category)))

  return (
    <div className="min-h-screen flex">
      <AdminSidebar active="dashboard" />

      <main className="flex-1 p-8 lg:p-12 ml-64">
        <div className="max-w-5xl">
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-[#9E9188] mb-1">Bem-vinda</p>
            <h1 className="font-serif text-4xl text-[#1A1714]">Dashboard</h1>
          </div>

          {!kvReady && (
            <div className="bg-amber-50 border border-amber-200 p-5 mb-8 flex items-start gap-3">
              <AlertTriangle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800">Vercel KV não configurado</p>
                <p className="text-xs text-amber-700 mt-1">
                  As edições não serão salvas. Configure o Vercel KV no dashboard da Vercel:
                  Storage → Create Database → KV → Connect to Project.
                  As variáveis <code className="font-mono">KV_REST_API_URL</code> e <code className="font-mono">KV_REST_API_TOKEN</code> serão criadas automaticamente.
                </p>
              </div>
            </div>
          )}

          {kvReady && (
            <div className="bg-green-50 border border-green-200 p-4 mb-8 flex items-center gap-3">
              <CheckCircle size={16} className="text-green-500" />
              <p className="text-sm text-green-800">Vercel KV conectado — edições são salvas automaticamente.</p>
            </div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Total de projetos', value: projects.length },
              { label: 'Em destaque', value: featured },
              { label: 'Categorias', value: categories.length },
              { label: 'Armazenamento', value: kvReady ? 'KV' : 'Estático' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-6 shadow-sm">
                <p className="font-serif text-3xl text-[#1A1714]">{stat.value}</p>
                <p className="text-xs text-[#9E9188] mt-1 tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white shadow-sm">
            <div className="p-6 border-b border-[#E8DDD0] flex items-center justify-between">
              <h2 className="font-serif text-xl text-[#1A1714]">Projetos</h2>
              <Link
                href="/admin/projetos/novo"
                className="flex items-center gap-2 bg-[#1A1714] text-white px-4 py-2 text-xs tracking-[0.2em] uppercase hover:bg-[#3D3530] transition-colors"
              >
                <Plus size={14} /> Novo projeto
              </Link>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E8DDD0]">
                  <th className="text-left p-4 text-xs tracking-[0.2em] uppercase text-[#9E9188]">Projeto</th>
                  <th className="text-left p-4 text-xs tracking-[0.2em] uppercase text-[#9E9188] hidden md:table-cell">Categoria</th>
                  <th className="text-left p-4 text-xs tracking-[0.2em] uppercase text-[#9E9188] hidden lg:table-cell">Ano</th>
                  <th className="text-left p-4 text-xs tracking-[0.2em] uppercase text-[#9E9188]">Destaque</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DDD0]">
                {projects.map((project) => (
                  <tr key={project.slug} className="hover:bg-[#F5F0E8]/50 transition-colors">
                    <td className="p-4">
                      <p className="font-serif text-[#1A1714]">{project.title}</p>
                      <p className="text-xs text-[#9E9188] mt-0.5">{project.subtitle}</p>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-xs px-2 py-1 bg-[#E8DDD0] text-[#3D3530]">{project.category}</span>
                    </td>
                    <td className="p-4 text-sm text-[#9E9188] hidden lg:table-cell">{project.year}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 ${project.featured ? 'bg-[#1A1714] text-white' : 'bg-[#E8DDD0] text-[#9E9188]'}`}>
                        {project.featured ? 'Sim' : 'Não'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/admin/projetos/${project.slug}`}
                        className="text-xs tracking-wide text-[#9E9188] hover:text-[#1A1714] transition-colors"
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

function AdminSidebar({ active }: { active: string }) {
  const links = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutGrid, key: 'dashboard' },
    { href: '/admin/projetos', label: 'Projetos', icon: LayoutGrid, key: 'projetos' },
  ]
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#1A1714] flex flex-col z-40">
      <div className="p-8 border-b border-white/10">
        <p className="font-serif text-xl text-white">Horst & Co.</p>
        <p className="text-xs text-white/40 mt-1 tracking-wider">Admin</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
              active === link.key ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <link.icon size={16} />
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10 space-y-1">
        <Link href="/" target="_blank" className="flex items-center gap-3 px-4 py-3 text-sm text-white/50 hover:text-white transition-colors">
          <Settings size={16} />
          Ver site
        </Link>
        <AdminLogout />
      </div>
    </aside>
  )
}
