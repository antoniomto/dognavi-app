'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface TopBarProps {
  user: { email: string; name?: string | null; avatar?: string | null }
}

export default function TopBar({ user }: TopBarProps) {
  const router = useRouter()
  const supabase = createClient()
  const [open, setOpen] = useState(false)

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user.email[0].toUpperCase()

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 shrink-0">
      <div className="md:hidden flex items-center gap-2">
        <img src="/images/dognavi_logo.png" alt="DogNavi" className="h-7 w-auto" />
        <span className="font-heading font-bold text-brand-800">DogNavi</span>
      </div>
      <div className="flex-1 hidden md:block" />

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-50 transition-colors"
        >
          {user.avatar ? (
            <img src={user.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
          ) : (
            <div className="h-8 w-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-bold">
              {initials}
            </div>
          )}
          <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[120px] truncate">
            {user.name ?? user.email}
          </span>
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl border border-gray-100 shadow-modal z-20 overflow-hidden">
              <div className="px-3 py-2.5 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-900 truncate">{user.name ?? '—'}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
              <button
                onClick={signOut}
                className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={14} />
                Cerrar sesión
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
