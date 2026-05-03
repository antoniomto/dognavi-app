'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Question {
  id: string
  title: string
  subtitle: string
  options: { label: string; icon: string; value: number }[]
}

interface BCSData {
  label: string
  color: string
  emoji: string
  text: string
  reco: string[]
}

const questions: Question[] = [
  {
    id: 'q1',
    title: '¿Puedes sentir las costillas de tu perro?',
    subtitle: 'Pasa los dedos por el costado de tu perro, como si acariciaras las teclas de un piano.',
    options: [
      { label: 'Se ven claramente sin tocar', icon: '👀', value: 0 },
      { label: 'Las siento sin apenas presionar', icon: '🤏', value: 1 },
      { label: 'Las siento con presión normal', icon: '✋', value: 2 },
      { label: 'No las encuentro aunque presione fuerte', icon: '❌', value: 3 },
    ],
  },
  {
    id: 'q2',
    title: 'Visto desde arriba, ¿cómo es la silueta de tu perro?',
    subtitle: 'Míralo de pie desde arriba. ¿Tiene "cintura"?',
    options: [
      { label: 'Costillas y vértebras muy visibles, muy estrecho', icon: '🔍', value: 0 },
      { label: 'Cintura muy marcada, figura de reloj de arena', icon: '⌛', value: 1 },
      { label: 'Cintura visible detrás de las costillas', icon: '✅', value: 2 },
      { label: 'Forma oval o barril, sin cintura visible', icon: '🥚', value: 3 },
    ],
  },
  {
    id: 'q3',
    title: 'Visto de lado, ¿cómo es el abdomen (barriga)?',
    subtitle: 'Míralo de lado. ¿La barriga sube o baja respecto al pecho?',
    options: [
      { label: 'Abdomen muy recogido, casi en el aire', icon: '🏃', value: 0 },
      { label: 'Recogido claramente hacia arriba', icon: '⬆️', value: 1 },
      { label: 'Ligeramente recogido (curva suave)', icon: '↗️', value: 2 },
      { label: 'Plano o cuelga hacia abajo', icon: '⬇️', value: 3 },
    ],
  },
  {
    id: 'q4',
    title: '¿Notas los huesos de cadera o columna al tocarlo?',
    subtitle: 'Pasa la mano por la espalda y la zona de la cadera.',
    options: [
      { label: 'Se ven y sobresalen claramente', icon: '💀', value: 0 },
      { label: 'Los siento con facilidad, muy marcados', icon: '👆', value: 1 },
      { label: 'Los siento con algo de presión', icon: '🤚', value: 2 },
      { label: 'No los noto, hay mucha capa grasa', icon: '🫧', value: 3 },
    ],
  },
]

