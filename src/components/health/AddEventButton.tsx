'use client'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import EventForm from './EventForm'

interface AddEventButtonProps {
  petId: string
  userId: string
}

export default function AddEventButton({ petId, userId }: AddEventButtonProps) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
        <Plus size={14} /> Agregar evento
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Nuevo evento de salud">
        <EventForm petId={petId} userId={userId} onSuccess={() => setOpen(false)} />
      </Modal>
    </>
  )
}
