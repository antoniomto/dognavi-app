import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Pencil } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { SPECIES_LABELS, EVENT_TYPE_LABELS, petAge, formatDate, daysUntil, urgencyColor } from '@/lib/utils'
import AddEventButton from '@/components/health/AddEventButton'
import type { Pet, HealthEvent } from '@/lib/supabase/types'

export const dynamic = 'force-dynamic'

export default async function MascotaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: petData } = await supabase
    .from('pets')
    .select('*')
    .eq('id', id)
    .eq('owner_id', user!.id)
    .is('deleted_at', null)
    .single()

  const pet = petData as Pet | null
  if (!pet) notFound()

  const { data: eventsData } = await supabase
    .from('health_events')
    .select('*')
    .eq('pet_id', id)
    .is('deleted_at', null)
    .order('event_date', { ascending: false })
    .limit(20)

  const events = eventsData as HealthEvent[] | null

  const upcomingEvents = events?.filter(e => e.next_date).sort(
    (a, b) => new Date(a.next_date!).getTime() - new Date(b.next_date!).getTime()
  ) ?? []

  return (
    <div className="max-w-2xl mx-auto pb-20 md:pb-0 space-y-6">
      {/* Back + Edit */}
      <div className="flex items-center justify-between">
        <Link href="/mascotas" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft size={15} /> Mis mascotas
        </Link>
        <Link href={`/mascotas/${id}/editar`}>
          <Button size="sm" variant="secondary"><Pencil size={13} /> Editar</Button>
        </Link>
      </div>

      {/* Header mascota */}
      <Card className="flex items-center gap-5 p-5">
        {pet.photo_url ? (
          <img src={pet.photo_url} alt={pet.name} className="w-20 h-20 rounded-2xl object-cover shrink-0" />
        ) : (
          <div className="w-20 h-20 rounded-2xl bg-brand-50 flex items-center justify-center text-4xl shrink-0">
            {SPECIES_LABELS[pet.species]?.split(' ')[0]}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="font-heading font-bold text-2xl text-gray-900">{pet.name}</h1>
          <p className="text-gray-500">{pet.breed ?? SPECIES_LABELS[pet.species]}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {pet.birth_date && <Badge variant="blue">{petAge(pet.birth_date)}</Badge>}
            {pet.sex !== 'unknown' && <Badge variant="gray">{pet.sex === 'male' ? 'Macho' : 'Hembra'}</Badge>}
            {pet.neutered && <Badge variant="green">Castrado/a</Badge>}
            {pet.weight_kg && <Badge variant="gray">{pet.weight_kg} kg</Badge>}
          </div>
        </div>
      </Card>

      {/* Datos adicionales */}
      {(pet.chip_number || pet.notes) && (
        <Card>
          <h2 className="font-semibold text-gray-900 mb-3">Información adicional</h2>
          <div className="space-y-2 text-sm">
            {pet.chip_number && (
              <div className="flex gap-2">
                <span className="text-gray-500 w-24 shrink-0">Microchip:</span>
                <span className="text-gray-700 font-mono">{pet.chip_number}</span>
              </div>
            )}
            {pet.notes && (
              <div className="flex gap-2">
                <span className="text-gray-500 w-24 shrink-0">Notas:</span>
                <span className="text-gray-700">{pet.notes}</span>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Próximos eventos */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading font-semibold text-gray-900">Salud y calendario</h2>
          <AddEventButton petId={pet.id} userId={user!.id} />
        </div>

        {upcomingEvents.length > 0 && (
          <div className="space-y-2 mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Próximos</p>
            {upcomingEvents.slice(0, 3).map(event => {
              const days = daysUntil(event.next_date!)
              const colorClass = urgencyColor(days)
              return (
                <Card key={event.id} className={`flex items-center gap-3 p-3.5 border ${colorClass.split(' ').slice(2).join(' ')}`}>
                  <div className={`px-2.5 py-1.5 rounded-xl text-center min-w-[52px] ${colorClass}`}>
                    <p className="font-heading font-bold text-base leading-none">{Math.abs(days)}</p>
                    <p className="text-[10px] font-medium">{days < 0 ? 'venc.' : days === 0 ? 'hoy' : 'días'}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-500">{formatDate(event.next_date!)}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        )}

        {/* Historial */}
        {events && events.filter(e => e.event_date).length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Historial</p>
            {events.filter(e => e.event_date).map(event => (
              <Card key={event.id} className="flex items-center gap-3 p-3.5">
                <span className="text-xl w-8 text-center">
                  {EVENT_TYPE_LABELS[event.event_type]?.split(' ')[0]}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900">{event.title}</p>
                  <p className="text-xs text-gray-500">
                    {event.event_date && formatDate(event.event_date)}
                    {event.vet_clinic && ` · ${event.vet_clinic}`}
                  </p>
                </div>
                {event.cost && (
                  <p className="text-sm text-gray-600 shrink-0">
                    {event.currency} {event.cost.toLocaleString()}
                  </p>
                )}
              </Card>
            ))}
          </div>
        )}

        {(!events || events.length === 0) && (
          <Card className="text-center py-8">
            <p className="text-3xl mb-2">💉</p>
            <p className="text-sm text-gray-500">Aún no hay eventos registrados</p>
            <p className="text-xs text-gray-400 mt-1">Agrega la primera vacuna o visita al vet</p>
          </Card>
        )}
      </div>
    </div>
  )
}
