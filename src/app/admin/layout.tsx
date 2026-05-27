import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'Admin | Horst & Co.', template: '%s | Admin Horst & Co.' },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#F5F0E8]">{children}</div>
}
