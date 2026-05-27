import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimateInView from '@/components/AnimateInView'

export const metadata: Metadata = {
  title: 'Sobre',
  description:
    'Conheça a Horst & Co. Arquitetura e Interiores e a trajetória de Giovanna Horst, fundadora e principal arquiteta do escritório boutique em São Paulo.',
}

const values = [
  {
    title: 'Personalização',
    description:
      'Cada projeto nasce de uma escuta profunda. Não existem fórmulas — apenas soluções únicas para cada cliente.',
  },
  {
    title: 'Atemporalidade',
    description:
      'Projetamos para durar. Escolhemos materiais, formas e conceitos que transcendem tendências passageiras.',
  },
  {
    title: 'Experiência',
    description:
      'O processo é tão importante quanto o resultado. Guiamos nossos clientes com transparência em cada etapa.',
  },
  {
    title: 'Excelência',
    description:
      'O padrão mínimo é o extraordinário. Cada detalhe importa, cada decisão é tomada com intenção.',
  },
]

const team = [
  {
    name: 'Giovanna Horst',
    role: 'Fundadora & Arquiteta Principal',
    bio: 'Arquiteta e urbanista com especialização em design de interiores e gestão de projetos de alto padrão. Com mais de uma década de experiência, Giovanna fundou a Horst & Co. com a missão de criar espaços que contem histórias e transformem a vida de quem os habita.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=85&fit=crop&crop=face',
  },
]

export default function SobrePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1800&q=85&fit=crop"
            alt="Escritório Horst & Co."
            fill
            priority
            className="object-cover opacity-50"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        </div>
        <div className="relative z-10 max-w-8xl mx-auto px-6 lg:px-12 pb-16 lg:pb-24 w-full">
          <p className="section-label text-off-white/40 mb-4">Sobre nós</p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-off-white leading-tight max-w-3xl">
            Um escritório com propósito.
          </h1>
        </div>
      </section>

      {/* Manifesto */}
      <section className="max-w-8xl mx-auto px-6 lg:px-12 py-28 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <AnimateInView className="lg:col-span-5">
            <p className="section-label mb-6">Nossa história</p>
            <h2 className="section-title">
              Nascemos da crença de que espaços transformam vidas.
            </h2>
          </AnimateInView>
          <AnimateInView delay={0.15} className="lg:col-span-7 lg:pt-16">
            <p className="text-warm-gray leading-relaxed text-lg mb-6">
              A Horst & Co. Arquitetura e Interiores é um escritório boutique que desenvolve projetos residenciais, comerciais e de interiores com foco em personalização, elegância e experiência do cliente.
            </p>
            <p className="text-warm-gray leading-relaxed mb-6">
              Fundada por Giovanna Horst, o escritório nasceu da convicção de que arquitetura de excelência deve ir além da estética — deve criar experiências sensoriais, emocionais e funcionais que perdurem ao longo do tempo.
            </p>
            <p className="text-warm-gray leading-relaxed">
              Com sede em São Paulo, atendemos clientes em todo o Brasil com a mesma dedicação e atenção aos detalhes que nos tornaram referência no mercado de alto padrão.
            </p>
          </AnimateInView>
        </div>
      </section>

      {/* Full Image */}
      <section className="max-w-8xl mx-auto px-6 lg:px-12 pb-12">
        <AnimateInView>
          <div className="relative aspect-[16/7] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1800&q=85&fit=crop"
              alt="Projeto Horst & Co."
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </AnimateInView>
      </section>

      {/* Values */}
      <section className="bg-cream">
        <div className="max-w-8xl mx-auto px-6 lg:px-12 py-28 lg:py-40">
          <AnimateInView className="mb-16">
            <p className="section-label mb-4">Nossos pilares</p>
            <h2 className="section-title max-w-lg">O que nos move e nos define.</h2>
          </AnimateInView>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <AnimateInView key={value.title} delay={i * 0.1}>
                <div className="border-t border-sand-dark pt-8">
                  <span className="text-xs font-mono text-warm-gray/50 mb-4 block">0{i + 1}</span>
                  <h3 className="font-serif text-2xl text-ink mb-4">{value.title}</h3>
                  <p className="text-warm-gray text-sm leading-relaxed">{value.description}</p>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-8xl mx-auto px-6 lg:px-12 py-28 lg:py-40">
        <AnimateInView className="mb-16">
          <p className="section-label mb-4">A equipe</p>
          <h2 className="section-title">Quem está por trás.</h2>
        </AnimateInView>

        {team.map((member, i) => (
          <AnimateInView key={member.name} delay={i * 0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <h3 className="font-serif text-4xl lg:text-5xl text-ink mb-2">{member.name}</h3>
                <p className="text-xs tracking-ultra uppercase text-warm-gray mb-8">{member.role}</p>
                <p className="text-warm-gray leading-relaxed text-lg">{member.bio}</p>
                <div className="mt-12 pt-8 border-t border-sand">
                  <p className="text-xs tracking-ultra uppercase text-warm-gray mb-4">Formação</p>
                  <ul className="space-y-2 text-sm text-charcoal">
                    <li>Arquitetura e Urbanismo — USP</li>
                    <li>Especialização em Design de Interiores — FAAP</li>
                    <li>Gestão de Projetos de Alto Padrão — ISAE</li>
                  </ul>
                </div>
              </div>
            </div>
          </AnimateInView>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-ink text-off-white">
        <div className="max-w-8xl mx-auto px-6 lg:px-12 py-24 text-center">
          <AnimateInView>
            <h2 className="font-serif text-4xl lg:text-5xl text-off-white mb-6">
              Vamos criar algo juntos?
            </h2>
            <p className="text-off-white/50 mb-10 max-w-md mx-auto">
              O primeiro passo é uma conversa. Entre em contato e descubra como podemos transformar o seu espaço.
            </p>
            <Link href="/contato" className="btn-primary bg-off-white text-ink hover:bg-cream">
              Iniciar projeto <ArrowRight size={14} />
            </Link>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
