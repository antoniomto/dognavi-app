import type { Metadata } from 'next'
import CondicionCorporalTool from '@/components/public/tools/CondicionCorporal'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '¿Mi Perro Tiene Sobrepeso? Calculadora BCS de Condición Corporal',
  description: 'Descubre si tu perro está en su peso ideal con nuestra calculadora de condición corporal (BCS). 4 preguntas rápidas y resultado inmediato. Gratis, sin registro.',
  alternates: {
    canonical: 'https://dognavi.org/tools/condicion-corporal',
  },
  openGraph: {
    title: '¿Mi Perro Tiene Sobrepeso? Calculadora BCS',
    description: 'Evalúa la condición corporal de tu perro en 4 preguntas y descubre si está en su peso ideal.',
    images: [{ url: 'https://dognavi.org/images/tools/condicion-corporal-og.jpg' }],
    type: 'website',
  },
}

export default function CondicionCorporalPage() {
  return (
    <>
      {/* HERO */}
      <section
        className="tool-hero tool-hero--img"
        style={{ backgroundImage: "url('/images/hero/evaluador_sobrepeso.png')", backgroundPosition: 'right 30%' }}
      >
        <div className="tool-hero-body">
          <div className="tool-hero-badge">⚖️ Herramienta DogNavi</div>
          <h1>¿Tiene Sobrepeso tu Perro?</h1>
          <p>Responde 4 preguntas sobre su silueta y costillas para conocer su condición corporal (BCS) con recomendaciones personalizadas.</p>
          <div className="tool-hero-meta">
            <span>📋 4 preguntas</span>
            <span>⏱️ 2 minutos</span>
            <span>✅ Gratis</span>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="blog-article" style={{ paddingTop: '40px' }}>
        <div className="article-meta">
          <span>⚖️ Herramienta DogNavi</span>
          <span>⏱️ 2 min</span>
          <span>📅 2026</span>
        </div>

        <h2 style={{ textAlign: 'center', marginBottom: '0.4rem' }}>Evaluación paso a paso</h2>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Responde las 4 preguntas para ver el resultado. Necesitarás tocar y observar a tu perro.
        </p>

        <CondicionCorporalTool />
      </section>
    </>
  )
}
