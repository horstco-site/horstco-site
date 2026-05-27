import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { getAllProjects, createProject } from '@/lib/projects-db'
import { revalidatePath } from 'next/cache'

export async function GET() {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  const projects = await getAllProjects()
  return NextResponse.json(projects)
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  try {
    const data = await req.json()
    const project = await createProject(data)
    revalidatePath('/')
    revalidatePath('/projetos')
    return NextResponse.json(project, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
