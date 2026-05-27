'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import AnimateInView from '@/components/AnimateInView'
import { projects } from '@/data/projects'

const stats = [
  { value: '90+', label: 'Projetos completados' },
  { value: '20k+', label: 'm² projetados' },
  { value: '100%', label: 'Foco na experiência' },
]

const services = [
  'Projeto Residencial',
  'Projeto Comercial',
  'Consultoria',
  'Projeto para Investidor',
  'Consultoria de Imóveis',
  'Acompanhamento de Obra',
]

export default function HomePage() {
  const featured = projects.filter((p) => p.featured)

  return (
    <>
      {/* Hero */}
      <section className="relative h-screen min-h-[700px] flex items-end bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=85&fit=crop"
            alt="Horst & Co. Arquitetura"
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-8xl mx-auto px-6 lg:px-12 pb-20 lg:pb-28 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <span className="section-label text-off-white/50">
              Arquitetura & Interiores — São Paulo
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-off-white leading-[0.95] max-w-4xl"
          >
            Redefinindo o conceito de exclusividade.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-off-white/60 text-lg max-w-xl leading-relaxed"
          >
            Arquitetura e interiores com atemporalidade, sofisticação e funcionalidade.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <Link href="/projetos" className="btn-primary bg-off-white text-ink hover:bg-cream">
              Ver projetos <ArrowRight size={14} />
            </Link>
            <Link href="/contato" className="btn-outline border-off-white/40 text-off-white hover:bg-off-white hover:text-ink">
              Fale conosco
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute right-8 lg:right-12 bottom-1/2 translate-y-1/2 hidden lg:flex flex-col items-center gap-4"
        >
          <span className="writing-mode-vertical text-xs tracking-ultra uppercase text-off-white/30">
            Role para descobrir
          </span>
          <div className="w-px h-16 bg-off-white/20" />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-cream">
        <div className="max-w-8xl mx-auto px-6 lg:px-12 py-20">
          <div className="grid grid-cols-3 gap-6 lg:gap-12">
            {stats.map((stat, i) => (
              <AnimateInView key={stat.label} delay={i * 0.1}>
                <div className="text-center lg:text-left">
                  <p className="font-serif text-4xl lg:text-6xl text-ink">{stat.value}</p>
                  <p className="mt-2 text-xs tracking-wide text-warm-gray uppercase">{stat.label}</p>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-8xl mx-auto px-6 lg:px-12 py-28 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <AnimateInView>
            <p className="section-label mb-6">Sobre o escritório</p>
            <h2 className="section-title">
              Um escritório boutique com alma.
            </h2>
          </AnimateInView>
          <AnimateInView delay={0.15}>
            <p className="text-warm-gray leading-relaxed text-lg mb-8">
              A Horst & Co. Arquitetura e Interiores é um escritório boutique que desenvolve projetos residenciais, comerciais e de interiores com foco em personalização, elegância e experiência do cliente.
            </p>
            <p className="text-warm-gray leading-relaxed">
              Cada projeto começa com uma escuta profunda. Entendemos não apenas o que nossos clientes precisam, mas quem eles são — seus ritmos, seus sonhos, sua estética. O resultado é sempre singular.
            </p>
            <Link href="/sobre" className="btn-outline mt-10">
              Conheça o escritório <ArrowRight size={14} />
            </Link>
          </AnimateInView>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-off-white">
        <div className="max-w-8xl mx-auto px-6 lg:px-12 py-28 lg:py-40">
          <AnimateInView className="flex items-end justify-between mb-16">
            <div>
              <p className="section-label mb-4">Portfólio</p>
              <h2 className="section-title">Projetos em destaque</h2>
            </div>
            <Link href="/projetos" className="hidden lg:flex items-center gap-2 text-xs tracking-ultra uppercase text-warm-gray hover:text-ink transition-colors">
              Ver todos <ArrowRight size={12} />
            </Link>
          </AnimateInView>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featured.map((project, i) => (
              <AnimateInView key={project.slug} delay={i * 0.1}>
                <Link href={`/projetos/${project.slug}`} className="group block">
                  <div className="relative overflow-hidden bg-sand aspect-[4/3]">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="inline-flex items-center gap-2 text-xs tracking-ultra uppercase text-off-white bg-ink/80 px-4 py-2 backdrop-blur-sm">
                        Ver projeto <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                  <div className="mt-5 flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-2xl text-ink">{project.title}</h3>
                      <p className="mt-1 text-sm text-warm-gray">{project.subtitle}</p>
                    </div>
                    <span className="text-xs text-warm-gray tracking-wide mt-1">{project.category}</span>
                  </div>
                </Link>
              </AnimateInView>
            ))}
          </div>

          <AnimateInView className="mt-12 text-center lg:hidden">
            <Link href="/projetos" className="btn-outline">
              Ver todos os projetos <ArrowRight size={14} />
            </Link>
          </AnimateInView>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-ink text-off-white">
        <div className="max-w-8xl mx-auto px-6 lg:px-12 py-28 lg:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
            <AnimateInView>
              <p className="section-label text-off-white/30 mb-6">O que fazemos</p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-off-white leading-tight">
                Serviços desenhados para cada etapa.
              </h2>
              <Link href="/servicos" className="btn-primary bg-off-white text-ink hover:bg-cream mt-10">
                Saiba mais <ArrowRight size={14} />
              </Link>
            </AnimateInView>

            <AnimateInView delay={0.15}>
              <ul className="divide-y divide-off-white/10">
                {services.map((service, i) => (
                  <li key={service} className="py-5 flex items-center justify-between group">
                    <span className="text-off-white/70 group-hover:text-off-white transition-colors text-lg">
                      {service}
                    </span>
                    <span className="text-off-white/20 text-xs font-mono">
                      0{i + 1}
                    </span>
                  </li>
                ))}
              </ul>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-8xl mx-auto px-6 lg:px-12 py-28 lg:py-40">
        <AnimateInView className="text-center max-w-3xl mx-auto">
          <p className="section-label mb-6">Vamos começar</p>
          <h2 className="section-title mb-8">
            Pronto para criar algo extraordinário?
          </h2>
          <p className="text-warm-gray leading-relaxed text-lg mb-12">
            O primeiro passo é uma conversa. Conte-nos sobre seu projeto e vamos descobrir juntos o que é possível.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contato" className="btn-primary">
              Iniciar projeto <ArrowRight size={14} />
            </Link>
            <a
              href="https://wa.me/5511997049972"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              WhatsApp
            </a>
          </div>
        </AnimateInView>
      </section>
    </>
  )
}