const bcsData: Record<number, BCSData> = {
  1: { label: 'Desnutrición grave', color: '#c0392b', emoji: '🚨', text: 'Tu perro está gravemente por debajo de su peso ideal. Las costillas, vértebras y huesos de la cadera son muy visibles. Esta situación requiere atención veterinaria urgente para descartar enfermedades subyacentes (parásitos, problemas renales, intestinales) y establecer un plan de recuperación nutricional supervisado.', reco: ['Visita al veterinario de forma urgente', 'No aumentes la comida abruptamente sin supervisión', 'El veterinario puede pedir análisis de sangre, heces y orina', 'La recuperación nutricional debe ser gradual para evitar síndrome de realimentación'] },
  2: { label: 'Muy bajo peso', color: '#e74c3c', emoji: '⚠️', text: 'Tu perro está significativamente por debajo de su peso saludable. Los huesos son muy visibles y hay poca masa muscular. Consulta con el veterinario para descartar causas médicas y establecer una dieta de recuperación adecuada.', reco: ['Consulta veterinaria para descartar problemas de salud', 'Aumenta gradualmente la porción (10-15% más por semana)', 'Considera un alimento de alta densidad calórica', 'Monitorea el peso semanal'] },
  3: { label: 'Bajo peso', color: '#e67e22', emoji: '📉', text: 'Tu perro está algo por debajo de su peso ideal. Las costillas y huesos son palpables con facilidad. Puede necesitar un pequeño ajuste en la dieta o una revisión veterinaria para descartar causas.', reco: ['Aumenta la porción un 10% durante 2-3 semanas', 'Verifica que el alimento sea apropiado para su edad y tamaño', 'Si no sube de peso, consulta al veterinario', 'Asegura que no haya otro perro compitiendo por la comida'] },
  4: { label: 'Peso ideal bajo', color: '#27ae60', emoji: '✅', text: 'Tu perro está en el rango saludable, en el extremo delgado del ideal. Puedes ver una silueta atlética, las costillas se sienten con presión suave y hay cintura bien definida. Muchas razas atléticas tienen naturalmente un BCS 4.', reco: ['¡Bien! Mantén la alimentación actual', 'Si es una raza activa (Galgo, Pointer, Whippet), BCS 4 es perfectamente normal', 'Monitorea peso mensual', 'Asegura ejercicio adecuado para su raza y edad'] },
  5: { label: 'Peso ideal', color: '#27ae60', emoji: '🏆', text: '¡Excelente! Tu perro está en el peso ideal. Las costillas se palpan con presión normal, hay cintura visible desde arriba y el abdomen tiene una leve curva ascendente visto de lado. Este es el estado óptimo para su salud a largo plazo.', reco: ['¡Perfecto! Mantén la rutina de alimentación actual', 'Continúa con el ejercicio regular', 'Evalúa condición corporal mensualmente', 'Ajusta la porción si cambia el nivel de actividad o el peso'] },
  6: { label: 'Ligero sobrepeso', color: '#f39c12', emoji: '⚠️', text: 'Tu perro tiene algo de sobrepeso. Las costillas son difíciles de palpar sin presión firme y la cintura apenas se distingue. En esta etapa es más fácil corregirlo: un ajuste moderado en la dieta y más ejercicio serán suficientes.', reco: ['Reduce la porción un 10-15% durante 4-6 semanas', 'Elimina o reduce significativamente los snacks y premios', 'Aumenta el ejercicio: 15-20 min más al día', 'Si en 6 semanas no mejora, consulta al veterinario'] },
  7: { label: 'Sobrepeso', color: '#e67e22', emoji: '📈', text: 'Tu perro tiene sobrepeso. Las costillas apenas se palpan, no hay cintura visible y el abdomen está plano o caído. El sobrepeso canino aumenta el riesgo de diabetes, problemas articulares, enfermedades cardiovasculares y reduce la esperanza de vida.', reco: ['Reduce la porción un 20% y consulta al veterinario', 'Elimina completamente los snacks o usa zanahorias crudas como alternativa', 'Ejercicio diario moderado: 2 caminatas de 20-30 min', 'Considera una dieta específica para control de peso (light)', 'Pesada mensual para monitorear progreso'] },
  8: { label: 'Obesidad', color: '#c0392b', emoji: '🔴', text: 'Tu perro tiene obesidad. Las costillas están cubiertas por una capa gruesa de grasa y no se palpan, el abdomen cuelga visiblemente. La obesidad canina es una enfermedad que requiere atención médica: puede haber causas hormonales (hipotiroidismo, Cushing) además del exceso dietético.', reco: ['Visita al veterinario para descartar causas médicas (análisis de sangre)', 'Plan de pérdida de peso supervisado: nunca ayuno brusco', 'Dieta veterinaria específica para obesidad', 'Ejercicio controlado según tolerancia (razas braquicéfalas con cuidado)', 'Seguimiento mensual de peso y condición corporal'] },
  9: { label: 'Obesidad grave', color: '#7b241c', emoji: '🚨', text: 'Tu perro tiene obesidad grave. Esta situación pone en riesgo su salud y calidad de vida de forma inmediata. Los huesos están completamente cubiertos por grasa, el movimiento es difícil y la respiración puede estar comprometida. Requiere atención veterinaria urgente.', reco: ['Atención veterinaria urgente — no esperes', 'Análisis completo para detectar enfermedades subyacentes', 'Plan nutricional estrictamente supervisado por el vet', 'No reduzcas la comida bruscamente sin supervisión médica', 'Control semanal de peso con el veterinario'] },
}

