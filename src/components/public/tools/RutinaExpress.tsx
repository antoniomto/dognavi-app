'use client'

import { useState } from 'react'

interface Step {
  duration: number
  title: string
  description: string
}

interface Routine {
  title: string
  steps: Step[]
  tip: string
}

const routines: Record<string, Routine> = {
  'alta-departamento-5': { title: 'Explosión Mental Express', steps: [{ duration: 2, title: 'Juego de Olfato Rápido', description: 'Esconde 3 premios en lugares visibles. Deja que los encuentre rápidamente para activar su cerebro.' }, { duration: 2, title: 'Comandos de Alta Energía', description: 'Secuencia: Sentado → Quieto → Giro → Pata. Repite 3 veces con entusiasmo.' }, { duration: 1, title: 'Respiración y Calma', description: 'Termina con caricias lentas y respiración tranquila para bajar revoluciones.' }], tip: '💡 Repite esta rutina 2-3 veces al día para quemar energía mental sin salir de casa.' },
  'alta-departamento-10': { title: 'Circuito Indoor Intenso', steps: [{ duration: 2, title: 'Calentamiento con Juego de Toalla', description: 'Enrolla una toalla con premios dentro. Que tu perro la desenrolle trabajando con las patas.' }, { duration: 4, title: 'Búsqueda de Premios en 3 Zonas', description: 'Esconde premios en sala, cocina y habitación.' }, { duration: 3, title: 'Mini Circuito', description: 'Toca la puerta → pasa bajo la mesa → sube al sillón. Repite 2 veces.' }, { duration: 1, title: 'Enfriamiento', description: 'Practica "quieto" 60 segundos.' }], tip: '🎯 Reduce ansiedad por separación hasta 40%.' },
  'alta-departamento-20': { title: 'Sesión Completa Indoor', steps: [{ duration: 3, title: 'Calentamiento Mental', description: 'Juego de "¿Dónde está?" con 5 escondites progresivamente difíciles.' }, { duration: 6, title: 'Circuito de Obstáculos Casero', description: 'Crea recorrido con sillas, cajas, cojines. 3 repeticiones.' }, { duration: 5, title: 'Tira y Afloja Controlado', description: 'Alterna entre tirar y soltar con comando.' }, { duration: 4, title: 'Comandos Avanzados', description: 'Practica: giro, reversa, muerto, busca objeto.' }, { duration: 2, title: 'Masaje Final', description: 'Masaje suave en pecho, cuello y orejas.' }], tip: '🏆 Equivale a 45 minutos de paseo.' },
  'alta-patio-5': { title: 'Sprint y Recuperación', steps: [{ duration: 3, title: 'Carreras Cortas', description: '3 sprints de punta a punta.' }, { duration: 2, title: 'Búsqueda Rápida', description: 'Lanza juguete 5 veces.' }], tip: '⚡ Ideal para quemar energía explosiva.' },
  'alta-patio-10': { title: 'Circuito al Aire Libre', steps: [{ duration: 2, title: 'Calentamiento', description: 'Sentado, quieto, ven.' }, { duration: 5, title: 'Fetch Intensivo', description: 'Lanza pelota 15 veces.' }, { duration: 2, title: 'Saltos', description: 'Saltos controlados sobre obstáculos.' }, { duration: 1, title: 'Respiración', description: 'Agua y calma.' }], tip: '🌤️ Evita horas de calor.' },
  'alta-patio-20': { title: 'Sesión Deportiva Completa', steps: [{ duration: 3, title: 'Calentamiento Progresivo', description: 'Camina → trota → corre.' }, { duration: 7, title: 'Agility', description: 'Slalom, saltos, túnel improvisado.' }, { duration: 5, title: 'Fetch Variado', description: 'Largo, corto, alto, bajo.' }, { duration: 3, title: 'Escondite', description: 'Que te encuentre.' }, { duration: 2, title: 'Enfriamiento', description: 'Estiramientos suaves.' }], tip: '💪 Equivalente a 1 hora de paseo.' },
  'alta-parque-5': { title: 'Sprint Explosivo', steps: [{ duration: 3, title: 'Carrera Libre', description: 'Corre en línea recta.' }, { duration: 2, title: 'Recuperación Activa', description: 'Camina lento.' }], tip: '🏃 Excelente descarga de energía.' },
  'alta-parque-10': { title: 'Aventura Acelerada', steps: [{ duration: 2, title: 'Trote', description: 'Ritmo moderado.' }, { duration: 5, title: 'Fetch con Intervalos', description: 'Largo y corto.' }, { duration: 2, title: 'Exploración', description: 'Zona nueva del parque.' }, { duration: 1, title: 'Calma', description: 'Respirar y caricias.' }], tip: '🎾 Útil pelota con cuerda.' },
  'alta-parque-20': { title: 'Sesión Deportiva Completa', steps: [{ duration: 4, title: 'Calentamiento Dinámico', description: 'Camina 2 min, trota 2 min.' }, { duration: 8, title: 'Fetch Intensivo', description: '20 lanzamientos.' }, { duration: 4, title: 'Socialización', description: 'Juego libre seguro.' }, { duration: 3, title: 'Circuito Natural', description: 'Bancos, troncos, escaleras.' }, { duration: 1, title: 'Enfriamiento', description: 'Agua y respiración.' }], tip: '🌟 Ideal para perros atletas.' },
  'media-departamento-5': { title: 'Estimulación Suave', steps: [{ duration: 3, title: 'Olfato Básico', description: 'Esconde 3 premios en lugares fáciles.' }, { duration: 2, title: 'Comandos Simples', description: 'Sentado, pata, quieto.' }], tip: '✨ Perfecto para días ocupados.' },
  'media-departamento-10': { title: 'Equilibrio Mental', steps: [{ duration: 3, title: 'Alfombra Olfativa', description: 'Esparce premios en alfombra.' }, { duration: 4, title: '¿Dónde está?', description: '4 escondites crecientes.' }, { duration: 2, title: 'Masticación Productiva', description: 'Juguete masticable.' }, { duration: 1, title: 'Caricias', description: 'Contacto suave.' }], tip: '🧘 Ideal para perros balanceados.' },
  'media-departamento-20': { title: 'Sesión Completa Balanceada', steps: [{ duration: 5, title: 'Olfato', description: '5 zonas distintas.' }, { duration: 6, title: 'Comandos y Tricks', description: 'Giro, reversa, busca, alto.' }, { duration: 5, title: 'Tira y Afloja Moderado', description: 'Juguete suave.' }, { duration: 3, title: 'Enriquecimiento Ambiental', description: 'Objetos nuevos.' }, { duration: 1, title: 'Relajación', description: 'Masaje suave.' }], tip: '⚖️ Equilibrio perfecto entre actividad y calma.' },
  'media-patio-5': { title: 'Paseo Corto Activo', steps: [{ duration: 3, title: 'Exploración Guiada', description: 'Olfatear 3 puntos.' }, { duration: 2, title: 'Fetch Moderado', description: '5 lanzamientos.' }], tip: '🍃 Ideal para media mañana.' },
  'media-patio-10': { title: 'Exploración y Juego', steps: [{ duration: 3, title: 'Caminata de Reconocimiento', description: 'Ritmo moderado.' }, { duration: 4, title: 'Fetch con Pausas', description: 'Entre lanzamientos practica comandos.' }, { duration: 2, title: 'Búsqueda de Objetos', description: '3 juguetes escondidos.' }, { duration: 1, title: 'Descanso', description: 'Agua y calma.' }], tip: '🌿 Estimulación mental + física.' },
  'media-patio-20': { title: 'Rutina Completa Moderada', steps: [{ duration: 5, title: 'Calentamiento Exploratorio', description: 'Explorar todo el patio.' }, { duration: 6, title: 'Fetch + Comandos', description: '15 lanzamientos.' }, { duration: 4, title: 'Escondite Moderado', description: 'Juguetes y premios.' }, { duration: 3, title: 'Relajación', description: 'Caricias suaves.' }, { duration: 2, title: 'Snack', description: 'Premio final.' }], tip: '🎯 Ideal diario.' },
  'media-parque-5': { title: 'Paseo Express', steps: [{ duration: 4, title: 'Caminata Rápida', description: 'Practica "junto".' }, { duration: 1, title: 'Olfateo Libre', description: 'Zona segura.' }], tip: '🚶 Ideal para breaks del trabajo.' },
  'media-parque-10': { title: 'Paseo Balanceado', steps: [{ duration: 4, title: 'Caminata Moderada', description: 'Constante.' }, { duration: 3, title: 'Fetch Controlado', description: '6 lanzamientos.' }, { duration: 2, title: 'Socialización Suave', description: 'Saludo breve.' }, { duration: 1, title: 'Respiración', description: 'Calma final.' }], tip: '🌤️ Ideal para energía media.' },
  'media-parque-20': { title: 'Aventura Moderada', steps: [{ duration: 6, title: 'Caminata Exploratoria', description: 'Olfato libre.' }, { duration: 6, title: 'Fetch Moderado', description: 'Comandos intercalados.' }, { duration: 4, title: 'Socialización', description: 'Observación tranquila.' }, { duration: 3, title: 'Circuito Natural', description: 'Escaleras, troncos, senderos.' }, { duration: 1, title: 'Cierre Calmo', description: 'Respiración y agua.' }], tip: '🌳 Perfecto para adultos.' },
  'baja-departamento-5': { title: 'Estimulación Mínima', steps: [{ duration: 3, title: 'Olfato Pasivo', description: 'Esparce premios en toalla.' }, { duration: 2, title: 'Caricias', description: 'Masaje suave en orejas y cuello.' }], tip: '😴 Ideal para seniors.' },
  'baja-departamento-10': { title: 'Relax Enriquecido', steps: [{ duration: 4, title: 'Alfombra Olfativa Extendida', description: '10 premios.' }, { duration: 3, title: 'Kong Congelado', description: 'Relleno de yogurt o paté.' }, { duration: 2, title: 'Masaje Relajante', description: 'Cuello, pecho, orejas.' }, { duration: 1, title: 'Música Tranquila', description: 'Sonidos suaves.' }], tip: '🧘 Ideal para relajación profunda.' },
  'baja-departamento-20': { title: 'Sesión de Bienestar', steps: [{ duration: 6, title: 'Olfato', description: '5 escondites fáciles.' }, { duration: 6, title: 'Masticación Prolongada', description: 'Kong o dental.' }, { duration: 5, title: 'Masaje Completo', description: 'Orejas, cuello, patas, espalda.' }, { duration: 2, title: 'Comandos Suaves', description: 'Sentado, pata, quieto.' }, { duration: 1, title: 'Cierre', description: 'Respiración guiada.' }], tip: '💤 Para recuperación o descanso total.' },
  'baja-patio-5': { title: 'Exploración Tranquila', steps: [{ duration: 4, title: 'Caminata Muy Lenta', description: 'Olfato libre.' }, { duration: 1, title: 'Solcito', description: 'Descanso al sol.' }], tip: '☀️ Vitamina D natural.' },
  'baja-patio-10': { title: 'Paseo Contemplativo', steps: [{ duration: 5, title: 'Caminata Pausada', description: 'Olfato frecuente.' }, { duration: 3, title: 'Observación', description: 'Escuchar entorno.' }, { duration: 2, title: 'Snack', description: 'Premio suave y agua.' }], tip: '🌺 Estimula sin cansar.' },
  'baja-patio-20': { title: 'Conexión con Naturaleza', steps: [{ duration: 8, title: 'Exploración Profunda', description: 'Plantas, texturas, tierra.' }, { duration: 5, title: 'Descanso Natural', description: 'Bajo sombra o banco.' }, { duration: 4, title: 'Enriquecimiento Ambiental', description: 'Objetos nuevos seguros.' }, { duration: 2, title: 'Masaje Exterior', description: 'Suave y lento.' }, { duration: 1, title: 'Cierre', description: 'Agua y respiración.' }], tip: '🍃 Perfecta para recuperación.' },
  'baja-parque-5': { title: 'Paseo Terapéutico Corto', steps: [{ duration: 4, title: 'Caminata Ultra Lenta', description: 'Olfato cada metro.' }, { duration: 1, title: 'Descanso en Banco', description: 'Observación tranquila.' }], tip: '🩺 Ideal en recuperación.' },
  'baja-parque-10': { title: 'Paseo de Bienestar', steps: [{ duration: 5, title: 'Caminata Contemplativa', description: 'Sin prisa.' }, { duration: 3, title: 'Césped', description: 'Caminar sobre pasto.' }, { duration: 2, title: 'Descanso', description: 'Agua y caricias.' }], tip: '🌿 Terapéutico para articulaciones.' },
  'baja-parque-20': { title: 'Sesión de Recuperación', steps: [{ duration: 8, title: 'Caminata Lenta', description: 'Olfato libre frecuente.' }, { duration: 5, title: 'Descanso Natural', description: 'Sombra o banco.' }, { duration: 4, title: 'Olfato Pasivo', description: 'Plantas y árboles.' }, { duration: 2, title: 'Contacto Social Suave', description: 'Saludo tranquilo.' }, { duration: 1, title: 'Cierre', description: 'Agua y calma.' }], tip: '🏥 Especial para post-operatorio.' },
}

