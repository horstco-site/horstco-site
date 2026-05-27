import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimateInView from '@/components/AnimateInView'

export const metadata: Metadata = {
  title: 'Processo',
  description:
    'Conheça o processo de trabalho da Horst & Co. — da reunião inicial à entrega final, cada etapa é desenhada para garantir a excelência do projeto.',
}

const steps = [
  {
    number: '01',
    title: 'Reunião Inicial',
    description:
      'Tudo começa com uma conversa. Entendemos suas necessidades, expectativas e o escopo geral do projeto. Apresentamos o escritório, nossa metodologia e estabelecemos as bases para uma parceria de confiança.',
    duration: '1 encontro',
  },
  {
    number: '02',
    title: 'Psicobriefing & Experiência',
    description:
      'Nossa abordagem diferenciada de briefing vai além das questões técnicas. Investigamos o estilo de vida, as referências estéticas, os rituais cotidianos e as aspirações de nossos clientes para criar projetos verdadeiramente personalizados.',
    duration: '1–2 encontros',
  },
  {
    number: '03',
    title: 'Estudo Preliminar',
    description:
      'Apresentamos as primeiras diretrizes conceituais do projeto — plantas baixas esquemáticas, referências visuais, paleta de materiais e o conceito geral. Esta etapa define a identidade do projeto.',
    duration: '2–3 semanas',
  },
  {
    number: '04',
    title: 'Viabilidade Financeira',
    description:
      'Apresentamos uma estimativa de custos alinhada ao conceito aprovado. Trabalhamos em transparência para garantir que o projeto seja viável dentro do orçamento do cliente, sem comprometer a qualidade.',
    duration: '1 semana',
  },
  {
    number: '05',
    title: 'Anteprojeto',
    description:
      'Com o conceito e orçamento aprovados, desenvolvemos o anteprojeto completo — plantas, cortes, elevações, perspectivas e especificações preliminares. O cliente visualiza seu projeto com clareza.',
    duration: '3–6 semanas',
  },
  {
    number: '06',
    title: 'Projeto Legal e Complementares',
    description:
      'Desenvolvemos e coordenamos todos os projetos necessários para aprovação e execução: estrutural, elétrico, hidráulico, ar-condicionado e automação residencial.',
    duration: '4–8 semanas',
  },
  {
    number: '07',
    title: 'Projeto Executivo',
    description:
      'O detalhamento técnico completo do projeto — pranchas executivas, especificações de todos os materiais e acabamentos, memoriais descritivos e tudo que a equipe de obra precisa para executar com excelência.',
    duration: '4–8 semanas',
  },
  {
    number: '08',
    title: 'Orçamentos e Visitas',
    description:
      'Auxiliamos na cotação e seleção de fornecedores, construtoras e profissionais especializados. Visitamos showrooms e fábricas com o cliente para escolha de materiais especiais.',
    duration: '2–4 semanas',
  },
  {
    number: '09',
    title: 'Acompanhamento de Obra',
    description:
      'Visitas periódicas para garantir que a execução seja fiel ao projeto, com relatórios regulares, aprovação de materiais e interface com todos os envolvidos na obra.',
    duration: 'Durante a obra',
  },
  {
    number: '10',
    title: 'Entrega Final',
    description:
      'O momento que torna tudo possível — a entrega do espaço transformado. Realizamos o styling final, o making of do projeto e entregamos as chaves com um guia completo de manutenção do imóvel.',
    duration: 'Conclusão',
  },
]

export default function ProcessoPage() {
  return (
    <>
      {/* Header */}
      <section className="relative h-[60vh] min-h-[450px] flex items-end bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1574691250077-03a929faece5?w=1800&q=85&fit=crop"
            alt="Processo Horst & Co."
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        </div>
        <div className="relative z-10 max-w-8xl mx-auto px-6 lg:px-12 pb-16 lg:pb-24 w-full">
          <p className="section-label text-off-white/40 mb-4">Metodologia</p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-off-white leading-tight max-w-3xl">
            Como trabalhamos.
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-8xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          <AnimateInView>
            <h2 className="section-title">
              Um processo desenhado para a sua tranquilidade.
            </h2>
          </AnimateInView>
          <AnimateInView delay={0.15} className="lg:pt-4">
            <p className="text-warm-gray leading-relaxed text-lg mb-6">
              Na Horst & Co., acreditamos que um projeto excelente começa com um processo excelente. Nossa metodologia foi desenvolvida para garantir clareza, transparência e qualidade em cada etapa da jornada.
            </p>
            <p className="text-warm-gray leading-relaxed">
              Guiamos nossos clientes com segurança desde a primeira conversa até a entrega final — sem surpresas, sem improviso, com toda a expertise e cuidado que cada projeto merece.
            </p>
          </AnimateInView>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-8xl mx-auto px-6 lg:px-12 pb-32">
        <div className="divide-y divide-sand">
          {steps.map((step, i) => (
            <AnimateInView key={step.number} delay={0.05}>
              <div className="py-10 grid grid-cols-12 gap-6 lg:gap-12 group hover:bg-cream/50 -mx-6 px-6 lg:-mx-12 lg:px-12 transition-colors duration-300 rounded-sm">
                <div className="col-span-2 lg:col-span-1">
                  <span className="text-xs font-mono text-warm-gray/40">{step.number}</span>
                </div>
                <div className="col-span-10 lg:col-span-4">
                  <h3 className="font-serif text-2xl lg:text-3xl text-ink">{step.title}</h3>
                </div>
                <div className="col-span-12 lg:col-span-5 col-start-1 lg:col-start-auto">
                  <p className="text-warm-gray leading-relaxed">{step.description}</p>
                </div>
                <div className="col-span-12 lg:col-span-2 text-right hidden lg:block">
                  <span className="text-xs tracking-wide uppercase text-warm-gray/50">{step.duration}</span>
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream">
        <div className="max-w-8xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <AnimateInView className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="section-title">O que guia cada decisão.</h2>
          </AnimateInView>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Escuta ativa', text: 'Entendemos o cliente antes de propor qualquer solução. O projeto nasce do diálogo.' },
              { title: 'Transparência total', text: 'Prazos, custos e processos são comunicados com clareza em todas as etapas.' },
              { title: 'Excelência na entrega', text: 'O padrão de qualidade é inegociável — do conceito ao último detalhe de acabamento.' },
            ].map((item, i) => (
              <AnimateInView key={item.title} delay={i * 0.1}>
                <div className="text-center px-4">
                  <h3 className="font-serif text-2xl text-ink mb-4">{item.title}</h3>
                  <p className="text-warm-gray text-sm leading-relaxed">{item.text}</p>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-8xl mx-auto px-6 lg:px-12 py-24 text-center">
        <AnimateInView>
          <h2 className="font-serif text-4xl lg:text-5xl text-ink mb-6">
            Pronto para dar o primeiro passo?
          </h2>
          <p className="text-warm-gray mb-10 max-w-md mx-auto">
            A primeira reunião é sem compromisso. Vamos conversar sobre o seu projeto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contato" className="btn-primary">
              Agendar reunião <ArrowRight size={14} />
            </Link>
            <Link href="/servicos" className="btn-outline">
              Ver serviços
            </Link>
          </div>
        </AnimateInView>
      </section>
    </>
  )
}
