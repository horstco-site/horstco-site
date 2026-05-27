import { type Project, projects as staticProjects } from '@/data/projects'

const KV_KEY = 'horstco:projects'

async function getKV() {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null
  try {
    const { kv } = await import('@vercel/kv')
    return kv
  } catch {
    return null
  }
}

export async function isKVReady(): Promise<boolean> {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

export async function getAllProjects(): Promise<Project[]> {
  const db = await getKV()
  if (!db) return staticProjects
  try {
    const data = await db.get<Project[]>(KV_KEY)
    if (!data || data.length === 0) {
      await db.set(KV_KEY, staticProjects)
      return staticProjects
    }
    return data
  } catch {
    return staticProjects
  }
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const all = await getAllProjects()
  return all.find((p) => p.slug === slug)
}

export async function createProject(project: Project): Promise<Project> {
  const db = await getKV()
  if (!db) throw new Error('KV não configurado')
  const all = await getAllProjects()
  if (all.find((p) => p.slug === project.slug)) throw new Error('Slug já existe')
  await db.set(KV_KEY, [...all, project])
  return project
}

export async function updateProject(slug: string, data: Partial<Project>): Promise<Project> {
  const db = await getKV()
  if (!db) throw new Error('KV não configurado')
  const all = await getAllProjects()
  const idx = all.findIndex((p) => p.slug === slug)
  if (idx === -1) throw new Error('Projeto não encontrado')
  const updated = { ...all[idx], ...data }
  const newAll = [...all]
  newAll[idx] = updated
  await db.set(KV_KEY, newAll)
  return updated
}

export async function deleteProject(slug: string): Promise<void> {
  const db = await getKV()
  if (!db) throw new Error('KV não configurado')
  const all = await getAllProjects()
  await db.set(KV_KEY, all.filter((p) => p.slug !== slug))
}

export async function reorderProjects(slugs: string[]): Promise<void> {
  const db = await getKV()
  if (!db) throw new Error('KV não configurado')
  const all = await getAllProjects()
  const map = new Map(all.map((p) => [p.slug, p]))
  const reordered = slugs.map((s) => map.get(s)).filter(Boolean) as Project[]
  await db.set(KV_KEY, reordered)
}