type SelectState = { energia: string; espacio: string; tiempo: string }

export default function RutinaExpressTool() {
  const [state, setState] = useState<SelectState>({ energia: '', espacio: '', tiempo: '' })
  const [result, setResult] = useState<Routine | null>(null)
  const [resultKey, setResultKey] = useState('')

  const isReady = state.energia && state.espacio && state.tiempo

  function select(q: keyof SelectState, v: string) {
    setState(prev => ({ ...prev, [q]: v }))
    setResult(null)
  }

  function generate() {
    const key = `${state.energia}-${state.espacio}-${state.tiempo}`
    const r = routines[key]
    if (r) { setResult(r); setResultKey(key) }
  }

  function reset() {
    setState({ energia: '', espacio: '', tiempo: '' })
    setResult(null)
    setResultKey('')
  }

  return (
    <>
      <style>{`
        .questions-section { max-width: 900px; margin: 0 auto; padding: 3rem 2rem; }
        .question-group { background: #fff; border-radius: 18px; padding: 1.8rem; margin-bottom: 1.5rem; box-shadow: 0 4px 18px rgba(0,0,0,0.07); }
        .question-group h3 { font-family: 'Poppins', sans-serif; font-size: 1.15rem; font-weight: 800; color: #2e4a3a; margin-bottom: 1rem; }
        .options { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .option-btn { background: #f8f6f2; border: 2px solid transparent; border-radius: 14px; padding: 0.85rem 1.4rem; font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 0.95rem; color: #555; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 0.4rem; transition: all 0.18s; min-width: 120px; }
        .option-btn:hover { border-color: #617e67; background: #f0f5f1; transform: translateY(-2px); }
        .option-btn.selected { background: #eaf2eb; border-color: #617e67; color: #2e4a3a; }
        .option-btn .icon { font-size: 1.5rem; }
        .generate-btn { display: block; width: 100%; padding: 1.1rem 2rem; background: #617e67; color: #fff; border: none; border-radius: 50px; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 1.1rem; cursor: pointer; margin-top: 1rem; transition: all 0.25s; }
        .generate-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .generate-btn:not(:disabled):hover { background: #4e6656; transform: translateY(-2px); }
        .result-section { max-width: 900px; margin: 0 auto; padding: 0 2rem 3rem; }
        .result-header { background: linear-gradient(135deg, #3d5a47, #617e67); color: #fff; border-radius: 18px; padding: 2rem 2.5rem; margin-bottom: 1.5rem; }
        .result-header h2 { font-family: 'Poppins', sans-serif; font-size: 1.8rem; font-weight: 800; color: #fff; margin: 0 0 0.4rem; }
        .result-header .subtitle { font-size: 1rem; opacity: 0.85; margin: 0; }
        .step { background: #fff; border-radius: 16px; padding: 1.4rem 1.6rem; margin-bottom: 1rem; box-shadow: 0 3px 14px rgba(0,0,0,0.07); display: flex; gap: 1.2rem; align-items: flex-start; }
        .step-number { background: #617e67; color: #fff; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.9rem; flex-shrink: 0; }
        .step-info { flex: 1; }
        .step-header-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.3rem; }
        .step-duration { background: #F4EDE4; color: #667e6d; font-weight: 700; font-size: 0.8rem; padding: 0.2rem 0.6rem; border-radius: 20px; }
        .step-title { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 1rem; color: #2e4a3a; }
        .step-description { font-size: 0.92rem; color: #666; line-height: 1.5; }
        .tip-box-routine { background: #f0f5f1; border-left: 4px solid #617e67; padding: 1.2rem 1.4rem; border-radius: 0 12px 12px 0; margin: 1.5rem 0; font-weight: 600; color: #2e4a3a; }
        .result-products { background: #F4EDE4; border-radius: 18px; padding: 1.8rem; margin: 1.5rem 0; }
        .result-products h4 { font-family: 'Poppins', sans-serif; color: #2e4a3a; margin-bottom: 1.2rem; }
        .product-grid-routine { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.2rem; }
        .product-card-routine { background: #fff; border-radius: 14px; padding: 1.2rem; box-shadow: 0 2px 10px rgba(0,0,0,0.06); display: flex; flex-direction: column; gap: 0.7rem; }
        .product-card-routine img { width: 100%; height: 120px; object-fit: contain; }
        .product-card-routine .name { font-weight: 700; font-size: 0.9rem; color: #2e4a3a; }
        .product-card-routine .link { background: #F3AF4B; color: #000; padding: 0.6rem; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 0.85rem; text-align: center; display: block; }
        .reset-btn { display: block; margin: 1.5rem auto; background: transparent; border: 2px solid #999; color: #999; border-radius: 50px; padding: 0.6rem 2rem; font-weight: 700; cursor: pointer; font-family: 'Nunito', sans-serif; transition: 0.2s; }
        .reset-btn:hover { border-color: #617e67; color: #617e67; }
      `}</style>

      {!result ? (
        <div className="questions-section">
          <div className="question-group">
            <h3><span>⚡</span> Nivel de Energía de tu Perro</h3>
            <div className="options">
              {[{ v: 'baja', icon: '😴', l: 'Baja' }, { v: 'media', icon: '🙂', l: 'Media' }, { v: 'alta', icon: '🔥', l: 'Alta' }].map(o => (
                <button key={o.v} className={`option-btn${state.energia === o.v ? ' selected' : ''}`} onClick={() => select('energia', o.v)} type="button">
                  <span className="icon">{o.icon}</span>{o.l}
                </button>
              ))}
            </div>
          </div>

          <div className="question-group">
            <h3><span>🏠</span> Espacio Disponible</h3>
            <div className="options">
              {[{ v: 'departamento', icon: '🏢', l: 'Departamento' }, { v: 'patio', icon: '🏡', l: 'Casa con Patio' }, { v: 'parque', icon: '🌳', l: 'Acceso a Parque' }].map(o => (
                <button key={o.v} className={`option-btn${state.espacio === o.v ? ' selected' : ''}`} onClick={() => select('espacio', o.v)} type="button">
                  <span className="icon">{o.icon}</span>{o.l}
                </button>
              ))}
            </div>
          </div>

          <div className="question-group">
            <h3><span>⏱️</span> Tiempo Disponible</h3>
            <div className="options">
              {[{ v: '5', icon: '⏰', l: '5 minutos' }, { v: '10', icon: '⏱️', l: '10 minutos' }, { v: '20', icon: '⏲️', l: '20 minutos' }].map(o => (
                <button key={o.v} className={`option-btn${state.tiempo === o.v ? ' selected' : ''}`} onClick={() => select('tiempo', o.v)} type="button">
                  <span className="icon">{o.icon}</span>{o.l}
                </button>
              ))}
            </div>
          </div>

          <button className="generate-btn" disabled={!isReady} onClick={generate} type="button">
            🎯 Generar Mi Rutina Express
          </button>
        </div>
      ) : (
        <div className="result-section">
          <div className="result-header">
            <h2>{result.title}</h2>
            <p className="subtitle">{state.tiempo} minutos • Energía {state.energia.charAt(0).toUpperCase() + state.energia.slice(1)} • {state.espacio.charAt(0).toUpperCase() + state.espacio.slice(1)}</p>
          </div>

          {result.steps.map((step, i) => (
            <div key={i} className="step">
              <div className="step-number">{i + 1}</div>
              <div className="step-info">
                <div className="step-header-row">
                  <span className="step-duration">{step.duration} min</span>
                  <span className="step-title">{step.title}</span>
                </div>
                <div className="step-description">{step.description}</div>
              </div>
            </div>
          ))}

          <div className="tip-box-routine"><strong>💡 Tip Profesional:</strong> {result.tip}</div>

          <div className="result-products">
            <h4>🛒 Productos Recomendados</h4>
            <div className="product-grid-routine">
              <div className="product-card-routine">
                <img src="/images/productos/juguete_mental.webp" alt="Juguete mental" />
                <div className="name">Juguete Treats Bala Estimulación Mental</div>
                <a className="link" href="https://mercadolibre.com/sec/1JUts75" target="_blank" rel="nofollow noopener">Ver en Mercado Libre</a>
              </div>
              <div className="product-card-routine">
                <img src="/images/productos/juguete_kong.webp" alt="Kong rellenable" />
                <div className="name">Kong Tires Juguete Llanta Rellenable</div>
                <a className="link" href="https://mercadolibre.com/sec/2V7m7E3" target="_blank" rel="nofollow noopener">Ver en Mercado Libre</a>
              </div>
              <div className="product-card-routine">
                <img src="/images/productos/frisbee.webp" alt="Frisbee" />
                <div className="name">Frisbee De Hule Flexible Para Mascotas</div>
                <a className="link" href="https://mercadolibre.com/sec/1mevvvS" target="_blank" rel="nofollow noopener">Ver en Mercado Libre</a>
              </div>
            </div>
          </div>

          <button className="reset-btn" onClick={reset} type="button">🔄 Generar otra rutina</button>
        </div>
      )}
    </>
  )
}
