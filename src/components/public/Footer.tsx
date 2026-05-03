import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">

        <div className="footer-section">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
            <Image src="/images/dognavi_logo.png" alt="DogNavi" width={55} height={55} style={{ height: '55px', width: 'auto' }} />
            <h4 style={{ margin: 0 }}>DogNavi</h4>
          </div>
          <p>
            Herramientas inteligentes para dueños responsables.<br />
            Mejoramos la vida de tu perro con información confiable y calculadoras precisas.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="YouTube">📹</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Explorar</h4>
          <ul>
            <li><Link href="/#calculadora">Calculadora</Link></li>
            <li><Link href="/blog">Todas las guías</Link></li>
            <li><Link href="/#productos">Productos</Link></li>
            <li><Link href="/#herramientas">Herramientas</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Últimas Guías</h4>
          <ul>
            <li><Link href="/blog/porque-mi-perro-tiembla-causas-soluciones">Mi Perro Tiembla: 9 Causas</Link></li>
            <li><Link href="/blog/golpe-de-calor-en-perros-senales-que-hacer">Golpe de Calor en Perros</Link></li>
            <li><Link href="/blog/perro-deshidratado-senales-que-hacer">Perro Deshidratado: Señales</Link></li>
            <li><Link href="/blog/como-socializar-un-cachorro-correctamente">Cómo Socializar un Cachorro</Link></li>
            <li><Link href="/blog/perro-no-quiere-comer-causas-soluciones">Mi Perro No Quiere Comer</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><Link href="/sobre-nosotros">Sobre Nosotros</Link></li>
            <li><a href="https://dognavi.org/aviso-legal.html" target="_blank" rel="noopener">Aviso Legal</a></li>
            <li><a href="https://dognavi.org/privacidad.html" target="_blank" rel="noopener">Política de Privacidad</a></li>
            <li><a href="https://dognavi.org/cookies.html" target="_blank" rel="noopener">Política de Cookies</a></li>
            <li><a href="https://dognavi.org/afiliados.html" target="_blank" rel="noopener">Divulgación de Afiliados</a></li>
            <li><a href="https://dognavi.org/descargo-medico.html" target="_blank" rel="noopener">Descargo Médico</a></li>
            <li><a href="https://dognavi.org/contacto.html" target="_blank" rel="noopener">Contacto</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        © 2025 DogNavi — Algunos enlaces pueden ser de afiliado
      </div>
    </footer>
  )
}
