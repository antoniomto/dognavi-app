'use client'

import { useState } from 'react'
import Link from 'next/link'

// ----------- PROTOCOLS -----------

interface PuppyVaccine {
  name: string
  day: number
  required: boolean
  info: string
}

interface AdultVaccine {
  name: string
  freq: string
  required: boolean
  info: string
}

interface Protocol {
  puppy: PuppyVaccine[]
  adult: AdultVaccine[]
}

const protocols: Record<string, Protocol> = {
  espana: {
    puppy: [
      { name: 'Moquillo + Parvovirus (1ª dosis)', day: 42, required: true, info: 'Primera protección fundamental. Sin esta vacuna el cachorro es extremadamente vulnerable.' },
      { name: 'Polivalente DHPPi (2ª dosis)', day: 70, required: true, info: 'Cubre Moquillo, Hepatitis, Parvovirus, Parainfluenza. Refuerzo obligatorio.' },
      { name: 'Leptospirosis (1ª dosis)', day: 70, required: true, info: 'Bacteria transmitida por agua y orina de animales silvestres. Se da junto a la 2ª polivalente.' },
      { name: 'Polivalente DHPPi (3ª dosis)', day: 98, required: true, info: 'Completa la serie inicial. Fundamental para inmunidad duradera.' },
      { name: 'Leptospirosis (2ª dosis)', day: 98, required: true, info: 'Refuerzo de la primera dosis, 4 semanas después.' },
      { name: 'Rabia (1ª dosis)', day: 112, required: true, info: 'Obligatoria en la mayoría de comunidades autónomas. Exigida para viajes internacionales.' },
      { name: 'Leishmaniasis (1ª dosis)', day: 112, required: false, info: 'Recomendada en zonas endémicas (sur y este de España). Requiere 3 dosis iniciales.' },
      { name: 'Recuerdo anual + Rabia', day: 365, required: true, info: 'A partir del año: recuerdo anual de todas las vacunas.' },
    ],
    adult: [
      { name: 'Polivalente DHPPi', freq: 'Anual o cada 3 años', required: true, info: 'La frecuencia exacta la determina tu veterinario según historial.' },
      { name: 'Rabia', freq: 'Anual', required: true, info: 'Obligatoria según comunidad autónoma. Necesaria para pasaportes y viajes.' },
      { name: 'Leptospirosis', freq: 'Anual', required: true, info: 'Especialmente importante si el perro accede a ríos, campos o parques.' },
      { name: 'Tos de las perreras (Bordetella)', freq: 'Anual', required: false, info: 'Recomendada si usa guarderías, peluquerías o tiene contacto frecuente con otros perros.' },
      { name: 'Leishmaniasis', freq: 'Anual', required: false, info: 'Anual en zonas endémicas. Consulta si vives en el sur o este de España.' },
    ],
  },
  mexico: {
    puppy: [
      { name: 'Moquillo + Parvovirus (1ª dosis)', day: 42, required: true, info: 'Inicio del esquema de vacunación básico.' },
      { name: 'Polivalente 5 en 1 (2ª dosis)', day: 70, required: true, info: 'Cubre Moquillo, Hepatitis, Parvovirus, Parainfluenza y Leptospira.' },
      { name: 'Polivalente 5 en 1 (3ª dosis)', day: 98, required: true, info: 'Completa la serie de protección primaria.' },
      { name: 'Antirrábica (rabia)', day: 112, required: true, info: 'OBLIGATORIA por ley en toda la República Mexicana. Necesaria para registro municipal.' },
      { name: 'Recuerdo anual + Antirrábica', day: 365, required: true, info: 'Refuerzo anual del esquema completo.' },
    ],
    adult: [
      { name: 'Polivalente 5 en 1', freq: 'Anual', required: true, info: 'Vacunación anual recomendada.' },
      { name: 'Antirrábica', freq: 'Anual', required: true, info: 'Obligatoria anualmente según normativa de la SSA.' },
      { name: 'Leptospirosis', freq: 'Anual', required: false, info: 'Recomendada especialmente en temporada de lluvias.' },
      { name: 'Tos de las perreras (Bordetella)', freq: 'Anual', required: false, info: 'Para perros que visitan parques, estancias o guarderías.' },
    ],
  },
  argentina: {
    puppy: [
      { name: 'Séxtuple (1ª dosis)', day: 42, required: true, info: 'Cubre Moquillo, Hepatitis, Parvovirus, Parainfluenza, Leptospirosis y Coronavirus.' },
      { name: 'Séxtuple (2ª dosis)', day: 70, required: true, info: 'Refuerzo obligatorio 4 semanas después de la primera.' },
      { name: 'Séxtuple (3ª dosis)', day: 98, required: true, info: 'Completa la serie de vacunación inicial.' },
      { name: 'Antirrábica', day: 112, required: true, info: 'Obligatoria en la mayoría de provincias argentinas.' },
      { name: 'Recuerdo anual + Antirrábica', day: 365, required: true, info: 'Refuerzo anual del esquema completo.' },
    ],
    adult: [
      { name: 'Séxtuple', freq: 'Anual', required: true, info: 'Vacuna combinada anual.' },
      { name: 'Antirrábica', freq: 'Anual', required: true, info: 'Obligatoria según provincia. Consulta regulación local.' },
      { name: 'Bordetella (tos de las perreras)', freq: 'Anual', required: false, info: 'Recomendada para perros con vida social activa.' },
    ],
  },
  otro: {
    puppy: [
      { name: 'Moquillo + Parvovirus (1ª dosis)', day: 42, required: true, info: 'Inicio del protocolo básico internacional.' },
      { name: 'Polivalente DHPPi (2ª dosis)', day: 70, required: true, info: 'Cubre Moquillo, Hepatitis, Parvovirus, Parainfluenza.' },
      { name: 'Leptospirosis', day: 70, required: false, info: 'Recomendada si hay acceso a agua o campo abierto.' },
      { name: 'Polivalente DHPPi (3ª dosis)', day: 98, required: true, info: 'Refuerzo de la serie inicial.' },
      { name: 'Rabia', day: 112, required: true, info: 'Consulta la obligatoriedad en tu país y región.' },
      { name: 'Recuerdo anual', day: 365, required: true, info: 'Recuerdo anual de todo el esquema.' },
    ],
    adult: [
      { name: 'Polivalente DHPPi', freq: 'Anual o cada 3 años', required: true, info: 'La frecuencia exacta la determina tu veterinario.' },
      { name: 'Rabia', freq: 'Anual', required: true, info: 'Consulta la regulación de tu país.' },
      { name: 'Leptospirosis', freq: 'Anual', required: false, info: 'Si el perro sale a campo o agua.' },
      { name: 'Bordetella', freq: 'Anual', required: false, info: 'Para perros con vida social activa.' },
    ],
  },
}

