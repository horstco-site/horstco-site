import Link from 'next/link'

const footerLinks = [
  { href: '/sobre', label: 'Sobre' },
  { href: '/projetos', label: 'Projetos' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/processo', label: 'Processo' },
  { href: '/contato', label: 'Contato' },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-off-white">
      <div className="max-w-8xl mx-auto px-6 lg:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 pb-16 border-b border-off-white/10">
          <div>
            <p className="font-serif text-3xl lg:text-4xl leading-tight">
              Horst & Co.<br />
              <span className="text-off-white/40">Arquitetura e Interiores</span>
            </p>
            <p className="mt-6 text-off-white/50 text-sm leading-relaxed max-w-xs">
              Escritório boutique que desenvolve projetos com foco em personalização, elegância e experiência do cliente.
            </p>
          </div>

          <div>
            <p className="section-label text-off-white/30 mb-6">Navegação</p>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-off-white/50 hover:text-off-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="section-label text-off-white/30 mb-6">Contato</p>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-off-white/30 uppercase tracking-wider mb-1">Endereço</p>
                <p className="text-sm text-off-white/60 leading-relaxed">
                  Thera Office Berrini<br />
                  Av. Eng. Luís Carlos Berrini, 105<br />
                  cj 1613 — São Paulo, SP
                </p>
              </div>
              <div>
                <p className="text-xs text-off-white/30 uppercase tracking-wider mb-1">WhatsApp</p>
                <a
                  href="https://wa.me/5511997049972"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-off-white/60 hover:text-off-white transition-colors"
                >
                  +55 11 99704-9972
                </a>
              </div>
              <div>
                <p className="text-xs text-off-white/30 uppercase tracking-wider mb-1">E-mail</p>
                <a
                  href="mailto:contato@horstco.com.br"
                  className="text-sm text-off-white/60 hover:text-off-white transition-colors"
                >
                  contato@horstco.com.br
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-off-white/25 tracking-wide">
            © {new Date().getFullYear()} Horst & Co. Arquitetura e Interiores. Todos os direitos reservados.
          </p>
          <p className="text-xs text-off-white/20">
            São Paulo, Brasil
          </p>
        </div>
      </div>
    </footer>
  )
}
