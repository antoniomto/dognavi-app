'use client'

import { useState } from 'react'

interface CalcForm {
  dogWeight: string
  dogAge: string
  activityLevel: string
  bodyCondition: string
  isNeutered: string
}

interface CalcResult {
  kcal: number
  kcalMin: number
  kcalMax: number
  gramsPerDay: number
  gramsMin: number
  gramsMax: number
  gramsPerMeal: number
  mealsPerDay: number
  waterMin: number
  waterMax: number
  smartTip: string
  conditionNote: string
}

function calculate(form: CalcForm): CalcResult | null {
  const weight = parseFloat(form.dogWeight)
  if (!weight || !form.dogAge || !form.activityLevel || !form.bodyCondition || !form.isNeutered) return null
  if (weight < 0.8 || weight > 120) return null

  const RER = 70 * Math.pow(weight, 0.75)
  let activityFactor = 1.6

  if (form.dogAge === 'puppy') {
    if (form.activityLevel === 'high') activityFactor = 3.0
    else if (form.activityLevel === 'moderate') activityFactor = 2.5
    else activityFactor = 2.0
  } else if (form.dogAge === 'adult') {
    if (form.isNeutered === 'yes') {
      if (form.activityLevel === 'high') activityFactor = 1.8
      else if (form.activityLevel === 'moderate') activityFactor = 1.6
      else activityFactor = 1.4
    } else {
      if (form.activityLevel === 'high') activityFactor = 2.0
      else if (form.activityLevel === 'moderate') activityFactor = 1.8
      else activityFactor = 1.6
    }
  } else if (form.dogAge === 'senior') {
    if (form.activityLevel === 'high') activityFactor = 1.6
    else if (form.activityLevel === 'moderate') activityFactor = 1.4
    else activityFactor = 1.2
  }

  let conditionNote = ''
  if (form.bodyCondition === 'overweight') {
    activityFactor *= 0.8
    conditionNote = '⚠️ Tu perro tiene sobrepeso. Se recomienda controlar premios y aumentar actividad progresivamente.'
  } else if (form.bodyCondition === 'underweight') {
    activityFactor *= 1.2
    conditionNote = '⚠️ Si tu perro no gana peso, consulta con tu veterinario para descartar causas médicas.'
  }

  const MER = RER * activityFactor
  const kcalPer100g = 350
  const gramsPerDay = (MER / kcalPer100g) * 100
  const mealsPerDay = form.dogAge === 'puppy' ? 3 : 2

  let smartTip = ''
  if (form.dogAge === 'puppy') {
    smartTip = 'Los cachorros necesitan energía constante. Divide siempre la ración en varias comidas y evita ayunos largos.'
  } else if (form.dogAge === 'senior') {
    smartTip = 'En perros senior es clave vigilar peso, movilidad y calidad del alimento. Ajustes pequeños hacen gran diferencia.'
  } else if (form.activityLevel === 'high') {
    smartTip = 'Un perro muy activo necesita energía suficiente, pero evita sobrealimentar en días de baja actividad.'
  } else {
    smartTip = 'Mantén horarios fijos y mide la porción con una báscula o taza medidora para evitar excesos.'
  }

  return {
    kcal: Math.round(MER),
    kcalMin: Math.round(MER * 0.9),
    kcalMax: Math.round(MER * 1.1),
    gramsPerDay: Math.round(gramsPerDay),
    gramsMin: Math.round(gramsPerDay * 0.9),
    gramsMax: Math.round(gramsPerDay * 1.1),
    gramsPerMeal: Math.round(gramsPerDay / mealsPerDay),
    mealsPerDay,
    waterMin: Math.round(weight * 50),
    waterMax: Math.round(weight * 60),
    smartTip,
    conditionNote,
  }
}

