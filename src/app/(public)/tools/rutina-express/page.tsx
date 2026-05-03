import type { Metadata } from 'next'
import RutinaExpressTool from '@/components/public/tools/RutinaExpress'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Rutina Express para tu Perro - Genera en 10 Segundos',
  description: 'Genera una rutina de ejercicio personalizada para tu perro en 10 segundos. Actividades de 5-20 minutos según energía, espacio y tiempo disponible.',
  alternates: { canonical: 'https://dognavi.org/tools/rutina-express' },
}

export default function RutinaExpressPage() {
  return (
    <>
      <section
        className="tool-hero tool-hero--img"
        style={{ backgroundImage: "url('/images/hero/rutina_express.png')" }}
      >
        <div className="tool-hero-body">
          <div className="tool-hero-badge">🏃 Herramienta DogNavi</div>
          <h1>Generador de Rutina Express</h1>
          <p>Crea una rutina de ejercicio personalizada para tu perro en solo 10 segundos según su energía, espacio y tu tiempo.</p>
          <div className="tool-hero-meta">
            <span>⚡ Resultado inmediato</span>
            <span>🎯 27 combinaciones</span>
            <span>✅ Sin registro</span>
          </div>
        </div>
      </section>

      <RutinaExpressTool />
    </>
  )
}
