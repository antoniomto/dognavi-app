'use client'
import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Camera, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import type { Pet } from '@/lib/supabase/types'

const schema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio').max(50),
  species: z.enum(['dog', 'cat', 'rabbit', 'bird', 'fish', 'reptile', 'other']),
  breed: z.string().optional(),
  birth_date: z.string().optional(),
  weight_kg: z.string().optional(),
  sex: z.enum(['male', 'female', 'unknown']),
  neutered: z.boolean(),
  chip_number: z.string().optional(),
  notes: z.string().optional(),
})
type FormData = z.infer<typeof schema>

const SPECIES = [
  { value: 'dog', label: '🐕 Perro' },
  { value: 'cat', label: '🐈 Gato' },
  { value: 'rabbit', label: '🐇 Conejo' },
  { value: 'bird', label: '🦜 Ave' },
  { value: 'fish', label: '🐟 Pez' },
  { value: 'reptile', label: '🦎 Reptil' },
  { value: 'other', label: '🐾 Otro' },
]
const SEX = [
  { value: 'male', label: 'Macho' },
  { value: 'female', label: 'Hembra' },
  { value: 'unknown', label: 'No sé' },
]

interface PetFormProps {
  pet?: Pet
  userId: string
}

export default function PetForm({ pet, userId }: PetFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const fileRef = useRef<HTMLInputElement>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(pet?.photo_url ?? null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: pet?.name ?? '',
      species: pet?.species ?? 'dog',
      breed: pet?.breed ?? '',
      birth_date: pet?.birth_date ?? '',
      weight_kg: pet?.weight_kg?.toString() ?? '',
      sex: pet?.sex ?? 'unknown',
      neutered: pet?.neutered ?? false,
      chip_number: pet?.chip_number ?? '',
      notes: pet?.notes ?? '',
    },
  })

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { setError('La foto debe pesar menos de 5 MB'); return }
    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  async function uploadPhoto(petId: string): Promise<string | null> {
    if (!photoFile) return pet?.photo_url ?? null
    const ext = photoFile.name.split('.').pop()
    const path = `${userId}/${petId}.${ext}`
    const { error: uploadError } = await supabase.storage
      .from('pets')
      .upload(path, photoFile, { upsert: true, cacheControl: '3600' })
    if (uploadError) return null
    return supabase.storage.from('pets').getPublicUrl(path).data.publicUrl
  }

  async function onSubmit(data: FormData) {
    setError('')
    const payload = {
      owner_id: userId,
      name: data.name,
      species: data.species,
      breed: data.breed || null,
      birth_date: data.birth_date || null,
      weight_kg: data.weight_kg ? parseFloat(data.weight_kg) : null,
      sex: data.sex,
      neutered: data.neutered,
      chip_number: data.chip_number || null,
      notes: data.notes || null,
    }

    if (pet) {
      const photoUrl = await uploadPhoto(pet.id)
      const { error: updateError } = await supabase
        .from('pets').update({ ...payload, photo_url: photoUrl }).eq('id', pet.id)
      if (updateError) { setError(updateError.message); return }
      router.push(`/mascotas/${pet.id}`)
    } else {
      const { data: newPet, error: insertError } = await supabase
        .from('pets').insert(payload).select().single()
      if (insertError) { setError(insertError.message); return }
      const photoUrl = await uploadPhoto(newPet.id)
      if (photoUrl) await supabase.from('pets').update({ photo_url: photoUrl }).eq('id', newPet.id)
      router.push(`/mascotas/${newPet.id}`)
    }
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pb-20 md:pb-0">
      {/* Foto */}
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 hover:border-brand-400 transition-colors group"
        >
          {photoPreview ? (
            <img src={photoPreview} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 group-hover:text-brand-500">
              <Camera size={24} />
              <span className="text-xs mt-1">Foto</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Camera size={18} className="text-white" />
          </div>
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
        <p className="text-xs text-gray-400">Opcional · Máx 5 MB</p>
      </div>

      {/* Campos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Nombre *" placeholder="Max" error={errors.name?.message} {...register('name')} />
        <Select label="Especie *" options={SPECIES} error={errors.species?.message} {...register('species')} />
        <Input label="Raza" placeholder="Labrador Retriever" {...register('breed')} />
        <Input label="Fecha de nacimiento" type="date" {...register('birth_date')} />
        <Input label="Peso (kg)" type="number" step="0.1" placeholder="12.5" {...register('weight_kg')} />
        <Select label="Sexo" options={SEX} {...register('sex')} />
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" id="neutered" className="w-4 h-4 accent-brand-600" {...register('neutered')} />
        <label htmlFor="neutered" className="text-sm text-gray-700 font-medium">Castrado/a</label>
      </div>

      <Input label="Número de microchip" placeholder="985000012345678" hint="15 dígitos" {...register('chip_number')} />

      <div>
        <label className="label">Notas</label>
        <textarea
          className="input-base resize-none"
          rows={3}
          placeholder="Alergias, medicación habitual, carácter..."
          {...register('notes')}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
      )}

      <div className="flex gap-3">
        <Button type="button" variant="secondary" className="flex-1" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button type="submit" className="flex-1" loading={isSubmitting}>
          {pet ? 'Guardar cambios' : 'Agregar mascota'}
        </Button>
      </div>
    </form>
  )
}
