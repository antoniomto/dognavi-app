'use client'

import { useState } from 'react'
import Link from 'next/link'

const etapaTips: Record<string, string[]> = {
  cachorro: [
    'Socialización prioritaria: expón a tu perro a personas, sonidos y entornos variados antes de las 16 semanas.',
    'Empieza con comandos básicos (siéntate, quieto, ven) — aprenden rapidísimo a esta edad.',
    'Visitas frecuentes al veterinario para vacunas y desparasitación.',
    'Cuida sus articulaciones: evita saltos y escaleras excesivos durante el crecimiento.',
    'Juega mucho, pero con descanso suficiente — también necesitan dormir bastante.',
  ],
  adultoJoven: [
    'Máxima capacidad de aprendizaje — buen momento para deportes caninos o cursos avanzados.',
    'Ejercicio diario adaptado a su raza y tamaño para canalizar su energía.',
    'Alimentación ajustada: a esta edad pueden aumentar de peso si están esterilizados y poco activos.',
    'Revisión veterinaria anual aunque esté sano — prevención es clave.',
    'Refuerza el vínculo con sesiones de juego e interacción diaria.',
  ],
  adulto: [
    'Ideal para actividades de coordinación y juego mental (puzzles, juguetes de comida).',
    'Mantén el peso bajo control — el sobrepeso en esta etapa acorta la vida.',
    'Chequeo veterinario anual con analítica básica de sangre.',
    'El ejercicio regular sigue siendo fundamental para articulaciones y mente.',
    'Buen momento para comprobar el estado dental si no lo has hecho antes.',
  ],
  adultoMaduro: [
    'Introduce alimentos o pienso específico para razas maduras (mayor digestibilidad, menos calorías).',
    'Revisiones veterinarias cada 6-12 meses: corazón, articulaciones, tiroides.',
    'Ejercicio moderado y constante — los paseos cortos son mejores que uno muy largo.',
    'Observa cambios de comportamiento: pueden indicar dolor o enfermedad.',
    'Suplementos de omega-3 y condroprotectores si hay señales de rigidez articular.',
  ],
  senior: [
    'Revisión veterinaria cada 6 meses con análisis completo de sangre y orina.',
    'Adapta la cama y el entorno: rampas en vez de escaleras, cama ortopédica.',
    'Paseos cortos y frecuentes en lugar de largos — respeta su ritmo.',
    'Presta atención a cambios en el apetito, sed, o sueño — son señales importantes.',
    'Dale el mayor tiempo de calidad posible — los seniors son perros increíbles.',
  ],
}

interface Result {
  edadHumana: number
  etapaKey: string
  etapaLabel: string
  nombreStr: string
}

export default function EdadPerroTool() {
  const [edad, setEdad] = useState('')
  const [tamano, setTamano] = useState('')
  const [nombre, setNombre] = useState('')
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState('')

  function handleCalcular() {
    const e = parseFloat(edad)
    if (!e || e < 0) { setError('⚠️ Ingresa una edad válida.'); setResult(null); return }
    if (!tamano) { setError('⚠️ Selecciona el tamaño del perro.'); setResult(null); return }
    setError('')

    let edadHumana = 0
    if (e <= 1) {
      edadHumana = 15 * e
    } else if (e <= 2) {
      edadHumana = 15 + (e - 1) * 9
    } else {
      const extra = e - 2
      if (tamano === 'pequeno') edadHumana = 24 + extra * 4.5
      else if (tamano === 'mediano') edadHumana = 24 + extra * 5.5
      else edadHumana = 24 + extra * 6.5
    }
    edadHumana = Math.round(edadHumana * 10) / 10

    let etapaKey = ''
    let etapaLabel = ''
    if (edadHumana < 15) { etapaKey = 'cachorro'; etapaLabel = '🐾 <strong>Cachorro:</strong> etapa de crecimiento rápido y aprendizaje.' }
    else if (edadHumana < 30) { etapaKey = 'adultoJoven'; etapaLabel = '🐾 <strong>Adulto joven:</strong> energía alta, gran capacidad de entrenamiento.' }
    else if (edadHumana < 50) { etapaKey = 'adulto'; etapaLabel = '🐾 <strong>Adulto:</strong> equilibrio ideal entre energía y madurez.' }
    else if (edadHumana < 70) { etapaKey = 'adultoMaduro'; etapaLabel = '🐾 <strong>Adulto maduro:</strong> controlar peso, articulaciones y chequeos.' }
    else { etapaKey = 'senior'; etapaLabel = '🐾 <strong>Senior:</strong> cuidados especiales, paseos suaves y chequeos regulares.' }

    setResult({ edadHumana, etapaKey, etapaLabel, nombreStr: nombre.trim() || 'Tu perro' })
  }

  return (
    <>
      <section className="calculator-box" style={{ marginTop: '20px' }}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="edad">Edad del perro (años)</label>
            <input type="number" id="edad" min="0" step="0.1" placeholder="Ej: 3.5" value={edad} onChange={e => setEdad(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="tamano">Tamaño del perro</label>
            <select id="tamano" value={tamano} onChange={e => setTamano(e.target.value)}>
              <option value="">Selecciona una opción</option>
              <option value="pequeno">Pequeño (menos de 10 kg)</option>
              <option value="mediano">Mediano (10–25 kg)</option>
              <option value="grande">Grande (más de 25 kg)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="nombrePerro">Nombre del perro <span style={{ fontWeight: 400, color: '#aaa' }}>(opcional)</span></label>
            <input type="text" id="nombrePerro" placeholder="Ej: Coco" maxLength={30} value={nombre} onChange={e => setNombre(e.target.value)} />
          </div>
        </div>
        <button className="btn-primary" id="calcularEdad" style={{ marginTop: '25px', width: '100%' }} onClick={handleCalcular} type="button">
          Calcular Edad Humana
        </button>
      </section>

      {error && (
        <div className="result-box" style={{ marginTop: '40px' }}>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div id="resultado" className="result-box" style={{ marginTop: '40px' }}>
          <h2>Edad humana de tu perro:</h2>
          <p id="edadHumana" className="big-result">
            {result.nombreStr} tiene <strong>{result.edadHumana}</strong>{' '}
            <span style={{ fontSize: '18px' }}>años humanos</span>
          </p>

          <div
            id="etapaPerro"
            className="highlight-box"
            style={{ marginBottom: '1.2rem' }}
            dangerouslySetInnerHTML={{ __html: result.etapaLabel }}
          />

          <div style={{
            background: '#f0f5f1',
            borderLeft: '4px solid #667e6d',
            borderRadius: '0 12px 12px 0',
            padding: '1.2rem 1.4rem',
            marginBottom: '1.5rem',
            fontSize: '0.92rem',
            color: '#3d5a47',
            lineHeight: '1.6',
          }}>
            <h3 style={{ fontSize: '1rem', color: '#2e4a3a', margin: '0 0 0.6rem', fontFamily: "'Poppins', sans-serif" }}>
              Qué tener en cuenta en esta etapa
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {etapaTips[result.etapaKey]?.map((tip, i) => (
                <li key={i} style={{ padding: '0.25rem 0 0.25rem 1.4rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#667e6d', fontWeight: 700 }}>→</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="cta-box">
            <h3>📊 Calcula también su porción ideal</h3>
            <p>La alimentación correcta depende de su etapa de vida.</p>
            <Link href="/#calculadora" className="btn">Calcular Porción Ideal</Link>
          </div>
        </div>
      )}

      <style>{`
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 25px; margin-bottom: 20px; }
      `}</style>
    </>
  )
}
