import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'DogNavi App', template: '%s | DogNavi' },
  description: 'Gestiona la salud de tu mascota: vacunas, desparasitación y más.',
  metadataBase: new URL('https://app.dognavi.org'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
