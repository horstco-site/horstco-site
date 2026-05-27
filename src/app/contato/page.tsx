'use client'

import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react'
import AnimateInView from '@/components/AnimateInView'

interface FormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

const serviceOptions = [
  'Projeto Residencial',
  'Projeto Comercial',
  'Consultoria',
  'Projeto para Investidor',
  'Consultoria de Compra de Imóveis',
  'Acompanhamento de Obra',
  'Outro',
]

export default function ContatoPage() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setSending(true)
    await new Promise((r) => setTimeout(r, 1000))
    console.log('Form data:', data)
    setSending(false)
    setSubmitted(true)
    reset()
  }

  return (
    <>
      {/* Header */}
      <section className="pt-40 pb-16 lg:pt-48 lg:pb-24 max-w-8xl mx-auto px-6 lg:px-12">
        <AnimateInView>
          <p className="section-label mb-4">Fale conosco</p>
          <h1 className="section-title max-w-2xl">
            Vamos criar algo extraordinário juntos.
          </h1>
        </AnimateInView>
      </section>

      <section className="max-w-8xl mx-auto px-6 lg:px-12 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          {/* Form */}
          <AnimateInView>
            {submitted ? (
              <div className="flex flex-col items-start justify-center h-full py-16">
                <div className="w-12 h-12 bg-ink flex items-center justify-center mb-8">
                  <ArrowRight size={20} className="text-off-white" />
                </div>
                <h2 className="font-serif text-3xl text-ink mb-4">Mensagem recebida.</h2>
                <p className="text-warm-gray leading-relaxed mb-8">
                  Obrigada pelo contato! Entraremos em resposta em até 24 horas úteis.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs tracking-ultra uppercase text-warm-gray hover:text-ink transition-colors"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-ultra uppercase text-warm-gray mb-2">
                      Nome completo <span className="text-gold">*</span>
                    </label>
                    <input
                      {...register('name', { required: 'Campo obrigatório' })}
                      type="text"
                      placeholder="Seu nome"
                      className={`w-full bg-transparent border-b ${
                        errors.name ? 'border-red-400' : 'border-sand'
                      } py-3 text-ink placeholder:text-warm-gray/40 focus:outline-none focus:border-ink transition-colors text-sm`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs tracking-ultra uppercase text-warm-gray mb-2">
                      E-mail <span className="text-gold">*</span>
                    </label>
                    <input
                      {...register('email', {
                        required: 'Campo obrigatório',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'E-mail inválido',
                        },
                      })}
                      type="email"
                      placeholder="seu@email.com"
                      className={`w-full bg-transparent border-b ${
                        errors.email ? 'border-red-400' : 'border-sand'
                      } py-3 text-ink placeholder:text-warm-gray/40 focus:outline-none focus:border-ink transition-colors text-sm`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-ultra uppercase text-warm-gray mb-2">
                      Telefone / WhatsApp
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="+55 11 00000-0000"
                      className="w-full bg-transparent border-b border-sand py-3 text-ink placeholder:text-warm-gray/40 focus:outline-none focus:border-ink transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-ultra uppercase text-warm-gray mb-2">
                      Tipo de projeto
                    </label>
                    <select
                      {...register('service')}
                      className="w-full bg-transparent border-b border-sand py-3 text-ink focus:outline-none focus:border-ink transition-colors text-sm appearance-none cursor-pointer"
                    >
                      <option value="">Selecione...</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-ultra uppercase text-warm-gray mb-2">
                    Conte sobre seu projeto <span className="text-gold">*</span>
                  </label>
                  <textarea
                    {...register('message', { required: 'Campo obrigatório' })}
                    rows={5}
                    placeholder="Descreva brevemente seu projeto, localização, área estimada e expectativas..."
                    className={`w-full bg-transparent border-b ${
                      errors.message ? 'border-red-400' : 'border-sand'
                    } py-3 text-ink placeholder:text-warm-gray/40 focus:outline-none focus:border-ink transition-colors text-sm resize-none`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? 'Enviando...' : 'Enviar mensagem'}
                  {!sending && <ArrowRight size={14} />}
                </button>
              </form>
            )}
          </AnimateInView>

          {/* Info */}
          <AnimateInView delay={0.15} className="space-y-16">
            <div>
              <p className="section-label mb-8">Informações de contato</p>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin size={16} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs tracking-wide uppercase text-warm-gray mb-1">Endereço</p>
                    <p className="text-ink leading-relaxed">
                      Thera Office Berrini<br />
                      Av. Eng. Luís Carlos Berrini, 105<br />
                      Conjunto 1613 — São Paulo, SP
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone size={16} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs tracking-wide uppercase text-warm-gray mb-1">WhatsApp</p>
                    <a
                      href="https://wa.me/5511997049972"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink hover:text-warm-gray transition-colors"
                    >
                      +55 11 99704-9972
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail size={16} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs tracking-wide uppercase text-warm-gray mb-1">E-mail</p>
                    <a
                      href="mailto:contato@horstco.com.br"
                      className="text-ink hover:text-warm-gray transition-colors"
                    >
                      contato@horstco.com.br
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock size={16} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs tracking-wide uppercase text-warm-gray mb-1">Atendimento</p>
                    <p className="text-ink">Segunda a sexta, 9h às 18h</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden bg-sand">
              <Image
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=85&fit=crop"
                alt="Escritório Horst & Co."
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-off-white/70 text-xs tracking-ultra uppercase">Nosso espaço</p>
                <p className="text-off-white font-serif text-lg mt-1">Thera Office Berrini</p>
              </div>
            </div>

            <div className="pt-8 border-t border-sand">
              <p className="text-xs tracking-ultra uppercase text-warm-gray mb-4">Resposta rápida via WhatsApp</p>
              <a
                href="https://wa.me/5511997049972?text=Olá!%20Vim%20pelo%20site%20da%20Horst%20%26%20Co.%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20serviços."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-[#25D366] border-[#25D366] text-white hover:bg-[#1ebe5d] hover:border-[#1ebe5d]"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chamar no WhatsApp
              </a>
            </div>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