function calcBCS(total: number): number {
  if (total <= 1) return 1
  if (total <= 2) return 2
  if (total <= 3) return 3
  if (total <= 5) return 4
  if (total <= 7) return 5
  if (total <= 8) return 6
  if (total <= 9) return 7
  if (total <= 10) return 8
  return 9
}

export default function CondicionCorporalTool() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [result, setResult] = useState<number | null>(null)

  function handleSelect(qi: number, val: number) {
    setAnswers(prev => ({ ...prev, [qi]: val }))
    setResult(null)
  }

  function handleCalculate() {
    const total = Object.values(answers).reduce((a, b) => a + b, 0)
    setResult(calcBCS(total))
  }

  function handleReset() {
    setAnswers({})
    setResult(null)
  }

  const allAnswered = Object.keys(answers).length === questions.length
  const data = result ? bcsData[result] : null

  return (
    <>
      {/* Questions */}
      {questions.map((q, qi) => (
        <div key={q.id} className="bcs-question">
          <p className="bcs-q-num">Pregunta {qi + 1} de {questions.length}</p>
          <h3 className="bcs-q-title">{q.title}</h3>
          <p className="bcs-q-sub">{q.subtitle}</p>
          <div className="bcs-options">
            {q.options.map(opt => (
              <button
                key={opt.value}
                className={`bcs-option${answers[qi] === opt.value ? ' selected' : ''}`}
                onClick={() => handleSelect(qi, opt.value)}
                type="button"
              >
                <span className="bcs-opt-icon">{opt.icon}</span>
                <span className="bcs-opt-label">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Calculate button */}
      {allAnswered && !result && (
        <button
          className="btn-primary"
          id="calcBCSBtn"
          style={{ width: '100%', maxWidth: '680px', display: 'block', margin: '0 auto 2rem' }}
          onClick={handleCalculate}
          type="button"
        >
          Ver resultado de condición corporal
        </button>
      )}

      {/* Result */}
      {result && data && (
        <div id="bcsResult" style={{ maxWidth: '680px', margin: '0 auto' }}>
          {/* Score header */}
          <div className="bcs-score-header" style={{ borderLeftColor: data.color }}>
            <span className="bcs-emoji">{data.emoji}</span>
            <div>
              <div className="bcs-score-num" style={{ color: data.color }}>BCS {result}/9</div>
              <div className="bcs-score-label" style={{ color: data.color }}>{data.label}</div>
            </div>
          </div>

          {/* BCS Bar */}
          <div className="bcs-bar-wrap">
            <div className="bcs-bar-labels">
              <span>Bajo peso</span>
              <span>Ideal</span>
              <span>Sobrepeso</span>
            </div>
            <div className="bcs-bar">
              {Array.from({ length: 9 }, (_, i) => i + 1).map(b => {
                const zone = b <= 3 ? 'zone-low' : b <= 5 ? 'zone-ideal' : 'zone-high'
                const active = b === result ? ' active' : ''
                return (
                  <div key={b} className={`bcs-cell ${zone}${active}`} style={{ position: 'relative' }}>
                    <span>{b}</span>
                    {b === result && <div className="bcs-marker">▲</div>}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Description */}
          <div className="highlight-box">
            <p>{data.text}</p>
          </div>

          {/* Recommendations */}
          <h3>Recomendaciones</h3>
          <ul className="bcs-reco-list">
            {data.reco.map((r, i) => <li key={i}>{r}</li>)}
          </ul>

          {/* CTA */}
          <div className="bcs-cta-row">
            {result >= 6 && (
              <Link href="/blog/perro-sobrepeso-plan-4-semanas" className="btn-primary">
                Ver plan de 4 semanas para adelgazar
              </Link>
            )}
            <Link href="/#calculadora" className="btn-secondary">
              Calcular porción correcta
            </Link>
          </div>

          <button id="bcsResetBtn" onClick={handleReset} type="button">
            🔄 Evaluar de nuevo
          </button>
        </div>
      )}

      <style>{`
        .bcs-question {
          background: #fff;
          border-radius: 18px;
          padding: 1.8rem 1.5rem;
          box-shadow: 0 3px 18px rgba(0,0,0,0.07);
          max-width: 680px;
          margin: 0 auto 1.5rem;
        }
        .bcs-q-num { font-size: 0.78rem; color: #667e6d; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 0.4rem; }
        .bcs-q-title { font-size: 1.2rem; font-weight: 800; color: #2e4a3a; font-family: 'Poppins', sans-serif; margin: 0 0 0.4rem; line-height: 1.3; }
        .bcs-q-sub { font-size: 0.88rem; color: #888; margin: 0 0 1.2rem; line-height: 1.5; }
        .bcs-options { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        @media (max-width: 480px) { .bcs-options { grid-template-columns: 1fr; } }
        .bcs-option { background: #f8f6f2; border: 2px solid transparent; border-radius: 12px; padding: 0.9rem 1rem; text-align: left; cursor: pointer; display: flex; align-items: center; gap: 0.7rem; font-family: 'Nunito', sans-serif; font-size: 0.92rem; color: #444; line-height: 1.3; transition: all 0.18s ease; }
        .bcs-option:hover { border-color: #667e6d; background: #f0f5f1; transform: translateY(-1px); }
        .bcs-option.selected { border-color: #667e6d; background: #eaf2eb; color: #2e4a3a; font-weight: 700; }
        .bcs-opt-icon { font-size: 1.4rem; flex-shrink: 0; }
        .bcs-score-header { display: flex; align-items: center; gap: 1.2rem; background: #fff; border-radius: 16px; padding: 1.5rem; box-shadow: 0 3px 18px rgba(0,0,0,0.07); margin-bottom: 1.5rem; border-left: 6px solid #ccc; }
        .bcs-emoji { font-size: 2.8rem; flex-shrink: 0; }
        .bcs-score-num { font-size: 2rem; font-weight: 800; font-family: 'Poppins', sans-serif; line-height: 1; }
        .bcs-score-label { font-size: 1rem; font-weight: 700; margin-top: 4px; }
        .bcs-bar-wrap { background: #fff; border-radius: 16px; padding: 1.2rem 1.5rem; box-shadow: 0 3px 18px rgba(0,0,0,0.07); margin-bottom: 1.5rem; }
        .bcs-bar-labels { display: flex; justify-content: space-between; font-size: 0.75rem; color: #888; font-weight: 600; margin-bottom: 8px; }
        .bcs-bar { display: flex; gap: 4px; height: 48px; align-items: flex-end; }
        .bcs-cell { flex: 1; border-radius: 6px 6px 0 0; height: 36px; display: flex; align-items: center; justify-content: center; font-size: 0.78rem; font-weight: 700; color: #fff; position: relative; cursor: default; }
        .bcs-cell.zone-low { background: #e67e22; }
        .bcs-cell.zone-ideal { background: #27ae60; }
        .bcs-cell.zone-high { background: #c0392b; }
        .bcs-cell.active { height: 48px; box-shadow: 0 4px 12px rgba(0,0,0,0.25); transform: scaleX(1.05); }
        .bcs-marker { position: absolute; bottom: -16px; font-size: 0.9rem; left: 50%; transform: translateX(-50%); color: #333; }
        .bcs-reco-list { list-style: none; padding: 0; margin: 0 0 1.5rem; }
        .bcs-reco-list li { padding: 0.55rem 0.75rem 0.55rem 2.2rem; position: relative; font-size: 0.92rem; color: #444; border-bottom: 1px solid #f0f0f0; line-height: 1.4; }
        .bcs-reco-list li::before { content: '→'; position: absolute; left: 0.6rem; color: #667e6d; font-weight: 700; }
        .bcs-cta-row { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin-top: 1.5rem; }
        #bcsResetBtn { display: block; margin: 1.5rem auto 0; background: transparent; border: 2px solid #999; color: #999; border-radius: 50px; padding: 0.55rem 1.4rem; font-weight: 700; cursor: pointer; font-family: 'Nunito', sans-serif; font-size: 0.9rem; transition: 0.2s; }
        #bcsResetBtn:hover { border-color: #667e6d; color: #667e6d; }
      `}</style>
    </>
  )
}
