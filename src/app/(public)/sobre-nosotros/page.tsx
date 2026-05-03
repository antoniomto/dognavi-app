import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Sobre DogNavi | Quiénes Somos, Misión y Metodología',
  description: 'Conoce el equipo de DogNavi, nuestra misión y cómo garantizamos información veterinaria rigurosa y confiable para dueños de perros.',
  alternates: {
    canonical: 'https://dognavi.org/sobre-nosotros',
  },
}

export default function SobreNosotrosPage() {
  return (
    <>
      {/* HERO */}
      <section
        className="hero"
        style={{ backgroundImage: "url('/images/banner.jpg')" }}
      >
        <div className="hero-content">
          <h1>Sobre DogNavi</h1>
          <p className="subtitle">
            Una plataforma creada para ayudarte a tomar mejores decisiones sobre la salud,
            alimentación y bienestar de tu perro.
          </p>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="calculator-info">
        <div className="calculator-info-inner">

          <div className="section-header">
            <h2>Nuestra misión</h2>
            <p>
              Hacer accesible la información veterinaria confiable para cualquier dueño de perro,
              sin tecnicismos innecesarios ni información confusa.
            </p>
          </div>

          <div className="calculator-text">
            <p>
              DogNavi nace de una realidad cotidiana: la mayoría de los dueños de perros toman
              decisiones importantes sobre la salud y alimentación de sus mascotas basándose en
              información incompleta, contradictoria o directamente incorrecta. Cuánto alimentarles,
              cómo reconocer señales de alerta, cuándo es urgente ir al veterinario y cuándo no...
              son preguntas que merecen respuestas claras y basadas en evidencia.
            </p>
            <p>
              Nuestro objetivo es convertir conocimientos veterinarios y guías clínicas en
              herramientas prácticas, claras y fáciles de aplicar. Cada artículo, calculadora
              y herramienta que publicamos pasa por un proceso de revisión riguroso basado en
              referencias veterinarias reconocidas.
            </p>
          </div>

          <div className="section-header" style={{ marginTop: '3rem' }}>
            <h2>Nuestra metodología editorial</h2>
          </div>

          <div className="calculator-text">
            <p>Todo el contenido de DogNavi se elabora siguiendo estos principios:</p>
            <ul>
              <li>✅ <strong>Basado en evidencia:</strong> Nuestras guías citan fórmulas veterinarias establecidas (RER, MER), recomendaciones de asociaciones veterinarias internacionales y literatura clínica reconocida.</li>
              <li>✅ <strong>Revisión continua:</strong> El contenido se actualiza periódicamente para reflejar los conocimientos veterinarios más actuales. Cada artículo muestra su fecha de última revisión.</li>
              <li>✅ <strong>Sin alarmismo:</strong> Distinguimos claramente entre situaciones de emergencia real y preocupaciones menores, para que puedas tomar decisiones informadas sin entrar en pánico innecesario.</li>
              <li>✅ <strong>Transparencia sobre limitaciones:</strong> DogNavi es una herramienta educativa, no un sustituto de la consulta veterinaria. Lo indicamos siempre que es relevante.</li>
              <li>✅ <strong>Sin conflicto de intereses:</strong> Las recomendaciones de productos son editorialmente independientes. Cuando hay enlaces de afiliado, lo indicamos de forma transparente.</li>
            </ul>
          </div>

          <div className="section-header" style={{ marginTop: '3rem' }}>
            <h2>El equipo detrás de DogNavi</h2>
          </div>

          <div className="calculator-text">
            <p>
              DogNavi es un proyecto creado por un equipo de apasionados del bienestar animal
              con formación en nutrición canina, comportamiento y comunicación científica.
              Combinamos experiencia práctica con rigor técnico para ofrecer un recurso en el
              que los dueños de perros puedan confiar.
            </p>
            <p>Nuestro equipo cuenta con:</p>
            <ul>
              <li>📚 <strong>Formación en nutrición y medicina veterinaria</strong> aplicada</li>
              <li>🐾 <strong>Experiencia directa con perros</strong> de distintas razas, tamaños y necesidades</li>
              <li>🔬 <strong>Revisión sistemática de literatura</strong> veterinaria actualizada</li>
              <li>💬 <strong>Colaboración con profesionales</strong> del sector veterinario para validar contenido técnico</li>
            </ul>
            <p>
              Puedes contactarnos a través de nuestra{' '}
              <a href="https://dognavi.org/contacto.html" target="_blank" rel="noopener">página de contacto</a>{' '}
              para cualquier consulta, corrección o sugerencia editorial.
            </p>
          </div>

          <div className="section-header" style={{ marginTop: '3rem' }}>
            <h2>Qué encontrarás en DogNavi</h2>
          </div>

          <div className="calculator-text">
            <ul>
              <li>🧮 <strong>Calculadora de alimentación:</strong> Porciones exactas según peso, edad y actividad, basadas en fórmulas veterinarias RER/MER</li>
              <li>📅 <strong>Calculadora de edad:</strong> Convierte la edad de tu perro a equivalente humano según su tamaño</li>
              <li>🏃 <strong>Generador de rutinas de ejercicio:</strong> Planes adaptados a la raza, edad y condición del perro</li>
              <li>📖 <strong>Guías de salud y nutrición:</strong> Artículos detallados sobre alimentación, enfermedades comunes, comportamiento y cuidado</li>
              <li>⚠️ <strong>Protocolos de emergencia:</strong> Qué hacer ante síntomas preocupantes y cuándo ir urgentemente al veterinario</li>
            </ul>
          </div>

          <div className="section-header" style={{ marginTop: '3rem' }}>
            <h2>Nuestro compromiso ético</h2>
          </div>

          <div className="calculator-text">
            <p>
              DogNavi no sustituye la consulta veterinaria. Nuestro compromiso es ofrecer
              orientación confiable que te ayude a tomar mejores decisiones y a detectar
              cuándo es importante acudir con un profesional de la salud animal.
            </p>
            <p>
              Si detectas cualquier información incorrecta o desactualizada en nuestro sitio,
              agradecemos que nos lo comuniques. La precisión de nuestra información es nuestra
              responsabilidad más importante.
            </p>
            <p style={{ fontStyle: 'italic', color: '#667e6d', marginTop: '1.5rem' }}>
              "Un tutor informado puede mejorar significativamente la calidad de vida y longevidad de su perro."
            </p>
          </div>

        </div>
      </section>
    </>
  )
}
