'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { Card } from '@/components/ui/Card'
import type { Profile } from '@/lib/supabase/types'

const schema = z.object({
  full_name: z.string().min(2, 'Ingresa tu nombre'),
  phone: z.string().optional(),
  country: z.string().min(1),
  notifications_email: z.boolean(),
  notifications_push: z.boolean(),
})
type FormData = z.infer<typeof schema>

const COUNTRIES = [
  { value: 'MX', label: 'México' }, { value: 'ES', label: 'España' },
  { value: 'AR', label: 'Argentina' }, { value: 'CO', label: 'Colombia' },
  { value: 'CL', label: 'Chile' }, { value: 'PE', label: 'Perú' }, { value: 'OTHER', label: 'Otro' },
]

export default function ConfigForm({ profile, userId }: { profile: Profile | null; userId: string }) {
  const router = useRouter()
  const supabase = createClient()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: profile?.full_name ?? '',
      phone: profile?.phone ?? '',
      country: profile?.country ?? 'MX',
      notifications_email: profile?.notifications_email ?? true,
      notifications_push: profile?.notifications_push ?? false,
    },
  })

  async function onSubmit(data: FormData) {
    setError('')
    const { error: updateError } = await supabase
      .from('profiles').update(data).eq('id', userId)
    if (updateError) { setError(updateError.message); return }
    setSuccess(true)
    router.refresh()
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Card>
        <h2 className="font-semibold text-gray-900 mb-4">Datos personales</h2>
        <div className="space-y-4">
          <Input label="Nombre completo" error={errors.full_name?.message} {...register('full_name')} />
          <Input label="Teléfono" type="tel" placeholder="+52 55 1234 5678" {...register('phone')} />
          <Select label="País" options={COUNTRIES} {...register('country')} />
        </div>
      </Card>

      <Card>
        <h2 className="font-semibold text-gray-900 mb-4">Notificaciones</h2>
        <div className="space-y-3">
          {[
            { id: 'notifications_email', label: '📧 Recordatorios por email', key: 'notifications_email' as const },
            { id: 'notifications_push', label: '🔔 Notificaciones push en el navegador', key: 'notifications_push' as const },
          ].map(({ id, label, key }) => (
            <label key={id} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" id={id} className="w-4 h-4 accent-brand-600" {...register(key)} />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </Card>

      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
      {success && <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">✅ Cambios guardados</p>}

      <Button type="submit" loading={isSubmitting} className="w-full">Guardar cambios</Button>
    </form>
  )
}
