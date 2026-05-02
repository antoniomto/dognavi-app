import Link from 'next/link'
import type { ReactNode } from 'react'

export const dynamic = 'force-dynamic'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh grid lg:grid-cols-2">
      {/* Panel izquierdo — solo en desktop */}
      <div className="hidden lg:flex flex-col bg-gradient-to-br from-brand-800 to-brand-500 text-white p-12">
        <Link href="https://dognavi.org" className="flex items-center gap-3 mb-12">
          <img src="/images/dognavi_logo.png" alt="DogNavi" className="h-10 w-auto" />
          <span className="font-heading font-bold text-2xl">DogNavi</span>
        </Link>
        <div className="flex-1 flex flex-col justify-center gap-8">
          <div>
            <h1 className="font-heading font-bold text-4xl leading-tight mb-4">
              El historial de salud de tu mascota, siempre contigo
            </h1>
            <p className="text-brand-200 text-lg">
              Registra vacunas, desparasitaciones y visitas al vet. Nunca olvides una fecha importante.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { icon: '💉', text: 'Calendario de vacunas y desparasitación' },
              { icon: '🩺', text: 'Historial completo de visitas al veterinario' },
              { icon: '🔔', text: 'Recordatorios automáticos antes de cada evento' },
              { icon: '🐾', text: 'Perfil completo con foto para cada mascota' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-brand-100">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-brand-300 text-sm">© 2026 DogNavi · dognavi.org</p>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-10 bg-gray-50">
        {/* Logo mobile */}
        <Link href="https://dognavi.org" className="flex items-center gap-2 mb-8 lg:hidden">
          <img src="/images/dognavi_logo.png" alt="DogNavi" className="h-8 w-auto" />
          <span className="font-heading font-bold text-xl text-brand-800">DogNavi</span>
        </Link>
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}
