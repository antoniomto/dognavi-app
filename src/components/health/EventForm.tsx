'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { addDays, format } from 'date-fns'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { EVENT_TYPE_LABELS, EVENT_TYPE_INTERVALS } from '@/lib/utils'

const schema = z.object({
  event_type: z.enum(['vaccine', 'deworming', 'vet_visit', 'grooming', 'medication', 'surgery', 'test', 'custom']),
  title: z.string().min(1, 'Describe el evento'),
  event_date: z.string().optional(),
  next_date: z.string().optional(),
  vet_name: z.string().optional(),
  vet_clinic: z.string().optional(),
  cost: z.string().optional(),
  notes: z.string().optional(),
  reminder_days: z.string().default('7'),
})
type FormData = z.infer<typeof schema>

const EVENT_TYPE_OPTIONS = Object.entries(EVENT_TYPE_LABELS).map(([value, label]) => ({ value, label }))
const REMINDER_OPTIONS = [
  { value: '3', label: '3 días antes' },
  { value: '7', label: '1 semana antes' },
  { value: '14', label: '2 semanas antes' },
  { value: '30', label: '1 mes antes' },
]

interface EventFormProps {
  petId: string
  userId: string
  onSuccess: () => void
}

export default function EventForm({ petId, userId, onSuccess }: EventFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [error, setError] = useState('')

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      event_type: 'vaccine',
      reminder_days: '7',
      event_date: format(new Date(), 'yyyy-MM-dd'),
    },
  })

  const eventType = watch('event_type')
  const eventDate = watch('event_date')

  // Auto-sugerir fecha próxima cuando cambia el tipo o fecha realizada
  function autoFillNextDate(type: string, dateStr: string) {
    const interval = EVENT_TYPE_INTERVALS[type]
    if (interval && dateStr) {
      const suggested = format(addDays(new Date(dateStr), interval), 'yyyy-MM-dd')
      setValue('next_date', suggested)
    }
  }

  async function onSubmit(data: FormData) {
    setError('')
    const { error: insertError } = await supabase.from('health_events').insert({
      pet_id: petId,
      owner_id: userId,
      event_type: data.event_type,
      title: data.title,
      event_date: data.event_date || null,
      next_date: data.next_date || null,
      vet_name: data.vet_name || null,
      vet_clinic: data.vet_clinic || null,
      cost: data.cost ? parseFloat(data.cost) : null,
      description: data.notes || null,
      reminder_days: parseInt(data.reminder_days),
    })
    if (insertError) { setError(insertError.message); return }
    router.refresh()
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Select
        label="Tipo de evento *"
        options={EVENT_TYPE_OPTIONS}
        error={errors.event_type?.message}
        {...register('event_type', {
          onChange: (e) => autoFillNextDate(e.target.value, eventDate ?? '')
        })}
      />

      <Input
        label="Descripción *"
        placeholder={eventType === 'vaccine' ? 'Ej: Vacuna antirrábica' : eventType === 'deworming' ? 'Ej: Desparasitación interna' : 'Describe el evento'}
        error={errors.title?.message}
        {...register('title')}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Fecha realizada"
          type="date"
          {...register('event_date', {
            onChange: (e) => autoFillNextDate(eventType, e.target.value)
          })}
        />
        <Input
          label="Próxima fecha"
          type="date"
          hint="Se sugiere automáticamente"
          {...register('next_date')}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input label="Veterinario" placeholder="Dr. García" {...register('vet_name')} />
        <Input label="Clínica" placeholder="Clínica Animal" {...register('vet_clinic')} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input label="Costo" type="number" placeholder="350" {...register('cost')} />
        <Select label="Recordatorio" options={REMINDER_OPTIONS} {...register('reminder_days')} />
      </div>

      <div>
        <label className="label">Notas</label>
        <textarea className="input-base resize-none" rows={2} placeholder="Observaciones adicionales..." {...register('notes')} />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
      )}

      <Button type="submit" className="w-full" loading={isSubmitting}>
        Guardar evento
      </Button>
    </form>
  )
}
