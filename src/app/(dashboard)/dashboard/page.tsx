import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { PawPrint, HeartPulse, Bell, Plus } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { daysUntil, formatDate, urgencyColor, EVENT_TYPE_LABELS, SPECIES_LABELS } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [{ data: profile }, { data: pets }, { data: upcomingEvents }] = await Promise.all([
    supabase.from('profiles').select('full_name').eq('id', user!.id).single(),
    supabase.from('pets').select('*').eq('owner_id', user!.id).eq('is_active', true).is('deleted_at', null).order('created_at'),
    supabase
      .from('health_events')
      .select('*, pets(name, species)')
      .eq('owner_id', user!.id)
      .is('deleted_at', null)
      .not('next_date', 'is', null)
      .gte('next_date', new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0])
      .order('next_date', { ascending: true })
      .limit(5),
  ])

  const firstName = profile?.full_name?.split(' ')[0] ?? 'allí'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches'

  const urgentCount = upcomingEvents?.filter(e => daysUntil(e.next_date!) <= 7).length ?? 0

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-0">

      {/* Saludo */}
      <div>
        <h1 className="font-heading font-bold text-2xl text-gray-900">
          {greeting}, {firstName} 👋
        </h1>
        <p className="text-gray-500 mt-0.5">
          {urgentCount > 0
            ? `Tienes ${urgentCount} evento${urgentCount > 1 ? 's' : ''} de salud próximos`
            : 'Todo al día con la salud de tus mascotas'}
        </p>
      </div>

      {/* Stats rápidas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Card className="p-4 text-center">
          <PawPrint className="mx-auto text-brand-600 mb-1" size={22} />
          <p className="font-heading font-bold text-2xl text-gray-900">{pets?.length ?? 0}</p>
          <p className="text-xs text-gray-500">Mascotas</p>
        </Card>
        <Card className="p-4 text-center">
          <HeartPulse className="mx-auto text-green-600 mb-1" size={22} />
          <p className="font-heading font-bold text-2xl text-gray-900">{upcomingEvents?.length ?? 0}</p>
          <p className="text-xs text-gray-500">Eventos programados</p>
        </Card>
        <Card className="p-4 text-center col-span-2 sm:col-span-1">
          <Bell className="mx-auto text-orange-500 mb-1" size={22} />
          <p className="font-heading font-bold text-2xl text-gray-900">{urgentCount}</p>
          <p className="text-xs text-gray-500">Urgentes (&lt;7 días)</p>
        </Card>
      </div>

      {/* Mascotas */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading font-semibold text-gray-900">Mis mascotas</h2>
          <Link href="/mascotas/nueva">
            <Button size="sm" variant="secondary">
              <Plus size={14} /> Agregar
            </Button>
          </Link>
        </div>

        {!pets || pets.length === 0 ? (
          <Card className="text-center py-10">
            <p className="text-4xl mb-3">🐾</p>
            <p className="font-semibold text-gray-700 mb-1">Aún no tienes mascotas registradas</p>
            <p className="text-sm text-gray-400 mb-4">Agrega a tu compañero para empezar a gestionar su salud</p>
            <Link href="/mascotas/nueva">
              <Button>Agregar mascota</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pets.map(pet => (
              <Link key={pet.id} href={`/mascotas/${pet.id}`}>
                <Card hover className="flex items-center gap-4 p-4">
                  {pet.photo_url ? (
                    <img src={pet.photo_url} alt={pet.name} className="w-14 h-14 rounded-2xl object-cover shrink-0" />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-2xl shrink-0">
                      {SPECIES_LABELS[pet.species]?.split(' ')[0]}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900">{pet.name}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {pet.breed ?? SPECIES_LABELS[pet.species]}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Próximos eventos */}
      {upcomingEvents && upcomingEvents.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-semibold text-gray-900">Próximos eventos de salud</h2>
            <Link href="/salud" className="text-sm text-brand-700 hover:underline">Ver todos</Link>
          </div>
          <div className="space-y-2">
            {upcomingEvents.map(event => {
              const days = daysUntil(event.next_date!)
              const colorClass = urgencyColor(days)
              return (
                <Card key={event.id} className="flex items-center gap-3 p-3.5">
                  <div className={`px-2.5 py-1.5 rounded-xl border text-center min-w-[56px] ${colorClass}`}>
                    <p className="font-heading font-bold text-base leading-none">{Math.abs(days)}</p>
                    <p className="text-[10px] font-medium">{days < 0 ? 'días venc.' : days === 0 ? 'hoy' : 'días'}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">{event.title}</p>
                    <p className="text-xs text-gray-500">
                      {(event.pets as any)?.name} · {formatDate(event.next_date!)}
                    </p>
                  </div>
                  <Badge variant={days <= 0 ? 'red' : days <= 7 ? 'orange' : days <= 30 ? 'yellow' : 'green'}>
                    {EVENT_TYPE_LABELS[event.event_type]?.split(' ')[0]}
                  </Badge>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
