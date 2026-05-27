import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import AnimateInView from '@/components/AnimateInView'

export const metadata: Metadata = {
  title: 'Serviços',
  description:
    'Conheça todos os serviços da Horst & Co.: projeto residencial, comercial, consultoria, projetos para investidores, consultoria de compra de imóveis e acompanhamento de obra.',
}

const services = [
  {
    number: '01',
    title: 'Projeto Residencial',
    description:
      'Projetos completos para residências — apartamentos, casas e coberturas — desenvolvidos com total personalização e atenção a cada detalhe do estilo de vida do cliente.',
    includes: [
      'Levantamento e estudo do espaço',
      'Conceito e paleta de materiais',
      'Projeto de arquitetura e interiores',
      'Especificação de mobiliário e acabamentos',
      'Projeto de iluminação',
      'Acompanhamento de execução',
    ],
    image:
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=85&fit=crop',
  },
  {
    number: '02',
    title: 'Projeto Comercial',
    description:
      'Espaços comerciais que traduzem a identidade da marca em arquitetura — lojas, escritórios, restaurantes e espaços de hospitalidade com design estratégico.',
    includes: [
      'Briefing e identidade espacial',
      'Projeto de layout e fluxo',
      'Identidade visual aplicada ao espaço',
      'Projeto de comunicação visual',
      'Especificação de materiais',
      'Coordenação de execução',
    ],
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85&fit=crop',
  },
  {
    number: '03',
    title: 'Consultoria',
    description:
      'Para clientes que precisam de orientação pontual: revisão de projeto, seleção de materiais, layout de ambientes ou curadoria de mobiliário.',
    includes: [
      'Análise do projeto atual',
      'Recomendações estratégicas',
      'Seleção de materiais e fornecedores',
      'Curadoria de mobiliário',
      'Relatório detalhado de diretrizes',
    ],
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=85&fit=crop',
  },
  {
    number: '04',
    title: 'Projeto para Investidor',
    description:
      'Projetos desenvolvidos com foco em valorização do imóvel e atratividade para locação — equilibrando estética, durabilidade e retorno sobre investimento.',
    includes: [
      'Análise de potencial de valorização',
      'Projeto com foco em ROI',
      'Materiais de alta durabilidade',
      'Design atrativo para plataformas',
      'Gestão de orçamento e execução',
    ],
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=85&fit=crop',
  },
  {
    number: '05',
    title: 'Consultoria de Compra de Imóveis',
    description:
      'Avaliamos o potencial arquitetônico e de reforma de imóveis antes da compra, ajudando o cliente a tomar a melhor decisão com embasamento técnico e estético.',
    includes: [
      'Visita técnica ao imóvel',
      'Análise do potencial de reforma',
      'Estimativa de custos de adequação',
      'Estudo de viabilidade',
      'Relatório de recomendação',
    ],
    image:
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=900&q=85&fit=crop',
  },
  {
    number: '06',
    title: 'Acompanhamento de Obra',
    description:
      'Supervisão técnica durante a execução para garantir fidelidade ao projeto, qualidade dos acabamentos e cumprimento de prazos.',
    includes: [
      'Visitas periódicas à obra',
      'Relatórios de progresso',
      'Aprovação de amostras de materiais',
      'Interface com construtora e fornecedores',
      'Controle de qualidade e prazos',
    ],
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=85&fit=crop',
  },
]

export default function ServicosPage() {
  return (
    <>
      {/* Header */}
      <section className="relative h-[60vh] min-h-[450px] flex items-end bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&q=85&fit=crop"
            alt="Serviços Horst & Co."
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        </div>
        <div className="relative z-10 max-w-8xl mx-auto px-6 lg:px-12 pb-16 lg:pb-24 w-full">
          <p className="section-label text-off-white/40 mb-4">O que oferecemos</p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-off-white leading-tight max-w-3xl">
            Serviços para cada etapa do seu projeto.
          </h1>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-8xl mx-auto px-6 lg:px-12 py-24 lg:py-40">
        <div className="space-y-32">
          {services.map((service, i) => (
            <AnimateInView key={service.number} delay={0.05}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <span className="text-xs font-mono text-warm-gray/40 block mb-6">{service.number}</span>
                  <h2 className="font-serif text-4xl lg:text-5xl text-ink mb-6">{service.title}</h2>
                  <p className="text-warm-gray leading-relaxed text-lg mb-10">{service.description}</p>
                  <div>
                    <p className="text-xs tracking-ultra uppercase text-warm-gray mb-5">O que inclui</p>
                    <ul className="space-y-3">
                      {service.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-charcoal">
                          <Check size={14} className="text-gold flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={`relative aspect-[4/3] overflow-hidden ${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-off-white">
        <div className="max-w-8xl mx-auto px-6 lg:px-12 py-24 text-center">
          <AnimateInView>
            <h2 className="font-serif text-4xl lg:text-5xl text-off-white mb-6">
              Pronto para começar?
            </h2>
            <p className="text-off-white/50 mb-10 max-w-md mx-auto">
              Agende uma reunião inicial e descubra como podemos ajudar no seu projeto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato" className="btn-primary bg-off-white text-ink hover:bg-cream">
                Solicitar proposta <ArrowRight size={14} />
              </Link>
              <Link href="/processo" className="btn-outline border-off-white/30 text-off-white hover:bg-off-white hover:text-ink">
                Como trabalhamos
              </Link>
            </div>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
