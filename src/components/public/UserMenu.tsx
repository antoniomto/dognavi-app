'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface UserMenuProps {
  userEmail: string
}

export default function UserMenu({ userEmail }: UserMenuProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.refresh()
    router.push('/')
  }

  const initial = userEmail ? userEmail[0].toUpperCase() : '?'

  return (
    <div className="user-menu-wrapper">
      <button
        className="user-avatar-btn"
        onClick={() => setOpen(!open)}
        aria-label="Menu de usuario"
        aria-expanded={open}
      >
        {initial}
      </button>

      {open && (
        <>
          {/* Overlay to close on outside click */}
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 1005 }}
            onClick={() => setOpen(false)}
          />
          <div className="user-dropdown" style={{ zIndex: 1010 }}>
            <div style={{ padding: '0.6rem 1.2rem', fontSize: '0.82rem', color: '#999', borderBottom: '1px solid #f0f0f0' }}>
              {userEmail}
            </div>
            <Link href="/dashboard" onClick={() => setOpen(false)}>
              🏠 Ir al dashboard
            </Link>
            <hr className="user-dropdown-divider" />
            <button onClick={handleSignOut}>
              🚪 Cerrar sesión
            </button>
          </div>
        </>
      )}
    </div>
  )
}
