import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  metadataBase: new URL('https://horstco.com.br'),
  title: {
    default: 'Horst & Co. Arquitetura e Interiores | São Paulo',
    template: '%s | Horst & Co. Arquitetura',
  },
  description:
    'Escritório boutique de arquitetura e interiores comandado por Giovanna Horst. Projetos residenciais, comerciais e de interiores com foco em personalização, elegância e experiência do cliente em São Paulo.',
  keywords: [
    'arquitetura',
    'interiores',
    'São Paulo',
    'escritório boutique',
    'Giovanna Horst',
    'projeto residencial',
    'projeto comercial',
    'decoração',
    'alto padrão',
  ],
  authors: [{ name: 'Horst & Co. Arquitetura e Interiores' }],
  creator: 'Horst & Co. Arquitetura e Interiores',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://horstco.com.br',
    siteName: 'Horst & Co. Arquitetura e Interiores',
    title: 'Horst & Co. Arquitetura e Interiores',
    description:
      'Escritório boutique de arquitetura e interiores. Redefinindo o conceito de exclusividade.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Horst & Co. Arquitetura e Interiores',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Horst & Co. Arquitetura e Interiores',
    description: 'Redefinindo o conceito de exclusividade.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