// ----------- DATE UTILS -----------

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function formatDateStr(date: Date): string {
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`
}

function daysDiff(a: Date, b: Date): number {
  return Math.round((a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24))
}

function getStatusLabel(daysFromToday: number): string {
  if (daysFromToday < -60) return '⚪ Pasada'
  if (daysFromToday < -1) return '🔴 Vencida'
  if (daysFromToday <= 0) return '🟠 Hoy'
  if (daysFromToday <= 7) return '🟠 Esta semana'
  if (daysFromToday <= 30) return '🟡 Próxima'
  return '🔵 Futura'
}

function getRowBg(daysFromToday: number): string {
  if (daysFromToday < -1) return '#f7f7f7'
  if (daysFromToday <= 30) return '#fff9f0'
  return '#fff'
}

// ----------- TYPES -----------

interface PuppyRow {
  name: string
  date: Date
  daysFromToday: number
  required: boolean
  info: string
  checked: boolean
}

interface AdultRow {
  name: string
  freq: string
  required: boolean
  info: string
  checked: boolean
}

interface PuppyResult {
  type: 'puppy'
  birthDate: Date
  rows: PuppyRow[]
}

interface AdultResult {
  type: 'adult'
  birthDate: Date | null
  rows: AdultRow[]
}

type CalendarResult = PuppyResult | AdultResult

// ----------- COMPONENT -----------

export default function VacunasTool() {
  const [region, setRegion] = useState('espana')
  const [lifeStage, setLifeStage] = useState('cachorro')
  const [inputMode, setInputMode] = useState<'date' | 'age'>('date')
  const [birthDate, setBirthDate] = useState('')
  const [ageMonths, setAgeMonths] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<CalendarResult | null>(null)

  function handleGenerate() {
    setError('')

    let bd: Date | null = null

    if (inputMode === 'date') {
      if (!birthDate) { setError('Por favor ingresa la fecha de nacimiento.'); return }
      bd = new Date(birthDate + 'T12:00:00')
    } else {
      const months = parseFloat(ageMonths)
      if (!months || months < 0) { setError('Por favor ingresa la edad en meses.'); return }
      const today = new Date()
      bd = new Date(today)
      bd.setMonth(bd.getMonth() - Math.floor(months))
      bd.setDate(bd.getDate() - Math.round((months % 1) * 30))
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (lifeStage === 'cachorro') {
      const rows: PuppyRow[] = protocols[region].puppy.map(v => {
        const vaccDate = addDays(bd!, v.day)
        const diff = daysDiff(vaccDate, today)
        return { name: v.name, date: vaccDate, daysFromToday: diff, required: v.required, info: v.info, checked: false }
      })
      setResult({ type: 'puppy', birthDate: bd, rows })
    } else {
      const rows: AdultRow[] = protocols[region].adult.map(v => ({
        name: v.name, freq: v.freq, required: v.required, info: v.info, checked: false,
      }))
      setResult({ type: 'adult', birthDate: bd, rows })
    }

    setTimeout(() => {
      const el = document.getElementById('vacResult')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  function toggleCheck(index: number) {
    if (!result) return
    const newRows = [...result.rows] as (PuppyRow | AdultRow)[]
    newRows[index] = { ...newRows[index], checked: !newRows[index].checked }
    setResult({ ...result, rows: newRows } as CalendarResult)
  }

  function handleReset() {
    setResult(null)
    setBirthDate('')
    setAgeMonths('')
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Form */}
      <div style={{
        background: '#fff', borderRadius: '20px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.09)',
        padding: '2rem 1.8rem', maxWidth: '700px', margin: '0 auto 2rem',
      }}>
        {/* Row 1: Region + Life stage */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', marginBottom: '1.2rem' }}>
          <div>
            <label style={labelStyle}>País / Región</label>
            <select value={region} onChange={e => setRegion(e.target.value)} style={selectStyle}>
              <option value="espana">🇪🇸 España</option>
              <option value="mexico">🇲🇽 México</option>
              <option value="argentina">🇦🇷 Argentina</option>
              <option value="otro">🌎 Otro país</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Etapa de vida</label>
            <select value={lifeStage} onChange={e => setLifeStage(e.target.value)} style={selectStyle}>
              <option value="cachorro">🐶 Cachorro (menos de 1 año)</option>
              <option value="adulto">🐕 Adulto (1 año o más)</option>
            </select>
          </div>
        </div>

        {/* Input mode */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>¿Cómo prefieres introducir la edad?</label>
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.93rem', color: '#444' }}>
              <input type="radio" name="inputMode" value="date" checked={inputMode === 'date'} onChange={() => setInputMode('date')} style={{ accentColor: '#667e6d' }} />
              Fecha de nacimiento exacta
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.93rem', color: '#444' }}>
              <input type="radio" name="inputMode" value="age" checked={inputMode === 'age'} onChange={() => setInputMode('age')} style={{ accentColor: '#667e6d' }} />
              Edad aproximada (meses)
            </label>
          </div>
        </div>

        {/* Date or age input */}
        {inputMode === 'date' ? (
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={labelStyle}>Fecha de nacimiento</label>
            <input
              type="date" value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              style={selectStyle}
            />
          </div>
        ) : (
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={labelStyle}>Edad en meses</label>
            <input
              type="number" min="0" step="0.5" placeholder="Ej: 3.5"
              value={ageMonths} onChange={e => setAgeMonths(e.target.value)}
              style={selectStyle}
            />
          </div>
        )}

        {error && (
          <p style={{ color: '#c62828', fontSize: '0.9rem', marginBottom: '1rem' }}>{error}</p>
        )}

        <button
          className="btn-primary"
          onClick={handleGenerate}
          style={{ width: '100%' }}
          type="button"
        >
          📋 Generar calendario de vacunas
        </button>
      </div>

      {/* Result */}
      {result && (
        <div id="vacResult" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#2e4a3a', fontFamily: "'Poppins', sans-serif" }}>
              Tu calendario de vacunas
            </h2>
            <button
              onClick={() => window.print()}
              style={{ background: 'transparent', border: '2px solid #667e6d', color: '#667e6d', borderRadius: '50px', padding: '0.55rem 1.3rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}
            >
              🖨️ Imprimir / Guardar PDF
            </button>
          </div>

          {/* Section title */}
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2e4a3a', fontFamily: "'Poppins', sans-serif', borderLeft: '4px solid #667e6d", paddingLeft: '0.75rem', margin: '0 0 0.5rem' }}>
            📋 {result.type === 'puppy' ? 'Calendario para cachorro' : 'Vacunas anuales para perro adulto'}
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#666', marginBottom: '1rem' }}>
            {result.type === 'puppy'
              ? <>Basado en fecha de nacimiento: <strong>{formatDateStr(result.birthDate)}</strong></>
              : <>Las fechas exactas dependen de cuándo se aplicaron las últimas dosis. Consulta el historial de vacunación.{result.birthDate ? <> · Nacimiento: <strong>{formatDateStr(result.birthDate)}</strong></> : ''}</>
            }
          </p>

          {/* Table */}
          <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #e0e8e4', marginBottom: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', fontFamily: "'Nunito', sans-serif" }}>
              <thead>
                <tr style={{ background: '#2e4a3a', color: '#fff' }}>
                  <th style={thStyle}>Vacuna</th>
                  <th style={thStyle}>{result.type === 'puppy' ? 'Fecha recomendada' : 'Frecuencia'}</th>
                  <th style={thStyle}>Estado</th>
                  <th style={thStyle}>Tipo</th>
                  <th style={thStyle}>Marcar</th>
                </tr>
              </thead>
              <tbody>
                {result.type === 'puppy'
                  ? (result.rows as PuppyRow[]).map((row, i) => (
                    <tr key={i} style={{
                      background: row.checked ? '#f0faf3' : getRowBg(row.daysFromToday),
                      borderBottom: '1px solid #eef2f0',
                      opacity: row.checked ? 0.75 : 1,
                    }}>
                      <td style={{ padding: '0.75rem 1rem', verticalAlign: 'top' }}>
                        <strong style={{ textDecoration: row.checked ? 'line-through' : 'none', color: row.checked ? '#999' : 'inherit' }}>{row.name}</strong>
                        <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '3px', lineHeight: 1.4 }}>{row.info}</div>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap', fontWeight: 600, color: row.checked ? '#999' : '#2e4a3a', textDecoration: row.checked ? 'line-through' : 'none' }}>
                        {formatDateStr(row.date)}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap', fontSize: '0.88rem', color: row.checked ? '#999' : 'inherit', textDecoration: row.checked ? 'line-through' : 'none' }}>
                        {getStatusLabel(row.daysFromToday)}
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span style={row.required ? badgeReqStyle : badgeOptStyle}>
                          {row.required ? 'Obligatoria' : 'Opcional'}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                          <input type="checkbox" checked={row.checked} onChange={() => toggleCheck(i)} style={{ accentColor: '#667e6d', width: '16px', height: '16px' }} />
                          <span>Realizada</span>
                        </label>
                      </td>
                    </tr>
                  ))
                  : (result.rows as AdultRow[]).map((row, i) => (
                    <tr key={i} style={{
                      background: row.checked ? '#f0faf3' : '#fff',
                      borderBottom: '1px solid #eef2f0',
                      opacity: row.checked ? 0.75 : 1,
                    }}>
                      <td style={{ padding: '0.75rem 1rem', verticalAlign: 'top' }}>
                        <strong style={{ textDecoration: row.checked ? 'line-through' : 'none', color: row.checked ? '#999' : 'inherit' }}>{row.name}</strong>
                        <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '3px', lineHeight: 1.4 }}>{row.info}</div>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap', fontWeight: 600, color: row.checked ? '#999' : '#2e4a3a', textDecoration: row.checked ? 'line-through' : 'none' }}>
                        {row.freq}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap', fontSize: '0.88rem', color: row.checked ? '#999' : 'inherit' }}>
                        🔵 Anual
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span style={row.required ? badgeReqStyle : badgeOptStyle}>
                          {row.required ? 'Obligatoria' : 'Opcional'}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                          <input type="checkbox" checked={row.checked} onChange={() => toggleCheck(i)} style={{ accentColor: '#667e6d', width: '16px', height: '16px' }} />
                          <span>Realizada</span>
                        </label>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

          {/* Disclaimer */}
          <div style={{
            background: '#fff8ef', borderLeft: '4px solid #FFB347',
            borderRadius: '0 12px 12px 0', padding: '0.9rem 1.2rem',
            fontSize: '0.85rem', color: '#7a5f2a', margin: '0 0 1.5rem', lineHeight: 1.5,
          }}>
            ⚕️ <strong>Nota importante:</strong> Este calendario es orientativo y se basa en protocolos veterinarios estándar. Las fechas exactas pueden variar según el criterio de tu veterinario, el estado de salud del perro y los productos disponibles en tu zona. Consulta siempre con tu veterinario de confianza.
          </div>

          {/* CTA */}
          <div className="cta-box">
            <h3>📊 ¿Sabes cuánto debe comer tu perro?</h3>
            <p>Calcula la porción ideal según su peso, edad y nivel de actividad.</p>
            <Link href="/#calculadora" className="btn">Calcular Porción Ideal</Link>
          </div>

          {/* Reset */}
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button
              onClick={handleReset}
              style={{ background: 'transparent', border: '2px solid #999', color: '#999', borderRadius: '50px', padding: '0.55rem 1.3rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}
            >
              🔄 Empezar de nuevo
            </button>
          </div>
        </div>
      )}
    </>
  )
}

// ----------- INLINE STYLES -----------

const labelStyle: React.CSSProperties = {
  display: 'block', fontWeight: 700, marginBottom: '6px',
  color: '#2e4a3a', fontSize: '0.95rem',
}

const selectStyle: React.CSSProperties = {
  width: '100%', padding: '12px 14px', borderRadius: '12px',
  border: '1.5px solid #d0d8d3', fontSize: '15px',
  fontFamily: "'Nunito', sans-serif", color: '#333',
  background: '#fafafa',
}

const thStyle: React.CSSProperties = {
  padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, whiteSpace: 'nowrap',
}

const badgeReqStyle: React.CSSProperties = {
  display: 'inline-block', fontSize: '0.75rem', fontWeight: 700,
  padding: '0.2rem 0.6rem', borderRadius: '50px',
  background: '#e8f4fd', color: '#1a6495',
}

const badgeOptStyle: React.CSSProperties = {
  display: 'inline-block', fontSize: '0.75rem', fontWeight: 700,
  padding: '0.2rem 0.6rem', borderRadius: '50px',
  background: '#fef9e7', color: '#9a7d0a',
}
