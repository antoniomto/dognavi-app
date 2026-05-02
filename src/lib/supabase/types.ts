// Tipos generados automáticamente desde Supabase.
// Regenerar con: npm run db:types
// Esto es un placeholder inicial — reemplazar tras crear el proyecto Supabase.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          country: string
          phone: string | null
          whatsapp: string | null
          timezone: string
          onboarding_completed: boolean
          notifications_email: boolean
          notifications_push: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          country?: string
          phone?: string | null
          whatsapp?: string | null
          timezone?: string
          onboarding_completed?: boolean
          notifications_email?: boolean
          notifications_push?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      pets: {
        Row: {
          id: string
          owner_id: string
          name: string
          species: 'dog' | 'cat' | 'rabbit' | 'bird' | 'fish' | 'reptile' | 'other'
          breed: string | null
          birth_date: string | null
          weight_kg: number | null
          sex: 'male' | 'female' | 'unknown'
          neutered: boolean
          chip_number: string | null
          photo_url: string | null
          notes: string | null
          is_active: boolean
          deleted_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          species?: 'dog' | 'cat' | 'rabbit' | 'bird' | 'fish' | 'reptile' | 'other'
          breed?: string | null
          birth_date?: string | null
          weight_kg?: number | null
          sex?: 'male' | 'female' | 'unknown'
          neutered?: boolean
          chip_number?: string | null
          photo_url?: string | null
          notes?: string | null
          is_active?: boolean
        }
        Update: Partial<Database['public']['Tables']['pets']['Insert']>
      }
      health_events: {
        Row: {
          id: string
          pet_id: string
          owner_id: string
          event_type: 'vaccine' | 'deworming' | 'vet_visit' | 'grooming' | 'medication' | 'surgery' | 'test' | 'custom'
          title: string
          description: string | null
          event_date: string | null
          next_date: string | null
          reminder_days: number
          vet_name: string | null
          vet_clinic: string | null
          cost: number | null
          currency: string
          document_url: string | null
          notified: boolean
          deleted_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          pet_id: string
          owner_id: string
          event_type: 'vaccine' | 'deworming' | 'vet_visit' | 'grooming' | 'medication' | 'surgery' | 'test' | 'custom'
          title: string
          description?: string | null
          event_date?: string | null
          next_date?: string | null
          reminder_days?: number
          vet_name?: string | null
          vet_clinic?: string | null
          cost?: number | null
          currency?: string
          document_url?: string | null
        }
        Update: Partial<Database['public']['Tables']['health_events']['Insert']>
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type Profile = Tables<'profiles'>
export type Pet = Tables<'pets'>
export type HealthEvent = Tables<'health_events'>
