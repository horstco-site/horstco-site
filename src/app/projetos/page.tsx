'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import AnimateInView from '@/components/AnimateInView'
import { projects, type ProjectCategory } from '@/data/projects'

const categories: Array<'Todos' | ProjectCategory> = [
  'Todos',
  'Residencial',
  'Interiores',
  'Comercial',
  'Investidor',
]

export default function ProjetosPage() {
  const [active, setActive] = useState<'Todos' | ProjectCategory>('Todos')

  const filtered =
    active === 'Todos' ? projects : projects.filter((p) => p.category === active)

  return (
    <>
      {/* Header */}
      <section className="pt-40 pb-20 lg:pt-48 lg:pb-24 max-w-8xl mx-auto px-6 lg:px-12">
        <AnimateInView>
          <p className="section-label mb-4">Portfólio</p>
          <h1 className="section-title max-w-2xl">
            Projetos que falam por si mesmos.
          </h1>
        </AnimateInView>
      </section>

      {/* Filters */}
      <div className="sticky top-20 lg:top-24 z-30 bg-off-white/95 backdrop-blur-md border-b border-sand">
        <div className="max-w-8xl mx-auto px-6 lg:px-12">
          <div className="flex gap-1 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`flex-shrink-0 px-5 py-2 text-xs tracking-ultra uppercase transition-all duration-200 ${
                  active === cat
                    ? 'bg-ink text-off-white'
                    : 'text-warm-gray hover:text-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-8xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/projetos/${project.slug}`} className="group block">
                  <div className="relative overflow-hidden bg-sand aspect-[3/4]">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="text-xs tracking-wide uppercase bg-off-white/90 backdrop-blur-sm px-3 py-1 text-ink">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="flex items-start justify-between">
                      <h2 className="font-serif text-2xl text-ink">{project.title}</h2>
                      <span className="text-xs text-warm-gray mt-1">{project.year}</span>
                    </div>
                    <p className="mt-1 text-sm text-warm-gray">{project.subtitle}</p>
                    <div className="flex items-center gap-2 mt-4 text-xs text-warm-gray/60 group-hover:text-ink transition-colors">
                      <span>Ver projeto</span>
                      <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-warm-gray">
            <p className="font-serif text-2xl">Nenhum projeto encontrado.</p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-cream">
        <div className="max-w-8xl mx-auto px-6 lg:px-12 py-24 text-center">
          <AnimateInView>
            <h2 className="font-serif text-4xl lg:text-5xl text-ink mb-6">
              Quer ver seu projeto aqui?
            </h2>
            <p className="text-warm-gray mb-10 max-w-md mx-auto">
              Entre em contato e vamos conversar sobre como transformar sua ideia em realidade.
            </p>
            <Link href="/contato" className="btn-primary">
              Iniciar projeto <ArrowRight size={14} />
            </Link>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
