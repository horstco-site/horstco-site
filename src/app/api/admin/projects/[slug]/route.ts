import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { getProject, updateProject, deleteProject } from '@/lib/projects-db'
import { revalidatePath } from 'next/cache'

interface Params { params: { slug: string } }

export async function GET(_: NextRequest, { params }: Params) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  const project = await getProject(params.slug)
  if (!project) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 })
  return NextResponse.json(project)
}

export async function PUT(req: NextRequest, { params }: Params) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  try {
    const data = await req.json()
    const project = await updateProject(params.slug, data)
    revalidatePath('/')
    revalidatePath('/projetos')
    revalidatePath(`/projetos/${params.slug}`)
    return NextResponse.json(project)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  try {
    await deleteProject(params.slug)
    revalidatePath('/')
    revalidatePath('/projetos')
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
