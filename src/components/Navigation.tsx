'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/projetos', label: 'Projetos' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/processo', label: 'Processo' },
  { href: '/contato', label: 'Contato' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const textColor = isHome && !scrolled ? 'text-off-white' : 'text-ink'
  const bgClass = scrolled
    ? 'bg-off-white/95 backdrop-blur-md shadow-sm'
    : isHome
    ? 'bg-transparent'
    : 'bg-off-white'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgClass}`}
      >
        <div className="max-w-8xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            <Link
              href="/"
              className={`font-serif text-lg lg:text-xl tracking-wide transition-colors duration-300 ${
                scrolled ? 'text-ink' : isHome ? 'text-off-white' : 'text-ink'
              }`}
            >
              Horst & Co.
            </Link>

            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link transition-colors duration-200 ${
                    scrolled
                      ? pathname === link.href
                        ? 'text-ink'
                        : 'text-warm-gray hover:text-ink'
                      : isHome
                      ? pathname === link.href
                        ? 'text-off-white'
                        : 'text-off-white/70 hover:text-off-white'
                      : pathname === link.href
                      ? 'text-ink'
                      : 'text-warm-gray hover:text-ink'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contato" className={`nav-link border px-5 py-2.5 transition-all duration-200 ${
                scrolled
                  ? 'border-ink text-ink hover:bg-ink hover:text-off-white'
                  : isHome
                  ? 'border-off-white text-off-white hover:bg-off-white hover:text-ink'
                  : 'border-ink text-ink hover:bg-ink hover:text-off-white'
              }`}>
                Fale conosco
              </Link>
            </nav>

            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden p-2 transition-colors ${textColor}`}
              aria-label="Abrir menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-ink"
          >
            <div className="flex flex-col h-full px-8 pt-8 pb-12">
              <div className="flex items-center justify-between">
                <Link href="/" className="font-serif text-xl text-off-white tracking-wide">
                  Horst & Co.
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-off-white/70 hover:text-off-white transition-colors"
                  aria-label="Fechar menu"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="flex flex-col gap-1 mt-16">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      className={`block font-serif text-4xl py-3 border-b border-off-white/10 transition-colors ${
                        pathname === link.href
                          ? 'text-off-white'
                          : 'text-off-white/50 hover:text-off-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto">
                <p className="text-off-white/30 text-xs tracking-ultra uppercase">Contato</p>
                <a
                  href="https://wa.me/5511997049972"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-3 text-off-white/60 hover:text-off-white text-sm transition-colors"
                >
                  +55 11 99704-9972
                </a>
                <a
                  href="mailto:contato@horstco.com.br"
                  className="block mt-1 text-off-white/60 hover:text-off-white text-sm transition-colors"
                >
                  contato@horstco.com.br
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
