-- ============================================================
-- DogNavi — Migration 001: Schema inicial (Fase 1 MVP)
-- Ejecutar en Supabase SQL Editor o con: supabase db push
-- ============================================================

-- Tipos enumerados
CREATE TYPE pet_species AS ENUM ('dog', 'cat', 'rabbit', 'bird', 'fish', 'reptile', 'other');
CREATE TYPE pet_sex AS ENUM ('male', 'female', 'unknown');
CREATE TYPE health_event_type AS ENUM (
  'vaccine', 'deworming', 'vet_visit', 'grooming', 'medication', 'surgery', 'test', 'custom'
);

-- ============================================================
-- TABLA: profiles
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id                    uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name             text,
  avatar_url            text,
  country               text NOT NULL DEFAULT 'MX',
  phone                 text,
  whatsapp              text,
  timezone              text NOT NULL DEFAULT 'America/Mexico_City',
  onboarding_completed  boolean NOT NULL DEFAULT false,
  notifications_email   boolean NOT NULL DEFAULT true,
  notifications_push    boolean NOT NULL DEFAULT false,
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);

-- Auto-crear perfil al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, country)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url',
    COALESCE(new.raw_user_meta_data ->> 'country', 'MX')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- ============================================================
-- TABLA: pets
-- ============================================================
CREATE TABLE IF NOT EXISTS pets (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id      uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name          text NOT NULL,
  species       pet_species NOT NULL DEFAULT 'dog',
  breed         text,
  birth_date    date,
  weight_kg     numeric(5, 2),
  sex           pet_sex NOT NULL DEFAULT 'unknown',
  neutered      boolean NOT NULL DEFAULT false,
  chip_number   text,
  photo_url     text,
  notes         text,
  is_active     boolean NOT NULL DEFAULT true,
  deleted_at    timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_pets_owner_id ON pets(owner_id);
CREATE INDEX idx_pets_owner_active ON pets(owner_id, is_active) WHERE deleted_at IS NULL;

CREATE TRIGGER pets_updated_at BEFORE UPDATE ON pets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pets_all_own" ON pets FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);

-- ============================================================
-- TABLA: health_events
-- ============================================================
CREATE TABLE IF NOT EXISTS health_events (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id          uuid NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  owner_id        uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  event_type      health_event_type NOT NULL,
  title           text NOT NULL,
  description     text,
  event_date      date,
  next_date       date,
  reminder_days   integer NOT NULL DEFAULT 7,
  vet_name        text,
  vet_clinic      text,
  cost            numeric(10, 2),
  currency        text NOT NULL DEFAULT 'MXN',
  document_url    text,
  notified        boolean NOT NULL DEFAULT false,
  deleted_at      timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_health_events_pet_id ON health_events(pet_id);
CREATE INDEX idx_health_events_owner_id ON health_events(owner_id);
CREATE INDEX idx_health_events_next_date ON health_events(next_date) WHERE next_date IS NOT NULL AND deleted_at IS NULL;
CREATE INDEX idx_health_events_pending_notify ON health_events(next_date, notified)
  WHERE notified = false AND next_date IS NOT NULL AND deleted_at IS NULL;

CREATE TRIGGER health_events_updated_at BEFORE UPDATE ON health_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE health_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "health_events_all_own" ON health_events
  FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('pets', 'pets', true, 5242880, ARRAY['image/jpeg','image/png','image/webp','image/gif'])
ON CONFLICT (id) DO NOTHING;

-- Política: cualquiera puede ver fotos
CREATE POLICY "pets_photos_public_select" ON storage.objects
  FOR SELECT USING (bucket_id = 'pets');

-- Política: solo el dueño puede subir/eliminar dentro de su carpeta (uid/*)
CREATE POLICY "pets_photos_owner_insert" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'pets' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "pets_photos_owner_update" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'pets' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "pets_photos_owner_delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'pets' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
