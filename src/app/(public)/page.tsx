import type { Metadata } from 'next'
import Link from 'next/link'
import FoodCalculator from '@/components/public/FoodCalculator'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'DogNavi - Calculadora de Alimentación Canina Gratis',
  description: 'Calcula cuánto debe comer tu perro en 30 segundos. Gratis, sin registro y con fórmulas veterinarias certificadas. Tablas por peso, edad y raza.',
  alternates: {
    canonical: 'https://dognavi.org/',
  },
  openGraph: {
    type: 'website',
    url: 'https://dognavi.org/',
    title: 'DogNavi - Calculadora de Alimentación Canina Gratis',
    description: 'Calcula cuánto debe comer tu perro en 30 segundos. Gratis, sin registro y con fórmulas veterinarias certificadas.',
    images: [{ url: 'https://dognavi.org/images/banner.jpg' }],
    locale: 'es_ES',
    siteName: 'DogNavi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DogNavi - Calculadora de Alimentación Canina Gratis',
    description: 'Calcula cuánto debe comer tu perro en 30 segundos. Gratis y con fórmulas veterinarias certificadas.',
    images: ['https://dognavi.org/images/banner.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://dognavi.org/#organization',
      name: 'DogNavi',
      url: 'https://dognavi.org',
      logo: 'https://dognavi.org/images/dognavi_logo.png',
      description: 'Calculadora de alimentación canina gratuita basada en fórmulas veterinarias',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://dognavi.org/#website',
      url: 'https://dognavi.org',
      name: 'DogNavi',
      publisher: { '@id': 'https://dognavi.org/#organization' },
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://dognavi.org/#calculadora',
      name: 'Calculadora de Alimentación Canina',
      url: 'https://dognavi.org/#calculadora',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      description: 'Calcula la ración diaria exacta para tu perro según peso, edad, actividad y tipo de alimento',
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="trust-pill"><span className="icon">✓</span> 100% Gratis</div>
        <div className="trust-pill"><span className="icon">✓</span> Sin Registro</div>
        <div className="trust-pill"><span className="icon">✓</span> Resultados Instantáneos</div>
      </div>

      {/* HERO */}
      <section
        className="hero"
        id="inicio"
        style={{ backgroundImage: "url('/images/banner.jpg')" }}
      >
        <div className="hero-content">
          <h1>¿Cuánto Debe Comer Tu Perro Realmente?</h1>
          <p className="subtitle">
            Calcula la porción exacta en 30 segundos con fórmulas veterinarias certificadas.
          </p>
          <div className="social-proof">
            <span>✓</span> Basado en fórmulas veterinarias • Actualizado 2025
          </div>
          <div className="hero-cta">
            <a href="#calculadora" className="btn-primary">Calcular Ahora Gratis</a>
            <a href="#guias" className="btn-ghost">Ver Guías</a>
          </div>
        </div>
      </section>

      {/* CALCULADORA */}
      <section id="calculadora">
        <div className="section-header">
          <h2>🥣 Calculadora de Alimentación Canina</h2>
          <p>Descubre la cantidad exacta de alimento que tu perro necesita diariamente.</p>
        </div>
        <FoodCalculator />
      </section>

      {/* EXPLICACIÓN */}
      <section className="calculator-info">
        <div className="calculator-info-inner">
          <div className="section-header">
            <h2>¿Cómo funciona nuestra calculadora de alimentación canina?</h2>
            <p>
              Esta herramienta utiliza fórmulas veterinarias reconocidas para estimar cuánta comida
              necesita tu perro cada día según sus características reales.
            </p>
          </div>
          <div className="calculator-text">
            <p>
              El cálculo parte del <strong>RER (Resting Energy Requirement)</strong>, una fórmula utilizada por
              veterinarios para estimar cuánta energía necesita un perro en reposo. A partir de este valor
              se aplica el <strong>MER (Maintenance Energy Requirement)</strong>, que ajusta el resultado según
              edad, nivel de actividad, esterilización y condición corporal.
            </p>
            <p>
              Con estos datos, la calculadora estima cuántas calorías necesita tu perro al día y las convierte
              en gramos de alimento seco usando un promedio de <strong>350 kcal por cada 100 g</strong>.
            </p>
            <p>
              Si el alimento que utilizas tiene una densidad calórica distinta, puedes ajustar fácilmente
              la cantidad revisando la etiqueta del producto.
            </p>
            <p>
              Esta herramienta no sustituye la consulta veterinaria, pero ofrece una referencia confiable,
              clara y basada en ciencia para ayudarte a alimentar mejor a tu perro.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section id="productos">
        <div className="section-header">
          <h2>🛒 Productos Recomendados</h2>
          <p>Accesorios que complementan la alimentación correcta.</p>
        </div>
        <div className="products-grid">
          <div className="product-card">
            <div className="product-image">
              <img src="/images/tazon.webp" alt="Comedero Antivoracidad" />
            </div>
            <h3 className="product-title">Comedero dietético para perros Petkitfresh con báscula digital</h3>
            <p>Ideal para los glotones ansiosos. Anti-asfixia y con ranuras, libera los alimentos lentamente para evitar la ingestión rápida.</p>
            <a href="https://mercadolibre.com/sec/2SzR8ai" target="_blank" rel="nofollow sponsored" className="btn-secondary">
              Ver precio en Mercado Libre
            </a>
          </div>
          <div className="product-card">
            <div className="product-image">
              <img src="/images/agua.webp" alt="Tazón dispensador de agua sin fugas para perros" />
            </div>
            <h3 className="product-title">Tazón de perro 1l sin fugas dispensador de agua para mascota</h3>
            <p>Reduce la velocidad de agua potable a través del diseño de bandeja flotante. Mantiene el agua limpia y evita la humedad bucal.</p>
            <a href="https://mercadolibre.com/sec/1WBhYTy" target="_blank" rel="nofollow sponsored" className="btn-secondary">
              Ver precio en Mercado Libre
            </a>
          </div>
          <div className="product-card">
            <div className="product-image">
              <img src="/images/alimento.webp" alt="Alimento Ganador Premium" />
            </div>
            <h3 className="product-title">Alimento Ganador Premium</h3>
            <p>Cubre las necesidades nutricionales y energéticas de tu perro. Proteína para una nutrición completa, tu mascota siempre saludable.</p>
            <a href="https://mercadolibre.com/sec/28hPW8m" target="_blank" rel="nofollow sponsored" className="btn-secondary">
              Ver precio en Mercado Libre
            </a>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section id="trust-dognavi">
        <div className="container">
          <div className="section-header">
            <h2>🎓 ¿Por Qué Confiar en DogNavi?</h2>
            <p>Nuestra calculadora está respaldada por ciencia veterinaria real</p>
          </div>
          <div className="grid-3 trust-cards">
            <div className="trust-card">
              <div className="trust-icon">📊</div>
              <h3>Fórmulas Certificadas</h3>
              <p>
                Usamos el estándar RER (Resting Energy Requirement) y
                MER (Maintenance Energy Requirement) avalados por la WSAVA.
              </p>
            </div>
            <div className="trust-card">
              <div className="trust-icon">🔬</div>
              <h3>Basado en Ciencia</h3>
              <p>
                Nuestros cálculos siguen las guías del American Kennel Club (AKC)
                y la ASPCA para nutrición canina.
              </p>
            </div>
            <div className="trust-card">
              <div className="trust-icon">💙</div>
              <h3>100% Gratuito Siempre</h3>
              <p>
                Sin registro, sin anuncios invasivos, sin costo oculto.
                Solo una herramienta útil para mejorar la vida de tu perro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GUÍAS */}
      <section className="blog-section" id="guias">
        <div className="section-header">
          <h2>📚 Guías Útiles</h2>
          <p>Aprende más sobre nutrición y bienestar canino.</p>
        </div>

        {/* Artículo Destacado */}
        <Link className="blog-featured" href="/blog/porque-mi-perro-tiembla-causas-soluciones">
          <div className="blog-featured-img">
            <img src="/images/blogs/perro-tiembla/tarjeta.jpg" alt="Mi Perro Tiembla: 9 Causas Reales" />
          </div>
          <div className="blog-featured-body">
            <span className="featured-badge">⭐ Destacado</span>
            <h3>Mi Perro Tiembla: 9 Causas Reales y Qué Hacer</h3>
            <p>Descubre por qué tu perro tiembla: frío, dolor, miedo, hipoglucemia, intoxicación y más. Señales de alerta y soluciones rápidas.</p>
            <div className="blog-featured-meta">
              <span>📅 Ene 2026</span>
              <span>⏱️ 7 min lectura</span>
              <span>🩺 Salud</span>
            </div>
            <span className="blog-featured-cta">Leer guía completa →</span>
          </div>
        </Link>

        {/* Blog grid */}
        <div className="blog-grid" style={{ marginTop: '2rem', maxWidth: '1200px', margin: '2rem auto 0' }}>
          <div className="blog-card">
            <img src="/images/blogs/golpe-calor/dog-golpe-calor.jpg" alt="Perro con golpe de calor" />
            <div className="card-content">
              <div className="blog-meta"><span>📅 Ene 2026</span><span>⏱️ 7 min</span></div>
              <h3 className="blog-title">Golpe de Calor en Perros: Señales, Primeros Auxilios y Prevención</h3>
              <p className="blog-desc">Aprende a identificar un golpe de calor y los primeros auxilios en los primeros 60 segundos.</p>
              <Link className="btn-primary blog-btn" href="/blog/golpe-de-calor-en-perros-senales-que-hacer">Leer Guía Completa</Link>
            </div>
          </div>
          <div className="blog-card">
            <img src="/images/blogs/perro-deshidratacion/dog-deshidratacion.jpg" alt="Perro con signos de deshidratación" />
            <div className="card-content">
              <div className="blog-meta"><span>📅 Ene 2026</span><span>⏱️ 6 min</span></div>
              <h3 className="blog-title">¿Mi perro está deshidratado? Señales, pruebas y qué hacer</h3>
              <p className="blog-desc">Identifica la deshidratación con señales claras y pruebas rápidas en casa.</p>
              <Link className="btn-primary blog-btn" href="/blog/perro-deshidratado-senales-que-hacer">Leer Guía Completa</Link>
            </div>
          </div>
          <div className="blog-card">
            <img src="/images/blogs/socializar_perro.jpg" alt="Cachorro socializando correctamente" />
            <div className="card-content">
              <div className="blog-meta"><span>📅 Dic 2025</span><span>⏱️ 8 min</span></div>
              <h3 className="blog-title">Cómo Socializar un Cachorro Correctamente (Guía + Checklist)</h3>
              <p className="blog-desc">Socialización etapa por etapa, errores comunes y checklist imprimible.</p>
              <Link className="btn-primary blog-btn" href="/blog/como-socializar-un-cachorro-correctamente">Leer Guía Completa</Link>
            </div>
          </div>
          <div className="blog-card">
            <img src="/images/blogs/perro_chico_comiendo.jpg" alt="Perro que no quiere comer" />
            <div className="card-content">
              <div className="blog-meta"><span>📅 Dic 2025</span><span>⏱️ 9 min</span></div>
              <h3 className="blog-title">Mi Perro No Quiere Comer: 7 Causas + Soluciones</h3>
              <p className="blog-desc">Test de urgencia + protocolo de 24 horas para que tu perro vuelva a comer.</p>
              <Link className="btn-primary blog-btn" href="/blog/perro-no-quiere-comer-causas-soluciones">Leer Guía Completa</Link>
            </div>
          </div>
          <div className="blog-card">
            <img src="/images/blogs/chihuahua_comiendo.jpg" alt="Alimentación para Chihuahuas" />
            <div className="card-content">
              <div className="blog-meta"><span>📅 Dic 2025</span><span>⏱️ 10 min</span></div>
              <h3 className="blog-title">Alimentación para Chihuahuas: Guía Completa 2025</h3>
              <p className="blog-desc">Porciones exactas, errores fatales comunes y mejores alimentos para Chihuahuas.</p>
              <Link className="btn-primary blog-btn" href="/blog/alimentacion-chihuahuas-guia-completa">Leer Guía Completa</Link>
            </div>
          </div>
          <div className="blog-card">
            <img src="/images/blogs/perro_ventana.jpg" alt="Perro con ansiedad por separación" />
            <div className="card-content">
              <div className="blog-meta"><span>📅 Dic 2025</span><span>⏱️ 8 min</span></div>
              <h3 className="blog-title">Ansiedad por Separación: 7 Señales + Solución en 15 Minutos</h3>
              <p className="blog-desc">Rutina veterinaria de 15 minutos para reducir la ansiedad por separación.</p>
              <Link className="btn-primary blog-btn" href="/blog/ansiedad-separacion-perros">Leer Guía Completa</Link>
            </div>
          </div>
        </div>

        <div className="blog-ver-todos">
          <Link href="/blog">Ver todos los artículos →</Link>
        </div>
      </section>

      {/* HERRAMIENTAS */}
      <section id="herramientas">
        <div className="container">
          <div className="section-header">
            <h2>🛠️ Más Herramientas Útiles</h2>
            <p>Explora otras funciones para el bienestar de tu perro</p>
          </div>
          <div className="grid-3 tools-grid">
            <div className="tool-card">
              <div className="tool-thumb-area">
                <img src="/images/tools/card_generar_rutina.png" alt="Generador de Rutina Express" />
              </div>
              <div className="tool-body">
                <h3>Generador de Rutina Express</h3>
                <p>Crea una rutina de ejercicio personalizada en 10 segundos según energía, espacio y tiempo.</p>
                <Link className="btn-primary blog-btn" href="/tools/rutina-express">Generar Rutina</Link>
              </div>
            </div>
            <div className="tool-card">
              <div className="tool-thumb-area">
                <img src="/images/tools/calculador_edad.png" alt="Calculadora de Edad Real del Perro" />
              </div>
              <div className="tool-body">
                <h3>Calculadora de Edad Real del Perro</h3>
                <p>Descubre cuántos años humanos tiene tu perro según su edad y tamaño.</p>
                <Link className="btn-primary blog-btn" href="/tools/edad-perro">Usar herramienta</Link>
              </div>
            </div>
            <div className="tool-card">
              <div className="tool-thumb-area">
                <img src="/images/tools/calendario_vacunas.png" alt="Calendario de Vacunas" />
              </div>
              <div className="tool-body">
                <h3>Calendario de Vacunas</h3>
                <p>Genera el calendario de vacunas de tu perro con fechas exactas según su fecha de nacimiento y país.</p>
                <Link className="btn-primary blog-btn" href="/tools/vacunas">Ver calendario</Link>
              </div>
            </div>
            <div className="tool-card">
              <div className="tool-thumb-area">
                <img src="/images/tools/condicion.png" alt="¿Tiene Sobrepeso tu Perro?" />
              </div>
              <div className="tool-body">
                <h3>¿Tiene Sobrepeso tu Perro?</h3>
                <p>Evalúa la condición corporal de tu perro (BCS) en 4 preguntas y obtén recomendaciones personalizadas.</p>
                <Link className="btn-primary blog-btn" href="/tools/condicion-corporal">Evaluar ahora</Link>
              </div>
            </div>
            <div className="tool-card">
              <div className="tool-thumb-area">
                <img src="/images/tools/test_raza.png" alt="¿Qué Raza de Perro es Para Ti?" />
              </div>
              <div className="tool-body">
                <h3>¿Qué Raza de Perro es Para Ti?</h3>
                <p>Responde 8 preguntas sobre tu estilo de vida y descubre qué razas encajan mejor contigo.</p>
                <Link className="btn-primary blog-btn" href="/tools/test-raza">Hacer el test</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
