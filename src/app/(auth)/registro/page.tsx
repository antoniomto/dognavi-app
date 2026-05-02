'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'

const schema = z.object({
  full_name: z.string().min(2, 'Ingresa tu nombre'),
  email: z.string().email('Email no válido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  country: z.string().min(1, 'Selecciona tu país'),
})
type FormData = z.infer<typeof schema>

const COUNTRIES = [
  { value: 'MX', label: 'México' },
  { value: 'ES', label: 'España' },
  { value: 'AR', label: 'Argentina' },
  { value: 'CO', label: 'Colombia' },
  { value: 'CL', label: 'Chile' },
  { value: 'PE', label: 'Perú' },
  { value: 'OTHER', label: 'Otro país' },
]

export default function RegistroPage() {
  const router = useRouter()
  const supabase = createClient()
  const [serverError, setServerError] = useState('')
  const [success, setSuccess] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { country: 'MX' },
  })

  async function onSubmit(data: FormData) {
    setServerError('')
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.full_name, country: data.country },
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })
    if (error) { setServerError(error.message); return }
    setSuccess(true)
  }

  async function signUpWithGoogle() {
    setGoogleLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/api/auth/callback` },
    })
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">📬</div>
        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-2">Revisa tu email</h2>
        <p className="text-gray-500 mb-6">
          Te enviamos un enlace de confirmación. Haz clic en él para activar tu cuenta.
        </p>
        <Link href="/login" className="text-brand-700 font-semibold hover:underline">
          Volver al login
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading font-bold text-3xl text-gray-900 mb-2">Crear cuenta gratis</h1>
        <p className="text-gray-500">El historial de salud de tu mascota, siempre contigo</p>
      </div>

      <Button variant="secondary" className="w-full mb-4" loading={googleLoading} onClick={signUpWithGoogle}>
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Registrarse con Google
      </Button>

      <div className="flex items-center gap-3 my-4">
        <hr className="flex-1 border-gray-200" />
        <span className="text-xs text-gray-400">o con email</span>
        <hr className="flex-1 border-gray-200" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Tu nombre" placeholder="Juan García" error={errors.full_name?.message} {...register('full_name')} />
        <Input label="Email" type="email" placeholder="tu@email.com" error={errors.email?.message} {...register('email')} />
        <Input label="Contraseña" type="password" placeholder="Mínimo 6 caracteres" error={errors.password?.message} {...register('password')} />
        <Select
          label="País"
          options={COUNTRIES}
          error={errors.country?.message}
          {...register('country')}
        />

        {serverError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {serverError}
          </p>
        )}

        <Button type="submit" className="w-full" loading={isSubmitting}>
          Crear cuenta gratis
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="text-brand-700 font-semibold hover:underline">
          Inicia sesión
        </Link>
      </p>
      <p className="mt-3 text-center text-xs text-gray-400">
        Al registrarte aceptas nuestros{' '}
        <a href="https://dognavi.org/aviso-legal.html" className="hover:underline" target="_blank">términos</a>
        {' '}y{' '}
        <a href="https://dognavi.org/privacidad.html" className="hover:underline" target="_blank">política de privacidad</a>.
      </p>
    </div>
  )
}
