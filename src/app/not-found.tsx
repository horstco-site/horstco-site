import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-mono text-xs text-warm-gray tracking-ultra uppercase mb-8">404</p>
        <h1 className="font-serif text-5xl lg:text-7xl text-ink mb-6">
          Página não encontrada.
        </h1>
        <p className="text-warm-gray mb-12 max-w-md mx-auto">
          A página que você procura não existe ou foi removida.
        </p>
        <Link href="/" className="btn-outline inline-flex">
          <ArrowLeft size={14} /> Voltar ao início
        </Link>
      </div>
    </div>
  )
}
