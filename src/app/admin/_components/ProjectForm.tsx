'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { type Project, type ProjectCategory } from '@/data/projects'
import { Upload, X, Plus, ArrowLeft, Trash2, Image as ImageIcon, Save } from 'lucide-react'
import Image from 'next/image'

const CATEGORIES: ProjectCategory[] = ['Residencial', 'Comercial', 'Investidor', 'Interiores']

interface Props {
  project?: Project
  mode: 'create' | 'edit'
}

type FormData = Omit<Project, 'images' | 'tags'> & {
  tagsRaw: string
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function ProjectForm({ project, mode }: Props) {
  const router = useRouter()
  const [images, setImages] = useState<string[]>(project?.images ?? [''])
  const [coverImage, setCoverImage] = useState(project?.coverImage ?? '')
  const [uploading, setUploading] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      slug: project?.slug ?? '',
      title: project?.title ?? '',
      subtitle: project?.subtitle ?? '',
      category: project?.category ?? 'Residencial',
      year: project?.year ?? new Date().getFullYear().toString(),
      location: project?.location ?? 'São Paulo, SP',
      area: project?.area ?? '',
      description: project?.description ?? '',
      longDescription: project?.longDescription ?? '',
      featured: project?.featured ?? false,
      tagsRaw: project?.tags?.join(', ') ?? '',
    },
  })

  const titleValue = watch('title')

  async function uploadImage(file: File, key: string): Promise<string | null> {
    setUploading(key)
    const form = new FormData()
    form.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
    setUploading(null)
    if (!res.ok) {
      const err = await res.json()
      if (err.error?.includes('Blob não configurado')) {
        setError('Para upload direto, configure BLOB_READ_WRITE_TOKEN. Por enquanto, use URLs externas.')
      }
      return null
    }
    const { url } = await res.json()
    return url
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = await uploadImage(file, 'cover')
    if (url) setCoverImage(url)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, idx: number) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = await uploadImage(file, `img-${idx}`)
    if (url) {
      const next = [...images]
      next[idx] = url
      setImages(next)
    }
  }

  async function onSubmit(data: FormData) {
    setSaving(true)
    setError('')
    const finalSlug = data.slug || slugify(data.title)
    const payload: Project = {
      ...data,
      slug: finalSlug,
      coverImage,
      images: images.filter(Boolean),
      tags: data.tagsRaw.split(',').map((t) => t.trim()).filter(Boolean),
    }

    const url = mode === 'create'
      ? '/api/admin/projects'
      : `/api/admin/projects/${project!.slug}`

    const res = await fetch(url, {
      method: mode === 'create' ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setSaving(false)

    if (!res.ok) {
      const err = await res.json()
      setError(err.error || 'Erro ao salvar')
      return
    }
    router.push('/admin/dashboard')
    router.refresh()
  }

  async function handleDelete() {
    if (!project) return
    if (!confirm(`Excluir "${project.title}"? Esta ação não pode ser desfeita.`)) return
    setDeleting(true)
    const res = await fetch(`/api/admin/projects/${project.slug}`, { method: 'DELETE' })
    setDeleting(false)
    if (res.ok) {
      router.push('/admin/dashboard')
      router.refresh()
    } else {
      setError('Erro ao excluir projeto')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Cover Image */}
      <div className="bg-white shadow-sm p-6">
        <h2 className="font-serif text-xl text-[#1A1714] mb-5">Imagem de capa</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div>
            {coverImage ? (
              <div className="relative aspect-video bg-[#E8DDD0] overflow-hidden group">
                <Image src={coverImage} alt="Capa" fill className="object-cover" sizes="600px" />
                <button
                  type="button"
                  onClick={() => setCoverImage('')}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="aspect-video bg-[#E8DDD0] flex items-center justify-center">
                <ImageIcon size={32} className="text-[#9E9188]" />
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-[#9E9188] mb-2">URL da imagem</label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://..."
                className="w-full border-b border-[#E8DDD0] bg-transparent py-2.5 text-sm text-[#1A1714] placeholder:text-[#9E9188]/40 focus:outline-none focus:border-[#1A1714] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-[#9E9188] mb-2">OU fazer upload</label>
              <input ref={coverInputRef} type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                disabled={uploading === 'cover'}
                className="flex items-center gap-2 border border-[#E8DDD0] px-4 py-2.5 text-xs tracking-wide uppercase text-[#9E9188] hover:border-[#1A1714] hover:text-[#1A1714] transition-colors disabled:opacity-50"
              >
                <Upload size={14} />
                {uploading === 'cover' ? 'Enviando...' : 'Upload de imagem'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="bg-white shadow-sm p-6">
        <h2 className="font-serif text-xl text-[#1A1714] mb-5">Informações básicas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9E9188] mb-2">Título *</label>
            <input
              {...register('title', { required: true })}
              type="text"
              placeholder="Ex: Penthouse FG"
              onBlur={() => {
                if (!project && !watch('slug')) setValue('slug', slugify(titleValue || ''))
              }}
              className="w-full border-b border-[#E8DDD0] bg-transparent py-2.5 text-sm text-[#1A1714] placeholder:text-[#9E9188]/40 focus:outline-none focus:border-[#1A1714] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9E9188] mb-2">Subtítulo</label>
            <input
              {...register('subtitle')}
              type="text"
              placeholder="Ex: Exclusividade nos detalhes"
              className="w-full border-b border-[#E8DDD0] bg-transparent py-2.5 text-sm text-[#1A1714] placeholder:text-[#9E9188]/40 focus:outline-none focus:border-[#1A1714] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9E9188] mb-2">Slug (URL) *</label>
            <input
              {...register('slug', { required: true })}
              type="text"
              placeholder="penthouse-fg"
              className="w-full border-b border-[#E8DDD0] bg-transparent py-2.5 text-sm font-mono text-[#1A1714] placeholder:text-[#9E9188]/40 focus:outline-none focus:border-[#1A1714] transition-colors"
            />
            <p className="mt-1 text-xs text-[#9E9188]">Gerado automaticamente a partir do título</p>
          </div>
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9E9188] mb-2">Categoria *</label>
            <select
              {...register('category', { required: true })}
              className="w-full border-b border-[#E8DDD0] bg-transparent py-2.5 text-sm text-[#1A1714] focus:outline-none focus:border-[#1A1714] transition-colors appearance-none cursor-pointer"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9E9188] mb-2">Ano</label>
            <input
              {...register('year')}
              type="text"
              placeholder="2024"
              className="w-full border-b border-[#E8DDD0] bg-transparent py-2.5 text-sm text-[#1A1714] placeholder:text-[#9E9188]/40 focus:outline-none focus:border-[#1A1714] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9E9188] mb-2">Localização</label>
            <input
              {...register('location')}
              type="text"
              placeholder="São Paulo, SP"
              className="w-full border-b border-[#E8DDD0] bg-transparent py-2.5 text-sm text-[#1A1714] placeholder:text-[#9E9188]/40 focus:outline-none focus:border-[#1A1714] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9E9188] mb-2">Área</label>
            <input
              {...register('area')}
              type="text"
              placeholder="420 m²"
              className="w-full border-b border-[#E8DDD0] bg-transparent py-2.5 text-sm text-[#1A1714] placeholder:text-[#9E9188]/40 focus:outline-none focus:border-[#1A1714] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9E9188] mb-2">Tags (separadas por vírgula)</label>
            <input
              {...register('tagsRaw')}
              type="text"
              placeholder="Penthouse, Alto padrão, São Paulo"
              className="w-full border-b border-[#E8DDD0] bg-transparent py-2.5 text-sm text-[#1A1714] placeholder:text-[#9E9188]/40 focus:outline-none focus:border-[#1A1714] transition-colors"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              {...register('featured')}
              type="checkbox"
              className="w-4 h-4 accent-[#1A1714]"
            />
            <span className="text-sm text-[#3D3530]">Exibir na página inicial (destaque)</span>
          </label>
        </div>
      </div>

      {/* Descriptions */}
      <div className="bg-white shadow-sm p-6">
        <h2 className="font-serif text-xl text-[#1A1714] mb-5">Textos</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9E9188] mb-2">Descrição curta *</label>
            <textarea
              {...register('description', { required: true })}
              rows={3}
              placeholder="Uma frase que resume o projeto..."
              className="w-full border-b border-[#E8DDD0] bg-transparent py-2.5 text-sm text-[#1A1714] placeholder:text-[#9E9188]/40 focus:outline-none focus:border-[#1A1714] transition-colors resize-none"
            />
          </div>
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9E9188] mb-2">
              Descrição completa{' '}
              <span className="normal-case text-[#9E9188]/60 tracking-normal">(separe parágrafos com linha em branco)</span>
            </label>
            <textarea
              {...register('longDescription')}
              rows={8}
              placeholder="Descreva o projeto em detalhes..."
              className="w-full border-b border-[#E8DDD0] bg-transparent py-2.5 text-sm text-[#1A1714] placeholder:text-[#9E9188]/40 focus:outline-none focus:border-[#1A1714] transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-white shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-xl text-[#1A1714]">Galeria de imagens</h2>
          <button
            type="button"
            onClick={() => setImages([...images, ''])}
            className="flex items-center gap-2 text-xs tracking-wide uppercase text-[#9E9188] hover:text-[#1A1714] transition-colors"
          >
            <Plus size={14} /> Adicionar
          </button>
        </div>

        <div className="space-y-4">
          {images.map((img, i) => (
            <div key={i} className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center p-4 bg-[#F5F0E8]">
              <div className="lg:col-span-1">
                {img ? (
                  <div className="relative aspect-video bg-[#E8DDD0] overflow-hidden">
                    <Image src={img} alt={`Imagem ${i + 1}`} fill className="object-cover" sizes="300px" />
                  </div>
                ) : (
                  <div className="aspect-video bg-[#E8DDD0] flex items-center justify-center">
                    <ImageIcon size={24} className="text-[#9E9188]" />
                  </div>
                )}
              </div>
              <div className="lg:col-span-2 space-y-3">
                <div>
                  <label className="block text-xs tracking-wide uppercase text-[#9E9188] mb-1.5">URL da imagem {i + 1}</label>
                  <input
                    type="url"
                    value={img}
                    onChange={(e) => {
                      const next = [...images]; next[i] = e.target.value; setImages(next)
                    }}
                    placeholder="https://..."
                    className="w-full border-b border-[#D4C5B2] bg-transparent py-2 text-sm text-[#1A1714] placeholder:text-[#9E9188]/40 focus:outline-none focus:border-[#1A1714] transition-colors"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id={`file-${i}`}
                    onChange={(e) => handleImageUpload(e, i)}
                  />
                  <label
                    htmlFor={`file-${i}`}
                    className="flex items-center gap-2 border border-[#D4C5B2] px-3 py-2 text-xs tracking-wide uppercase text-[#9E9188] hover:border-[#1A1714] hover:text-[#1A1714] transition-colors cursor-pointer"
                  >
                    <Upload size={12} />
                    {uploading === `img-${i}` ? 'Enviando...' : 'Upload'}
                  </label>
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, j) => j !== i))}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:text-red-600 transition-colors"
                  >
                    <X size={12} /> Remover
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pb-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-[#9E9188] hover:text-[#1A1714] transition-colors"
        >
          <ArrowLeft size={16} /> Voltar
        </button>
        <div className="flex items-center gap-4">
          {mode === 'edit' && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 border border-red-200 text-red-400 hover:bg-red-50 hover:border-red-400 px-5 py-3 text-xs tracking-[0.2em] uppercase transition-colors disabled:opacity-50"
            >
              <Trash2 size={14} />
              {deleting ? 'Excluindo...' : 'Excluir'}
            </button>
          )}
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-[#1A1714] text-white px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-[#3D3530] transition-colors disabled:opacity-50"
          >
            <Save size={14} />
            {saving ? 'Salvando...' : mode === 'create' ? 'Criar projeto' : 'Salvar alterações'}
          </button>
        </div>
      </div>
    </form>
  )
}
