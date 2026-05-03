import type { Metadata } from 'next'
import '../public.css'
import Header from '@/components/public/Header'
import Footer from '@/components/public/Footer'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL('https://dognavi.org'),
  title: {
    default: 'DogNavi — Calculadora de Alimentación Canina Gratis',
    template: '%s | DogNavi',
  },
  description: 'Herramientas inteligentes para dueños responsables. Calcula la porción exacta para tu perro, accede a guías veterinarias y más.',
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
