import type { Metadata } from 'next'
import EdadPerroTool from '@/components/public/tools/EdadPerro'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Calculadora de Edad Real de tu Perro (Años Humanos)',
  description: 'Calcula la edad real de tu perro en años humanos según su edad y tamaño. Fórmula veterinaria validada. Rápido, gratis y sin registro.',
  alternates: { canonical: 'https://dognavi.org/tools/edad-perro' },
  openGraph: {
    title: 'Calculadora de Edad Real de tu Perro (Años Humanos)',
    description: 'Descubre cuántos años humanos tiene tu perro con una fórmula veterinaria precisa.',
    images: [{ url: 'https://dognavi.org/images/tools/edad-perro-og.jpg' }],
    type: 'website',
  },
}

export default function EdadPerroPage() {
  return (
    <>
      <section
        className="tool-hero tool-hero--img"
        style={{ backgroundImage: "url('/images/hero/calculadora de edad.png')" }}
      >
        <div className="tool-hero-body">
          <div className="tool-hero-badge">🎂 Herramienta DogNavi</div>
          <h1>Calculadora de Edad Real del Perro</h1>
          <p>Descubre cuántos años humanos tiene tu perro usando una fórmula veterinaria actualizada por tamaño y raza.</p>
          <div className="tool-hero-meta">
            <span>🐾 Fórmula AVMA/WSAVA</span>
            <span>⏱️ 1 minuto</span>
            <span>✅ Gratis</span>
          </div>
        </div>
      </section>

      <section className="blog-article" style={{ paddingTop: '40px' }}>
        <div className="article-meta">
          <span>🧮 Herramienta DogNavi</span>
          <span>⏱️ 1 min</span>
          <span>📅 2026</span>
        </div>
        <h2>Ingresa los datos de tu perro</h2>
        <EdadPerroTool />
      </section>
    </>
  )
}
