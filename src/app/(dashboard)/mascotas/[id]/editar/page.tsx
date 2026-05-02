import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import PetForm from '@/components/pet/PetForm'
import type { Pet } from '@/lib/supabase/types'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Editar mascota' }

export default async function EditarMascotaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: petData } = await supabase
    .from('pets').select('*').eq('id', id).eq('owner_id', user!.id).single()

  const pet = petData as Pet | null
  if (!pet) notFound()

  return (
    <div className="max-w-xl mx-auto">
      <Link href={`/mascotas/${pet.id}`} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft size={15} /> Volver a {pet.name}
      </Link>
      <h1 className="font-heading font-bold text-2xl text-gray-900 mb-6">Editar a {pet.name}</h1>
      <PetForm pet={pet} userId={user!.id} />
    </div>
  )
}
