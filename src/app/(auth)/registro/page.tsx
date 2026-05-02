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

export const dynamic = 'force-dynamic'

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
  const [needsConfirm, setNeedsConfirm] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { country: 'MX' },
  })

  async function onSubmit(data: FormData) {
    setServerError('')
    const { data: signUpData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.full_name, country: data.country },
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })
    if (error) { setServerError(error.message); return }

    // Si Supabase devuelve sesión directa (confirmación de email desactivada), redirigir
    if (signUpData.session) {
      router.push('/dashboard')
      router.refresh()
      return
    }

    // Si no hay sesión, pedir confirmación por email
    setNeedsConfirm(true)
  }

  if (needsConfirm) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">📬</div>
        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-2">Revisa tu email</h2>
        <p className="text-gray-500 mb-6">
          Te enviamos un enlace de confirmación. Haz clic en él para activar tu cuenta.
        </p>
        <Link href="/login" className="text-brand-600 font-semibold hover:underline">
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
        <Link href="/login" className="text-brand-600 font-semibold hover:underline">
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
