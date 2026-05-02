import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { differenceInYears, differenceInMonths, format } from 'date-fns'
import { es } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function petAge(birthDate: string | Date): string {
  const birth = new Date(birthDate)
  const now = new Date()
  const years = differenceInYears(now, birth)
  if (years >= 1) return `${years} ${years === 1 ? 'año' : 'años'}`
  const months = differenceInMonths(now, birth)
  if (months >= 1) return `${months} ${months === 1 ? 'mes' : 'meses'}`
  return 'Cachorro'
}

export function formatDate(date: string | Date): string {
  return format(new Date(date), "d 'de' MMMM yyyy", { locale: es })
}

export function formatDateShort(date: string | Date): string {
  return format(new Date(date), 'dd/MM/yyyy', { locale: es })
}

export function daysUntil(date: string | Date): number {
  const target = new Date(date)
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  target.setHours(0, 0, 0, 0)
  return Math.round((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

export function urgencyColor(days: number): string {
  if (days < 0) return 'text-red-600 bg-red-50 border-red-200'
  if (days <= 7) return 'text-orange-600 bg-orange-50 border-orange-200'
  if (days <= 30) return 'text-yellow-700 bg-yellow-50 border-yellow-200'
  return 'text-green-700 bg-green-50 border-green-200'
}

export const SPECIES_LABELS: Record<string, string> = {
  dog: '🐕 Perro',
  cat: '🐈 Gato',
  rabbit: '🐇 Conejo',
  bird: '🦜 Ave',
  fish: '🐟 Pez',
  reptile: '🦎 Reptil',
  other: '🐾 Otro',
}

export const EVENT_TYPE_LABELS: Record<string, string> = {
  vaccine: '💉 Vacuna',
  deworming: '🐛 Desparasitación',
  vet_visit: '🩺 Visita veterinario',
  grooming: '✂️ Baño / Estética',
  medication: '💊 Medicamento',
  surgery: '🔬 Cirugía',
  test: '🔬 Análisis',
  custom: '📋 Personalizado',
}

export const EVENT_TYPE_INTERVALS: Record<string, number | null> = {
  vaccine: 365,
  deworming: 90,
  vet_visit: 180,
  grooming: 60,
  medication: null,
  surgery: null,
  test: null,
  custom: null,
}
