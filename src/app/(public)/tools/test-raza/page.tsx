import type { Metadata } from 'next'
import TestRazaTool from '@/components/public/tools/TestRaza'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '¿Qué Raza de Perro es Para Ti? Test de Compatibilidad',
  description: 'Responde 8 preguntas sobre tu estilo de vida y descubre qué razas encajan mejor contigo. Resultado con las 3 mejores opciones.',
  alternates: { canonical: 'https://dognavi.org/tools/test-raza' },
}

export default function TestRazaPage() {
  return (
    <>
      <section
        className="tool-hero tool-hero--img"
        style={{ backgroundImage: "url('/images/tools/test_raza.png')" }}
      >
        <div className="tool-hero-body">
          <div className="tool-hero-badge">🐾 Herramienta DogNavi</div>
          <h1>¿Qué Raza de Perro es Para Ti?</h1>
          <p>Responde 8 preguntas sobre tu estilo de vida y descubre las razas que mejor encajan contigo entre 18 opciones.</p>
          <div className="tool-hero-meta">
            <span>📋 8 preguntas</span>
            <span>🏆 Top 3 razas</span>
            <span>✅ Gratis</span>
          </div>
        </div>
      </section>

      <section className="blog-article" style={{ paddingTop: '40px' }}>
        <div className="article-meta">
          <span>🐾 Herramienta DogNavi</span>
          <span>⏱️ 5 min</span>
          <span>📅 2026</span>
        </div>
        <TestRazaTool />
      </section>
    </>
  )
}
