import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import UserMenu from './UserMenu'
import MobileMenuToggle from './MobileMenuToggle'

export default async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header>
      <Link href="/" className="logo-container">
        <Image
          src="/images/dognavi_logo.png"
          alt="DogNavi Logo"
          width={80}
          height={80}
          style={{ height: '60px', width: 'auto' }}
          priority
        />
      </Link>

      <nav id="mainNav">
        <Link href="/#inicio">Inicio</Link>
        <Link href="/#calculadora">Calculadora</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/#herramientas">Herramientas</Link>
        <Link href="/#productos">Productos</Link>
      </nav>

      <div className="header-auth">
        {user ? (
          <UserMenu userEmail={user.email ?? ''} />
        ) : (
          <Link href="/login" className="btn-login">
            Iniciar sesión
          </Link>
        )}
      </div>

      <MobileMenuToggle />
    </header>
  )
}
