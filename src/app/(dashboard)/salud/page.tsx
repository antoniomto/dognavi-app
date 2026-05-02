import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { daysUntil, formatDate, urgencyColor, EVENT_TYPE_LABELS, SPECIES_LABELS } from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Calendario de salud' }

type EventWithPet = {
  id: string
  event_type: string
  title: string
  next_date: string | null
  event_date: string | null
  vet_clinic: string | null
  reminder_days: number
  pets: { name: string; species: string; photo_url: string | null } | null
}

export default async function SaludPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const today = new Date().toISOString().split('T')[0]
  const in90Days = new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0]

  const { data: upcoming } = await supabase
    .from('health_events')
    .select('*, pets(name, species, photo_url)')
    .eq('owner_id', user!.id)
    .is('deleted_at', null)
    .not('next_date', 'is', null)
    .order('next_date', { ascending: true }) as { data: EventWithPet[] | null }

  const { data: history } = await supabase
    .from('health_events')
    .select('*, pets(name, species, photo_url)')
    .eq('owner_id', user!.id)
    .is('deleted_at', null)
    .not('event_date', 'is', null)
    .order('event_date', { ascending: false })
    .limit(20) as { data: EventWithPet[] | null }

  const overdue = upcoming?.filter(e => e.next_date && daysUntil(e.next_date) < 0) ?? []
  const soon = upcoming?.filter(e => e.next_date && daysUntil(e.next_date) >= 0 && daysUntil(e.next_date) <= 30) ?? []
  const later = upcoming?.filter(e => e.next_date && daysUntil(e.next_date) > 30) ?? []

  function EventRow({ event }: { event: EventWithPet }) {
    const days = daysUntil(event.next_date!)
    const colorClass = urgencyColor(days)
    return (
      <Card className="flex items-center gap-3 p-3.5">
        {event.pets?.photo_url ? (
          <img src={event.pets.photo_url} alt="" className="w-10 h-10 rounded-xl object-cover shrink-0" />
        ) : (
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg shrink-0">
            {SPECIES_LABELS[event.pets?.species ?? 'dog']?.split(' ')[0]}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-sm text-gray-900">{event.title}</p>
          </div>
          <p className="text-xs text-gray-500">
            {event.pets?.name} · {formatDate(event.next_date!)}
            {event.vet_clinic && ` · ${event.vet_clinic}`}
          </p>
        </div>
        <div className={`px-2.5 py-1 rounded-xl border text-center min-w-[52px] text-xs font-semibold ${colorClass}`}>
          {days < 0 ? `${Math.abs(days)}d venc.` : days === 0 ? 'Hoy' : `${days}d`}
        </div>
      </Card>
    )
  }

  function HistoryRow({ event }: { event: EventWithPet }) {
    return (
      <Card className="flex items-center gap-3 p-3.5">
        <span className="text-xl w-8 text-center shrink-0">
          {EVENT_TYPE_LABELS[event.event_type]?.split(' ')[0]}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900">{event.title}</p>
          <p className="text-xs text-gray-500">
            {event.pets?.name} · {event.event_date && formatDate(event.event_date)}
          </p>
        </div>
        <Badge variant="gray" className="shrink-0 hidden sm:flex">
          {EVENT_TYPE_LABELS[event.event_type]?.split(' ').slice(1).join(' ')}
        </Badge>
      </Card>
    )
  }

  return (
    <div className="max-w-2xl mx-auto pb-20 md:pb-0 space-y-6">
      <div>
        <h1 className="font-heading font-bold text-2xl text-gray-900">Calendario de salud</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          {(upcoming?.length ?? 0)} eventos programados
        </p>
      </div>

      {/* Vencidos */}
      {overdue.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
            <h2 className="font-semibold text-red-700 text-sm">Vencidos ({overdue.length})</h2>
          </div>
          <div className="space-y-2">
            {overdue.map(e => <EventRow key={e.id} event={e} />)}
          </div>
        </section>
      )}

      {/* Próximos 30 días */}
      {soon.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-orange-400 shrink-0" />
            <h2 className="font-semibold text-orange-700 text-sm">Próximos 30 días ({soon.length})</h2>
          </div>
          <div className="space-y-2">
            {soon.map(e => <EventRow key={e.id} event={e} />)}
          </div>
        </section>
      )}

      {/* Más adelante */}
      {later.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
            <h2 className="font-semibold text-green-700 text-sm">Programados ({later.length})</h2>
          </div>
          <div className="space-y-2">
            {later.map(e => <EventRow key={e.id} event={e} />)}
          </div>
        </section>
      )}

      {(!upcoming || upcoming.length === 0) && (
        <Card className="text-center py-10">
          <p className="text-4xl mb-3">📅</p>
          <p className="font-semibold text-gray-700">No hay eventos programados</p>
          <p className="text-sm text-gray-400 mt-1">Entra al perfil de una mascota y agrega el primer evento</p>
        </Card>
      )}

      {/* Historial */}
      {history && history.length > 0 && (
        <section>
          <h2 className="font-heading font-semibold text-gray-900 mb-3">Historial reciente</h2>
          <div className="space-y-2">
            {history.map(e => <HistoryRow key={e.id} event={e} />)}
          </div>
        </section>
      )}
    </div>
  )
}
