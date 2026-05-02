import { createClient } from '@/lib/supabase/server'
import ConfigForm from '@/components/dashboard/ConfigForm'

export const metadata = { title: 'Configuración' }

export default async function ConfigPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles').select('*').eq('id', user!.id).single()

  return (
    <div className="max-w-xl mx-auto pb-20 md:pb-0">
      <h1 className="font-heading font-bold text-2xl text-gray-900 mb-6">Configuración</h1>
      <ConfigForm profile={profile} userId={user!.id} />
    </div>
  )
}
