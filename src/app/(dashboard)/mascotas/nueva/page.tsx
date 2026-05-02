import { createClient } from '@/lib/supabase/server'
import PetForm from '@/components/pet/PetForm'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Agregar mascota' }

export default async function NuevaMascotaPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-2xl text-gray-900">Agregar mascota</h1>
        <p className="text-gray-500 text-sm mt-0.5">Completa los datos de tu compañero</p>
      </div>
      <PetForm userId={user!.id} />
    </div>
  )
}
