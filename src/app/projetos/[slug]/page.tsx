import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, MapPin, Calendar, Maximize } from 'lucide-react'
import AnimateInView from '@/components/AnimateInView'
import { projects, getProjectBySlug } from '@/data/projects'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  if (!project) return { title: 'Projeto não encontrado' }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Horst & Co. Arquitetura`,
      description: project.description,
      images: [{ url: project.coverImage, width: 1200, height: 800 }],
    },
  }
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  const currentIndex = projects.findIndex((p) => p.slug === project.slug)
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null
  const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  return (
    <>
      {/* Back */}
      <div className="pt-28 lg:pt-32 max-w-8xl mx-auto px-6 lg:px-12">
        <AnimateInView>
          <Link
            href="/projetos"
            className="inline-flex items-center gap-2 text-xs tracking-ultra uppercase text-warm-gray hover:text-ink transition-colors"
          >
            <ArrowLeft size={12} /> Todos os projetos
          </Link>
        </AnimateInView>
      </div>

      {/* Title */}
      <section className="max-w-8xl mx-auto px-6 lg:px-12 py-12">
        <AnimateInView>
          <span className="section-label mb-4 block">{project.category}</span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-ink leading-tight">
            {project.title}
          </h1>
          <p className="mt-4 text-xl text-warm-gray font-serif italic">{project.subtitle}</p>
        </AnimateInView>

        <AnimateInView delay={0.1} className="mt-10 flex flex-wrap gap-8 border-t border-sand pt-8">
          <div className="flex items-center gap-2 text-sm text-warm-gray">
            <MapPin size={14} className="text-gold" />
            {project.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-warm-gray">
            <Calendar size={14} className="text-gold" />
            {project.year}
          </div>
          <div className="flex items-center gap-2 text-sm text-warm-gray">
            <Maximize size={14} className="text-gold" />
            {project.area}
          </div>
        </AnimateInView>
      </section>

      {/* Cover */}
      <section className="max-w-8xl mx-auto px-6 lg:px-12 pb-12">
        <AnimateInView>
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </AnimateInView>
      </section>

      {/* Description */}
      <section className="max-w-8xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <AnimateInView className="lg:col-span-5">
            <h2 className="font-serif text-3xl lg:text-4xl text-ink leading-tight">
              {project.description}
            </h2>
          </AnimateInView>
          <AnimateInView delay={0.15} className="lg:col-span-6 lg:col-start-7">
            {project.longDescription.split('\n\n').map((para, i) => (
              <p key={i} className="text-warm-gray leading-relaxed mb-6">
                {para}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs tracking-wide uppercase border border-sand px-3 py-1.5 text-warm-gray"
                >
                  {tag}
                </span>
              ))}
            </div>
          </AnimateInView>
        </div>
      </section>

      {/* Gallery */}
      {project.images.length > 1 && (
        <section className="max-w-8xl mx-auto px-6 lg:px-12 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {project.images.slice(1).map((img, i) => (
              <AnimateInView key={i} delay={i * 0.1}>
                <div className={`relative overflow-hidden ${i === 0 && project.images.length > 2 ? 'lg:col-span-2 aspect-[16/7]' : 'aspect-[4/3]'}`}>
                  <Image
                    src={img}
                    alt={`${project.title} — imagem ${i + 2}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </AnimateInView>
            ))}
          </div>
        </section>
      )}

      {/* Next / Prev */}
      <section className="border-t border-sand bg-cream">
        <div className="max-w-8xl mx-auto px-6 lg:px-12 py-16">
          <div className="flex items-center justify-between gap-8">
            {prev ? (
              <Link href={`/projetos/${prev.slug}`} className="group flex items-center gap-4">
                <ArrowLeft size={16} className="text-warm-gray group-hover:text-ink transition-colors group-hover:-translate-x-1 duration-200" />
                <div>
                  <p className="text-xs tracking-ultra uppercase text-warm-gray mb-1">Anterior</p>
                  <p className="font-serif text-xl text-ink">{prev.title}</p>
                </div>
              </Link>
            ) : <div />}

            <Link href="/projetos" className="text-xs tracking-ultra uppercase text-warm-gray hover:text-ink transition-colors hidden lg:block">
              Todos os projetos
            </Link>

            {next ? (
              <Link href={`/projetos/${next.slug}`} className="group flex items-center gap-4 text-right">
                <div>
                  <p className="text-xs tracking-ultra uppercase text-warm-gray mb-1">Próximo</p>
                  <p className="font-serif text-xl text-ink">{next.title}</p>
                </div>
                <ArrowRight size={16} className="text-warm-gray group-hover:text-ink transition-colors group-hover:translate-x-1 duration-200" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-8xl mx-auto px-6 lg:px-12 py-24 text-center">
        <AnimateInView>
          <h2 className="font-serif text-4xl lg:text-5xl text-ink mb-6">
            Gostou do que viu?
          </h2>
          <p className="text-warm-gray mb-10">
            Vamos conversar sobre o seu projeto.
          </p>
          <Link href="/contato" className="btn-primary">
            Fale conosco <ArrowRight size={14} />
          </Link>
        </AnimateInView>
      </section>
    </>
  )
}