export default function FoodCalculator() {
  const [form, setForm] = useState<CalcForm>({
    dogWeight: '',
    dogAge: '',
    activityLevel: '',
    bodyCondition: '',
    isNeutered: '',
  })
  const [result, setResult] = useState<CalcResult | null>(null)
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }))
    setError('')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const weight = parseFloat(form.dogWeight)

    if (!form.dogWeight || !form.dogAge || !form.activityLevel || !form.bodyCondition || !form.isNeutered) {
      setError('Completa todos los campos para obtener un cálculo preciso.')
      setResult(null)
      return
    }
    if (weight < 0.8 || weight > 120) {
      setError('El peso ingresado parece poco realista. La calculadora está diseñada para perros entre 1 y 120 kg.')
      setResult(null)
      return
    }

    const r = calculate(form)
    setResult(r)
    setError('')
  }

  return (
    <div className="calculator-container">
      <form id="calculatorForm" onSubmit={handleSubmit}>
        <div className="calculator-step">
          <label htmlFor="dogWeight">Peso actual del perro (kg)</label>
          <input
            type="number"
            id="dogWeight"
            min="1"
            max="100"
            step="0.1"
            placeholder="Ej. 14.5"
            value={form.dogWeight}
            onChange={handleChange}
            required
          />
        </div>

        <div className="calculator-step">
          <label htmlFor="dogAge">Edad del perro</label>
          <select id="dogAge" value={form.dogAge} onChange={handleChange} required>
            <option value="">Selecciona</option>
            <option value="puppy">Cachorro</option>
            <option value="adult">Adulto</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        <div className="calculator-step">
          <label htmlFor="activityLevel">Actividad física</label>
          <select id="activityLevel" value={form.activityLevel} onChange={handleChange} required>
            <option value="">Selecciona</option>
            <option value="low">Baja</option>
            <option value="moderate">Moderada</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <div className="calculator-step">
          <label htmlFor="bodyCondition">Condición corporal</label>
          <select id="bodyCondition" value={form.bodyCondition} onChange={handleChange} required>
            <option value="">Selecciona</option>
            <option value="underweight">Bajo peso</option>
            <option value="ideal">Peso ideal</option>
            <option value="overweight">Sobrepeso</option>
          </select>
        </div>

        <div className="calculator-step">
          <label htmlFor="isNeutered">¿Esterilizado/castrado?</label>
          <select id="isNeutered" value={form.isNeutered} onChange={handleChange} required>
            <option value="">Selecciona</option>
            <option value="yes">Sí</option>
            <option value="no">No</option>
          </select>
        </div>

        <button type="submit" id="calculateBtn" className="btn-primary w-100">
          ✨ Calcular Alimentación
        </button>
      </form>

      {error && (
        <div id="result" style={{ display: 'block' }}>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div id="result" style={{ display: 'block' }}>
          <h3>✨ Resultado de Alimentación Personalizada</h3>

          <div className="result-detail">
            <strong>Calorías diarias estimadas:</strong> {result.kcal} kcal/día<br />
            <small>Rango recomendado: {result.kcalMin} – {result.kcalMax} kcal</small>
          </div>

          <div className="result-detail">
            <strong>Cantidad de alimento seco:</strong> {result.gramsPerDay} g al día<br />
            <small>Rango saludable: {result.gramsMin} – {result.gramsMax} g</small>
          </div>

          <div className="result-detail">
            <strong>Distribución diaria:</strong>{' '}
            {result.gramsPerMeal} g por comida ({result.mealsPerDay} comidas)
          </div>

          <div className="result-detail">
            <strong>Agua recomendada:</strong>{' '}
            {result.waterMin} – {result.waterMax} ml al día
          </div>

          <div className="result-detail">
            <strong>📌 Recomendación práctica:</strong><br />
            {result.smartTip}
          </div>

          {result.conditionNote && (
            <div className="result-detail">
              <strong>⚠️ Atención:</strong><br />
              {result.conditionNote}
            </div>
          )}

          <div className="result-detail">
            <strong>Nota nutricional:</strong><br />
            Este cálculo asume alimento seco estándar (~350 kcal por cada 100 g).
            Revisa siempre la etiqueta de tu alimento y ajusta la cantidad si su energía es diferente.
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <a href="#productos" className="btn-primary">Ver productos recomendados</a>
          </div>
        </div>
      )}
    </div>
  )
}
