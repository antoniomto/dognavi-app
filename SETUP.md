# DogNavi App — Guía de Setup

Tiempo estimado: **15-20 minutos** para tener la app corriendo localmente.

---

## Paso 1 — Instalar dependencias

```bash
cd dognavi-app
npm install
```

---

## Paso 2 — Crear el proyecto en Supabase (gratis)

1. Ve a [supabase.com](https://supabase.com) → **New project**
2. Nombre: `dognavi-app`
3. Región: `South America (São Paulo)` para MX/LATAM, o `West EU (Ireland)` para España
4. Contraseña de BD: guárdala en un lugar seguro
5. Espera ~2 minutos a que se cree el proyecto

### Obtener las credenciales
En el dashboard de Supabase:
- **Settings → API** → copia:
  - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
  - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (mantener secreto)

---

## Paso 3 — Configurar variables de entorno

```bash
copy .env.example .env.local
```
Edita `.env.local` y pega los valores del paso anterior.

---

## Paso 4 — Ejecutar la migration de base de datos

En el dashboard de Supabase:
1. Ve a **SQL Editor**
2. Abre el archivo `supabase/migrations/001_initial.sql`
3. Pega el contenido y haz clic en **Run**

Esto crea las tablas `profiles`, `pets`, `health_events` y el bucket de storage.

---

## Paso 5 — Configurar Google OAuth (para el botón "Continuar con Google")

1. Ve a [console.cloud.google.com](https://console.cloud.google.com)
2. **Crear proyecto** → nombre: `DogNavi`
3. **APIs & Services → OAuth consent screen**:
   - User type: External
   - App name: DogNavi
   - Email: tu email
4. **Credentials → Create Credentials → OAuth 2.0 Client ID**:
   - Type: Web application
   - Authorized redirect URIs: `https://TU_PROJECT_ID.supabase.co/auth/v1/callback`
5. Copia **Client ID** y **Client Secret**
6. En Supabase: **Authentication → Providers → Google** → pega y activa

---

## Paso 6 — Correr en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) — te redirigirá al login automáticamente.

---

## Paso 7 — Deploy en Vercel (producción)

```bash
npm install -g vercel
vercel --prod
```

1. Vincula con tu cuenta de Vercel
2. En Vercel dashboard → **Settings → Environment Variables**, agrega todas las variables de `.env.local`
3. **Settings → Domains** → agrega `app.dognavi.org`
4. En tu DNS: agrega un registro CNAME `app` → `cname.vercel-dns.com`

### En Supabase (producción):
- **Authentication → URL Configuration**:
  - Site URL: `https://app.dognavi.org`
  - Redirect URLs: `https://app.dognavi.org/api/auth/callback`

---

## Estructura de archivos creados

```
dognavi-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout
│   │   ├── page.tsx                      # Redirect a /dashboard
│   │   ├── globals.css                   # Estilos globales + design tokens
│   │   ├── (auth)/
│   │   │   ├── layout.tsx                # Layout split-screen auth
│   │   │   ├── login/page.tsx            # Pantalla de login
│   │   │   └── registro/page.tsx         # Pantalla de registro
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx                # Layout con sidebar + topbar
│   │   │   ├── page.tsx                  # Dashboard home
│   │   │   ├── mascotas/
│   │   │   │   ├── page.tsx              # Lista de mascotas
│   │   │   │   ├── nueva/page.tsx        # Crear mascota
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx          # Perfil de mascota
│   │   │   │       └── editar/page.tsx   # Editar mascota
│   │   │   ├── salud/page.tsx            # Calendario de salud
│   │   │   └── configuracion/page.tsx    # Configuración del usuario
│   │   └── api/auth/callback/route.ts    # OAuth callback
│   ├── components/
│   │   ├── ui/                           # Button, Input, Select, Card, Badge, Modal
│   │   ├── dashboard/                    # Sidebar, TopBar, ConfigForm
│   │   ├── pet/                          # PetForm
│   │   └── health/                       # AddEventButton, EventForm
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                 # Browser client
│   │   │   ├── server.ts                 # Server client (RSC)
│   │   │   └── types.ts                  # Tipos TypeScript de la BD
│   │   └── utils.ts                      # Helpers: petAge, formatDate, etc.
│   └── middleware.ts                     # Protección de rutas
├── supabase/
│   └── migrations/001_initial.sql        # Schema completo
├── .env.example                          # Template de variables
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Troubleshooting frecuente

**"supabase.auth.getUser() returns null"**
→ Las cookies de sesión no se están propagando. Verifica que el middleware esté correcto.

**"Failed to upload photo"**
→ Verifica que el bucket `pets` existe en Supabase Storage y las políticas RLS están activas.

**"Google OAuth redirect_uri_mismatch"**
→ La URI en Google Console no coincide con la de Supabase. Debe ser exactamente:
`https://TU_PROJECT_ID.supabase.co/auth/v1/callback`

**"relation 'profiles' does not exist"**
→ No se ejecutó la migration. Corre el SQL del paso 4.

---

## Próximos pasos (Fase 2)

Una vez que el MVP está funcionando con usuarios reales:

1. **Notificaciones push** — OneSignal (gratis hasta 10K)
2. **Emails automáticos** — Resend + Edge Function cron
3. **Leads veterinarios** — formulario "buscar vet cerca de mí"

Ver `../DogNavi/_planning/roadmap.md` para el plan completo.
