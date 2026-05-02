'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, PawPrint, HeartPulse, Settings, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Inicio' },
  { href: '/mascotas', icon: PawPrint, label: 'Mis mascotas' },
  { href: '/salud', icon: HeartPulse, label: 'Salud' },
  { href: '/configuracion', icon: Settings, label: 'Configuración' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-100 p-4 shrink-0">
        <Link href="https://dognavi.org" className="flex items-center gap-2.5 px-3 py-3 mb-4">
          <img src="/images/dognavi_logo.png" alt="DogNavi" className="h-8 w-auto" />
          <span className="font-heading font-bold text-brand-800 text-lg">DogNavi</span>
        </Link>

        <nav className="flex-1 space-y-1">
          {NAV.map(({ href, icon: Icon, label }) => {
            const active = href === '/dashboard' ? pathname === href : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                  active
                    ? 'bg-brand-50 text-brand-800 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <Icon size={18} className={active ? 'text-brand-700' : 'text-gray-400'} />
                {label}
              </Link>
            )
          })}
        </nav>

        <a
          href="https://dognavi.org"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ExternalLink size={13} />
          Volver a dognavi.org
        </a>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40 px-2 py-1 safe-area-pb">
        <div className="flex justify-around">
          {NAV.slice(0, 4).map(({ href, icon: Icon, label }) => {
            const active = href === '/dashboard' ? pathname === href : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all min-w-0',
                  active ? 'text-brand-700' : 'text-gray-400'
                )}
              >
                <Icon size={20} />
                <span className="text-[10px] font-medium truncate">{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
