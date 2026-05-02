import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { SPECIES_LABELS, petAge } from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Mis mascotas' }

export default async function MascotasPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: pets } = await supabase
    .from('pets')
    .select('*, health_events(next_date)')
    .eq('owner_id', user!.id)
    .eq('is_active', true)
    .is('deleted_at', null)
    .order('created_at')

  return (
    <div className="max-w-3xl mx-auto pb-20 md:pb-0">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl text-gray-900">Mis mascotas</h1>
          <p className="text-gray-500 text-sm mt-0.5">{pets?.length ?? 0} registradas</p>
        </div>
        <Link href="/mascotas/nueva">
          <Button><Plus size={16} /> Agregar</Button>
        </Link>
      </div>

      {!pets || pets.length === 0 ? (
        <Card className="text-center py-14">
          <p className="text-5xl mb-4">🐾</p>
          <h2 className="font-heading font-bold text-xl text-gray-900 mb-2">
            Agrega tu primera mascota
          </h2>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm">
            Registra sus datos, foto y lleva el historial completo de su salud.
          </p>
          <Link href="/mascotas/nueva"><Button>Agregar mascota</Button></Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pets.map(pet => {
            const upcoming = pet.health_events
              ?.filter((e: any) => e.next_date)
              .sort((a: any, b: any) => new Date(a.next_date).getTime() - new Date(b.next_date).getTime())[0]

            return (
              <Link key={pet.id} href={`/mascotas/${pet.id}`}>
                <Card hover className="p-0 overflow-hidden">
                  <div className="flex items-center gap-4 p-4">
                    {pet.photo_url ? (
                      <img src={pet.photo_url} alt={pet.name} className="w-16 h-16 rounded-2xl object-cover shrink-0" />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center text-3xl shrink-0">
                        {SPECIES_LABELS[pet.species]?.split(' ')[0]}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-heading font-bold text-gray-900">{pet.name}</p>
                        <Badge variant="gray" className="text-[10px]">
                          {pet.sex === 'male' ? '♂' : pet.sex === 'female' ? '♀' : ''}
                          {pet.neutered ? ' ✂️' : ''}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{pet.breed ?? SPECIES_LABELS[pet.species]}</p>
                      {pet.birth_date && (
                        <p className="text-xs text-gray-400 mt-0.5">{petAge(pet.birth_date)}</p>
                      )}
                    </div>
                  </div>
                  {upcoming && (
                    <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        Próximo: <span className="font-medium text-gray-700">{upcoming.next_date}</span>
                      </p>
                    </div>
                  )}
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
