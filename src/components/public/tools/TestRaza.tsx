'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

// ----------- DATA -----------

const questions = [
  {
    id: 'q1',
    title: '¿Dónde vives?',
    subtitle: 'El espacio disponible influye mucho en el bienestar del perro.',
    options: [
      { label: 'Apartamento o piso pequeño', icon: '🏢', key: 'apartamento' },
      { label: 'Casa con patio pequeño', icon: '🏡', key: 'patio' },
      { label: 'Casa con jardín grande', icon: '🌳', key: 'jardin' },
      { label: 'Zona rural o con mucho espacio', icon: '🌾', key: 'rural' },
    ],
  },
  {
    id: 'q2',
    title: '¿Cuánto ejercicio haces tú?',
    subtitle: 'Tu nivel de actividad debe encajar con el del perro.',
    options: [
      { label: 'Sedentario (paseos cortos)', icon: '🛋️', key: 'sedentario' },
      { label: 'Moderado (caminatas diarias)', icon: '🚶', key: 'moderado' },
      { label: 'Activo (deporte, senderismo)', icon: '🏃', key: 'activo' },
      { label: 'Muy activo (deporte intenso)', icon: '⛰️', key: 'muyactivo' },
    ],
  },
  {
    id: 'q3',
    title: '¿Cuántas horas estará solo el perro?',
    subtitle: 'Algunos perros llevan mal la soledad.',
    options: [
      { label: 'Casi nunca está solo', icon: '🏠', key: 'soloNunca' },
      { label: 'Menos de 4 horas al día', icon: '⏰', key: 'soloPoco' },
      { label: 'Entre 4 y 8 horas', icon: '🕐', key: 'soloMedio' },
      { label: 'Más de 8 horas', icon: '😰', key: 'soloMucho' },
    ],
  },
  {
    id: 'q4',
    title: '¿Hay niños en casa?',
    subtitle: 'La convivencia con niños requiere ciertas características.',
    options: [
      { label: 'No hay niños', icon: '🙅', key: 'sinNinos' },
      { label: 'Niños mayores de 8 años', icon: '👧', key: 'ninosMayores' },
      { label: 'Niños de 3 a 8 años', icon: '👶', key: 'ninosMenores' },
      { label: 'Bebés o niños muy pequeños', icon: '🍼', key: 'bebes' },
    ],
  },
  {
    id: 'q5',
    title: '¿Tienes experiencia con perros?',
    subtitle: 'Algunas razas necesitan un dueño experimentado.',
    options: [
      { label: 'Primera vez con un perro', icon: '🐾', key: 'novato' },
      { label: 'He tenido algún perro antes', icon: '✅', key: 'intermedio' },
      { label: 'Bastante experiencia', icon: '⭐', key: 'experto' },
      { label: 'Entrenador o profesional', icon: '🏆', key: 'profesional' },
    ],
  },
  {
    id: 'q6',
    title: '¿Cuánto tiempo puedes dedicar al aseo?',
    subtitle: 'El pelaje de algunas razas requiere mucho mantenimiento.',
    options: [
      { label: 'Lo mínimo, prefiero bajo mantenimiento', icon: '🪮', key: 'aseoMinimo' },
      { label: 'Cepillado semanal sin problema', icon: '✂️', key: 'aseoModerado' },
      { label: 'Me encanta el aseo y la estética', icon: '💅', key: 'aseoMucho' },
      { label: 'No me importa si necesita peluquería', icon: '✨', key: 'aseoPeluqueria' },
    ],
  },
  {
    id: 'q7',
    title: '¿Qué tamaño prefieres?',
    subtitle: 'El tamaño afecta coste, espacio y estilo de vida.',
    options: [
      { label: 'Pequeño (menos de 10 kg)', icon: '🐩', key: 'tamPequeno' },
      { label: 'Mediano (10–25 kg)', icon: '🐕', key: 'tamMediano' },
      { label: 'Grande (más de 25 kg)', icon: '🦮', key: 'tamGrande' },
      { label: 'Me da igual el tamaño', icon: '🤷', key: 'tamIndiferente' },
    ],
  },
  {
    id: 'q8',
    title: '¿Cuál es tu prioridad?',
    subtitle: 'Define el rol principal que tendrá el perro en tu vida.',
    options: [
      { label: 'Compañero tranquilo y cariñoso', icon: '🤗', key: 'priCompanero' },
      { label: 'Perro de juego y energía', icon: '⚽', key: 'priJuego' },
      { label: 'Guardián o protector', icon: '🛡️', key: 'priGuardian' },
      { label: 'Perro deportista / de trabajo', icon: '🏅', key: 'priDeportista' },
    ],
  },
]

interface Breed {
  name: string
  emoji: string
  bg: string
  size: string
  energy: string
  groom: string
  desc: string
  pros: string[]
  cons: string[]
  scores: Record<string, number>
}

const breeds: Breed[] = [
  {
    name: 'Golden Retriever', emoji: '🐾', bg: '#FFF3E0', size: 'Grande', energy: 'Alta', groom: 'Moderado',
    desc: 'El perro familiar por excelencia. Amable, paciente e inteligente. Perfecto con niños y muy fácil de entrenar.',
    pros: ['Ideal con niños', 'Muy sociable', 'Fácil de entrenar'],
    cons: ['Necesita ejercicio diario', 'Muda bastante pelo', 'Puede tener ansiedad si está muy solo'],
    scores: { apartamento: -1, patio: 2, jardin: 3, rural: 3, sedentario: -1, moderado: 3, activo: 3, muyactivo: 2, soloNunca: 3, soloPoco: 2, soloMedio: 0, soloMucho: -2, sinNinos: 2, ninosMayores: 3, ninosMenores: 3, bebes: 2, novato: 3, intermedio: 3, experto: 2, profesional: 1, aseoMinimo: -1, aseoModerado: 2, aseoMucho: 3, aseoPeluqueria: 2, tamPequeno: -2, tamMediano: 0, tamGrande: 3, tamIndiferente: 2, priCompanero: 3, priJuego: 3, priGuardian: 0, priDeportista: 1 },
  },
  {
    name: 'Labrador Retriever', emoji: '🦴', bg: '#FFF8E1', size: 'Grande', energy: 'Alta', groom: 'Bajo',
    desc: 'Uno de los perros más populares del mundo. Juguetón, leal y muy adaptable. Excelente con toda la familia.',
    pros: ['Muy adaptable', 'Ideal con niños', 'Bajo mantenimiento de pelo'],
    cons: ['Mucha energía', 'Puede tener sobrepeso fácilmente', 'Necesita espacio'],
    scores: { apartamento: -1, patio: 2, jardin: 3, rural: 3, sedentario: -1, moderado: 2, activo: 3, muyactivo: 3, soloNunca: 2, soloPoco: 2, soloMedio: 1, soloMucho: -1, sinNinos: 2, ninosMayores: 3, ninosMenores: 3, bebes: 2, novato: 3, intermedio: 3, experto: 2, profesional: 1, aseoMinimo: 3, aseoModerado: 2, aseoMucho: 1, aseoPeluqueria: 1, tamPequeno: -2, tamMediano: 0, tamGrande: 3, tamIndiferente: 2, priCompanero: 2, priJuego: 3, priGuardian: 1, priDeportista: 2 },
  },
  {
    name: 'Bulldog Francés', emoji: '🐷', bg: '#F3E5F5', size: 'Pequeño', energy: 'Baja', groom: 'Bajo',
    desc: 'El rey de los apartamentos. Tranquilo, cariñoso y con mucho carácter. No necesita mucho ejercicio.',
    pros: ['Perfecto para pisos', 'Bajo mantenimiento', 'Muy cariñoso'],
    cons: ['Problemas respiratorios', 'No soporta el calor', 'Ronca bastante'],
    scores: { apartamento: 3, patio: 2, jardin: 1, rural: 0, sedentario: 3, moderado: 2, activo: 0, muyactivo: -2, soloNunca: 2, soloPoco: 2, soloMedio: 1, soloMucho: -1, sinNinos: 2, ninosMayores: 2, ninosMenores: 2, bebes: 1, novato: 3, intermedio: 2, experto: 2, profesional: 1, aseoMinimo: 3, aseoModerado: 2, aseoMucho: 1, aseoPeluqueria: 1, tamPequeno: 3, tamMediano: 1, tamGrande: -1, tamIndiferente: 2, priCompanero: 3, priJuego: 1, priGuardian: 0, priDeportista: -1 },
  },
  {
    name: 'Beagle', emoji: '🌿', bg: '#E8F5E9', size: 'Mediano', energy: 'Alta', groom: 'Bajo',
    desc: 'Alegre, curioso y con un olfato extraordinario. Muy sociable con personas y otros animales.',
    pros: ['Muy sociable', 'Robusto y sano', 'Ideal en familia'],
    cons: ['Aúlla mucho cuando está solo', 'Sigue rastros y puede escaparse', 'Terco en el entrenamiento'],
    scores: { apartamento: 1, patio: 2, jardin: 3, rural: 3, sedentario: -1, moderado: 2, activo: 3, muyactivo: 2, soloNunca: 2, soloPoco: 1, soloMedio: -1, soloMucho: -3, sinNinos: 2, ninosMayores: 3, ninosMenores: 2, bebes: 2, novato: 1, intermedio: 2, experto: 3, profesional: 2, aseoMinimo: 3, aseoModerado: 2, aseoMucho: 1, aseoPeluqueria: 1, tamPequeno: 1, tamMediano: 3, tamGrande: 0, tamIndiferente: 2, priCompanero: 2, priJuego: 3, priGuardian: 0, priDeportista: 1 },
  },
  {
    name: 'Caniche (Poodle)', emoji: '🎀', bg: '#FCE4EC', size: 'Pequeño/Mediano', energy: 'Media', groom: 'Alto',
    desc: 'Extremadamente inteligente y adaptable. Existe en varios tamaños (toy, miniatura, estándar). Poco alérgico.',
    pros: ['Muy inteligente', 'No suelta pelo (poco alérgico)', 'Se adapta a cualquier vivienda'],
    cons: ['Necesita peluquería frecuente', 'Puede ser ansioso', 'Mucho mantenimiento de pelaje'],
    scores: { apartamento: 3, patio: 2, jardin: 2, rural: 1, sedentario: 2, moderado: 3, activo: 2, muyactivo: 1, soloNunca: 2, soloPoco: 2, soloMedio: 1, soloMucho: -1, sinNinos: 2, ninosMayores: 3, ninosMenores: 2, bebes: 2, novato: 2, intermedio: 3, experto: 3, profesional: 2, aseoMinimo: -2, aseoModerado: 1, aseoMucho: 3, aseoPeluqueria: 3, tamPequeno: 3, tamMediano: 2, tamGrande: 0, tamIndiferente: 2, priCompanero: 3, priJuego: 2, priGuardian: 0, priDeportista: 1 },
  },
  {
    name: 'Yorkshire Terrier', emoji: '🎗️', bg: '#FFF9C4', size: 'Pequeño', energy: 'Media', groom: 'Alto',
    desc: 'Pequeño pero con mucha personalidad. Valiente, curioso y muy apegado a su dueño. Ideal para apartamentos.',
    pros: ['Muy pequeño, ideal para pisos', 'Largo pelaje precioso', 'Mucho carácter'],
    cons: ['Requiere mucho aseo', 'Puede ser ladrador', 'Delicado con niños pequeños'],
    scores: { apartamento: 3, patio: 2, jardin: 1, rural: 0, sedentario: 2, moderado: 2, activo: 1, muyactivo: -1, soloNunca: 2, soloPoco: 2, soloMedio: 1, soloMucho: -1, sinNinos: 2, ninosMayores: 2, ninosMenores: 0, bebes: -1, novato: 2, intermedio: 2, experto: 2, profesional: 1, aseoMinimo: -2, aseoModerado: 1, aseoMucho: 3, aseoPeluqueria: 3, tamPequeno: 3, tamMediano: -1, tamGrande: -2, tamIndiferente: 1, priCompanero: 3, priJuego: 2, priGuardian: 1, priDeportista: 0 },
  },
  {
    name: 'Chihuahua', emoji: '🦴', bg: '#FBE9E7', size: 'Pequeño', energy: 'Media', groom: 'Bajo',
    desc: 'El más pequeño del mundo. Muy leal a su dueño, valiente y con mucha personalidad. Ideal para personas solas.',
    pros: ['Tamaño mínimo', 'Muy longevo (15+ años)', 'Fácil de transportar'],
    cons: ['Puede ser nervioso', 'No apto para niños pequeños', 'Puede ser ladrador'],
    scores: { apartamento: 3, patio: 2, jardin: 1, rural: 0, sedentario: 3, moderado: 2, activo: 1, muyactivo: -1, soloNunca: 2, soloPoco: 2, soloMedio: 1, soloMucho: -1, sinNinos: 3, ninosMayores: 1, ninosMenores: -1, bebes: -2, novato: 2, intermedio: 2, experto: 2, profesional: 1, aseoMinimo: 3, aseoModerado: 2, aseoMucho: 1, aseoPeluqueria: 1, tamPequeno: 3, tamMediano: -1, tamGrande: -2, tamIndiferente: 1, priCompanero: 3, priJuego: 1, priGuardian: 1, priDeportista: -1 },
  },
  {
    name: 'Pastor Alemán', emoji: '🦺', bg: '#E8EAF6', size: 'Grande', energy: 'Alta', groom: 'Moderado',
    desc: 'Leal, inteligente y versátil. Perro de trabajo y familia. Necesita estimulación mental y ejercicio abundante.',
    pros: ['Muy inteligente', 'Excelente guardián', 'Muy leal'],
    cons: ['Necesita mucho ejercicio y trabajo mental', 'Muda mucho', 'Requiere adiestramiento firme'],
    scores: { apartamento: -2, patio: 1, jardin: 3, rural: 3, sedentario: -2, moderado: 1, activo: 3, muyactivo: 3, soloNunca: 2, soloPoco: 2, soloMedio: 0, soloMucho: -2, sinNinos: 2, ninosMayores: 2, ninosMenores: 1, bebes: 1, novato: -1, intermedio: 1, experto: 3, profesional: 3, aseoMinimo: -1, aseoModerado: 2, aseoMucho: 3, aseoPeluqueria: 1, tamPequeno: -2, tamMediano: -1, tamGrande: 3, tamIndiferente: 2, priCompanero: 1, priJuego: 2, priGuardian: 3, priDeportista: 3 },
  },
  {
    name: 'Shih Tzu', emoji: '🌸', bg: '#F9FBE7', size: 'Pequeño', energy: 'Baja', groom: 'Alto',
    desc: 'El perro "de palacio". Afectuoso, tranquilo y perfecto para personas mayores o apartamentos pequeños.',
    pros: ['Muy tranquilo', 'No necesita mucho ejercicio', 'Muy cariñoso'],
    cons: ['Requiere mucho aseo y peluquería', 'Puede tener problemas respiratorios', 'Precio elevado'],
    scores: { apartamento: 3, patio: 2, jardin: 1, rural: 0, sedentario: 3, moderado: 2, activo: 0, muyactivo: -2, soloNunca: 2, soloPoco: 2, soloMedio: 1, soloMucho: -1, sinNinos: 3, ninosMayores: 2, ninosMenores: 1, bebes: 0, novato: 3, intermedio: 2, experto: 2, profesional: 1, aseoMinimo: -2, aseoModerado: 1, aseoMucho: 3, aseoPeluqueria: 3, tamPequeno: 3, tamMediano: -1, tamGrande: -2, tamIndiferente: 1, priCompanero: 3, priJuego: 1, priGuardian: 0, priDeportista: -1 },
  },
  {
    name: 'Husky Siberiano', emoji: '❄️', bg: '#E3F2FD', size: 'Grande', energy: 'Muy alta', groom: 'Moderado',
    desc: 'Lobo doméstico de mirada azul hipnótica. Enérgico, independiente y muy vocal. Para personas muy activas.',
    pros: ['Físicamente impresionante', 'Muy resistente', 'Amistoso con personas'],
    cons: ['Necesita ejercicio extremo', 'Puede escaparse fácilmente', 'Aúlla mucho'],
    scores: { apartamento: -3, patio: 0, jardin: 2, rural: 3, sedentario: -3, moderado: -1, activo: 2, muyactivo: 3, soloNunca: 2, soloPoco: 1, soloMedio: -1, soloMucho: -3, sinNinos: 2, ninosMayores: 2, ninosMenores: 1, bebes: 1, novato: -2, intermedio: 0, experto: 2, profesional: 3, aseoMinimo: -1, aseoModerado: 2, aseoMucho: 3, aseoPeluqueria: 1, tamPequeno: -2, tamMediano: 0, tamGrande: 3, tamIndiferente: 1, priCompanero: 1, priJuego: 3, priGuardian: 1, priDeportista: 3 },
  },
  {
    name: 'Border Collie', emoji: '🐑', bg: '#E0F2F1', size: 'Mediano', energy: 'Muy alta', groom: 'Moderado',
    desc: 'El perro más inteligente del mundo. Necesita un trabajo o deporte para estar equilibrado. No es un perro sofá.',
    pros: ['Inteligencia excepcional', 'Muy atlético', 'Excelente para deportes caninos'],
    cons: ['Necesita trabajo mental intensivo a diario', 'Puede desarrollar obsesiones', 'No apto para novatos'],
    scores: { apartamento: -3, patio: 0, jardin: 2, rural: 3, sedentario: -3, moderado: -1, activo: 2, muyactivo: 3, soloNunca: 2, soloPoco: 1, soloMedio: -1, soloMucho: -3, sinNinos: 1, ninosMayores: 2, ninosMenores: 1, bebes: 0, novato: -3, intermedio: 0, experto: 2, profesional: 3, aseoMinimo: -1, aseoModerado: 2, aseoMucho: 3, aseoPeluqueria: 1, tamPequeno: -1, tamMediano: 3, tamGrande: 0, tamIndiferente: 2, priCompanero: 1, priJuego: 3, priGuardian: 1, priDeportista: 3 },
  },
  {
    name: 'Boxer', emoji: '🥊', bg: '#FFF3E0', size: 'Grande', energy: 'Alta', groom: 'Bajo',
    desc: 'Juguetón hasta la vejez, protector y muy fiel a su familia. Le encantan los niños y es eterno cachorro.',
    pros: ['Excelente con niños', 'Muy juguetón', 'Bajo mantenimiento'],
    cons: ['Necesita mucho ejercicio', 'Braquicéfalo (problemas con el calor)', 'Puede ser difícil de manejar por su fuerza'],
    scores: { apartamento: -1, patio: 2, jardin: 3, rural: 2, sedentario: -2, moderado: 2, activo: 3, muyactivo: 3, soloNunca: 2, soloPoco: 2, soloMedio: 0, soloMucho: -2, sinNinos: 2, ninosMayores: 3, ninosMenores: 2, bebes: 1, novato: 0, intermedio: 2, experto: 3, profesional: 2, aseoMinimo: 3, aseoModerado: 2, aseoMucho: 1, aseoPeluqueria: 1, tamPequeno: -2, tamMediano: 0, tamGrande: 3, tamIndiferente: 2, priCompanero: 2, priJuego: 3, priGuardian: 2, priDeportista: 2 },
  },
  {
    name: 'Pug', emoji: '🐷', bg: '#F3E5F5', size: 'Pequeño', energy: 'Baja', groom: 'Bajo',
    desc: 'La cara más graciosa del mundo canino. Divertido, cariñoso y muy sociable. No necesita mucho ejercicio.',
    pros: ['Ideal para pisos', 'Muy gracioso y simpático', 'No necesita ejercicio intenso'],
    cons: ['Problemas respiratorios', 'Ojos delicados', 'Ronca y flatulencias'],
    scores: { apartamento: 3, patio: 2, jardin: 1, rural: 0, sedentario: 3, moderado: 2, activo: 0, muyactivo: -2, soloNunca: 2, soloPoco: 2, soloMedio: 1, soloMucho: -1, sinNinos: 2, ninosMayores: 3, ninosMenores: 2, bebes: 1, novato: 3, intermedio: 2, experto: 2, profesional: 1, aseoMinimo: 3, aseoModerado: 2, aseoMucho: 1, aseoPeluqueria: 1, tamPequeno: 3, tamMediano: -1, tamGrande: -2, tamIndiferente: 1, priCompanero: 3, priJuego: 2, priGuardian: 0, priDeportista: -1 },
  },
  {
    name: 'Schnauzer Miniatura', emoji: '🧔', bg: '#ECEFF1', size: 'Pequeño', energy: 'Media', groom: 'Alto',
    desc: 'Inteligente, alerta y muy limpio. No suelta pelo. Buen guardián para su tamaño. Muy adaptable.',
    pros: ['No suelta pelo', 'Inteligente y entrenable', 'Buen guardián para su tamaño'],
    cons: ['Requiere recorte regular', 'Puede ser ladrador', 'Cabezota a veces'],
    scores: { apartamento: 3, patio: 2, jardin: 2, rural: 1, sedentario: 2, moderado: 3, activo: 2, muyactivo: 1, soloNunca: 2, soloPoco: 2, soloMedio: 1, soloMucho: -1, sinNinos: 2, ninosMayores: 3, ninosMenores: 2, bebes: 1, novato: 2, intermedio: 3, experto: 3, profesional: 2, aseoMinimo: -1, aseoModerado: 1, aseoMucho: 2, aseoPeluqueria: 3, tamPequeno: 3, tamMediano: 1, tamGrande: -1, tamIndiferente: 2, priCompanero: 2, priJuego: 2, priGuardian: 2, priDeportista: 1 },
  },
  {
    name: 'Cocker Spaniel', emoji: '🐶', bg: '#FFF8E1', size: 'Mediano', energy: 'Media', groom: 'Alto',
    desc: 'Ojos melosos y orejas de terciopelo. Dulce, sensible y muy cariñoso. Gran perro de familia.',
    pros: ['Muy cariñoso y sensible', 'Buen carácter con niños', 'Precioso aspecto'],
    cons: ['Pelaje muy exigente', 'Propenso a otitis', 'Necesita afecto constante'],
    scores: { apartamento: 2, patio: 3, jardin: 3, rural: 2, sedentario: 1, moderado: 3, activo: 2, muyactivo: 1, soloNunca: 2, soloPoco: 2, soloMedio: 0, soloMucho: -2, sinNinos: 2, ninosMayores: 3, ninosMenores: 3, bebes: 2, novato: 2, intermedio: 3, experto: 2, profesional: 1, aseoMinimo: -2, aseoModerado: 1, aseoMucho: 3, aseoPeluqueria: 3, tamPequeno: 1, tamMediano: 3, tamGrande: -1, tamIndiferente: 2, priCompanero: 3, priJuego: 2, priGuardian: 0, priDeportista: 1 },
  },
  {
    name: 'Dálmata', emoji: '⚫', bg: '#FAFAFA', size: 'Grande', energy: 'Muy alta', groom: 'Bajo',
    desc: 'Elegante y atlético. Necesita correr cada día. Para personas muy activas que disfrutan del deporte.',
    pros: ['Muy atlético y elegante', 'Bajo mantenimiento de pelaje', 'Sociable con otros perros'],
    cons: ['Necesita ejercicio intenso a diario', 'Puede ser hiperactivo', 'Predisposición a sordera'],
    scores: { apartamento: -2, patio: 1, jardin: 3, rural: 3, sedentario: -3, moderado: 0, activo: 3, muyactivo: 3, soloNunca: 1, soloPoco: 1, soloMedio: -1, soloMucho: -2, sinNinos: 2, ninosMayores: 2, ninosMenores: 1, bebes: 0, novato: -1, intermedio: 1, experto: 3, profesional: 3, aseoMinimo: 3, aseoModerado: 2, aseoMucho: 1, aseoPeluqueria: 1, tamPequeno: -2, tamMediano: 0, tamGrande: 3, tamIndiferente: 1, priCompanero: 1, priJuego: 3, priGuardian: 1, priDeportista: 3 },
  },
  {
    name: 'Maltés', emoji: '🤍', bg: '#FAFAFA', size: 'Pequeño', energy: 'Baja', groom: 'Alto',
    desc: 'Pequeño, blanco y elegante. Muy cariñoso y apegado a su dueño. El compañero ideal para el sofá.',
    pros: ['Tamaño ideal para pisos', 'Muy tranquilo', 'No suelta pelo'],
    cons: ['Pelaje blanquísimo que mancha fácil', 'Propenso a lacrimar (manchas oculares)', 'Requiere aseo frecuente'],
    scores: { apartamento: 3, patio: 2, jardin: 1, rural: 0, sedentario: 3, moderado: 2, activo: 0, muyactivo: -2, soloNunca: 2, soloPoco: 2, soloMedio: 1, soloMucho: -1, sinNinos: 3, ninosMayores: 2, ninosMenores: 0, bebes: -1, novato: 3, intermedio: 2, experto: 2, profesional: 1, aseoMinimo: -2, aseoModerado: 1, aseoMucho: 3, aseoPeluqueria: 3, tamPequeno: 3, tamMediano: -1, tamGrande: -2, tamIndiferente: 1, priCompanero: 3, priJuego: 1, priGuardian: 0, priDeportista: -1 },
  },
  {
    name: 'Galgo Español', emoji: '🏃', bg: '#E8F5E9', size: 'Grande', energy: 'Baja/Media', groom: 'Bajo',
    desc: 'El sofá runner. Velocísimo a ráfagas pero tremendamente tranquilo en casa. Ideal para adopción.',
    pros: ['Muy tranquilo en casa', 'Bajo mantenimiento', 'Ideal para adoptar'],
    cons: ['Caza cualquier cosa que se mueva (presa)', 'Muy sensible al frío', 'Necesita suelto diario en zona segura'],
    scores: { apartamento: 2, patio: 2, jardin: 3, rural: 3, sedentario: 2, moderado: 3, activo: 3, muyactivo: 2, soloNunca: 2, soloPoco: 2, soloMedio: 2, soloMucho: 0, sinNinos: 2, ninosMayores: 2, ninosMenores: 1, bebes: 1, novato: 2, intermedio: 3, experto: 3, profesional: 2, aseoMinimo: 3, aseoModerado: 2, aseoMucho: 1, aseoPeluqueria: 1, tamPequeno: -2, tamMediano: 0, tamGrande: 3, tamIndiferente: 2, priCompanero: 3, priJuego: 1, priGuardian: 0, priDeportista: 2 },
  },
]

// ----------- TYPES -----------

interface BreedResult {
  breed: Breed
  score: number
  pct: number
}

// ----------- SCORING -----------

function calcResults(answers: Record<number, string>): BreedResult[] {
  const scores = breeds.map(breed => {
    let total = 0
    let maxPossible = 0

    questions.forEach((q, qi) => {
      const answerKey = answers[qi]
      if (!answerKey) return

      const val = breed.scores[answerKey] ?? 0
      total += val

      let maxForQ = 0
      q.options.forEach(opt => {
        const s = breed.scores[opt.key] ?? 0
        if (s > maxForQ) maxForQ = s
      })
      maxPossible += maxForQ
    })

    let pct = maxPossible > 0 ? Math.round((total / maxPossible) * 100) : 0
    pct = Math.max(0, Math.min(100, pct))

    return { breed, score: total, pct }
  })

  scores.sort((a, b) => b.score - a.score)
  return scores.slice(0, 3)
}

// ----------- COMPONENT -----------

export default function TestRazaTool() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [results, setResults] = useState<BreedResult[] | null>(null)
  const [showDisclaimer, setShowDisclaimer] = useState(false)
  const [pendingResults, setPendingResults] = useState<BreedResult[] | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const totalSteps = questions.length
  const currentQuestion = questions[currentStep]
  const currentAnswer = answers[currentStep]
  const isLastStep = currentStep === totalSteps - 1
  const allAnswered = Object.keys(answers).length === totalSteps

  function scrollToProgress() {
    if (progressRef.current) {
      const top = progressRef.current.getBoundingClientRect().top + window.pageYOffset - 90
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  function handleSelectOption(key: string) {
    setAnswers(prev => ({ ...prev, [currentStep]: key }))
  }

  function handleNext() {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(s => s + 1)
      setTimeout(scrollToProgress, 50)
    } else {
      const top3 = calcResults(answers)
      setPendingResults(top3)
      setShowDisclaimer(true)
    }
  }

  function handlePrev() {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1)
      setTimeout(scrollToProgress, 50)
    }
  }

  function handleDisclaimerOk() {
    setShowDisclaimer(false)
    if (pendingResults) {
      setResults(pendingResults)
      setPendingResults(null)
      setTimeout(() => {
        const el = document.getElementById('quizResults')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 50)
    }
  }

  function handleRetry() {
    setAnswers({})
    setCurrentStep(0)
    setResults(null)
    setPendingResults(null)
    setShowDisclaimer(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const rankLabels = ['🥇 Tu mejor opción', '🥈 Segunda opción', '🥉 Tercera opción']

  return (
    <>
      {/* Progress bar */}
      <div id="quizProgress" ref={progressRef} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 0, marginBottom: '2rem', flexWrap: 'wrap',
      }}>
        {questions.map((_, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            {i > 0 && (
              <div style={{
                width: '28px', height: '3px',
                background: i <= currentStep ? '#667e6d' : '#ddd',
                transition: 'background 0.3s',
              }} />
            )}
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.8rem', fontWeight: 700, transition: 'all 0.3s',
              background: i < currentStep ? '#667e6d' : i === currentStep ? '#4a6358' : '#eee',
              color: i <= currentStep ? '#fff' : '#999',
              border: i === currentStep ? '2px solid #2e4a3a' : '2px solid transparent',
            }}>
              {i < currentStep ? '✓' : i + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Current question card */}
      {!results && (
        <div style={{
          background: '#fff', borderRadius: '16px', padding: '2rem',
          boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: '1.5rem',
        }}>
          <p style={{ fontSize: '0.85rem', color: '#999', margin: '0 0 0.4rem', fontFamily: "'Poppins', sans-serif" }}>
            Pregunta {currentStep + 1} de {totalSteps}
          </p>
          <h3 style={{ fontSize: '1.25rem', color: '#2e4a3a', margin: '0 0 0.4rem', fontFamily: "'Poppins', sans-serif" }}>
            {currentQuestion.title}
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#888', margin: '0 0 1.4rem', lineHeight: 1.5 }}>
            {currentQuestion.subtitle}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '0.75rem',
          }}>
            {currentQuestion.options.map(opt => (
              <button
                key={opt.key}
                onClick={() => handleSelectOption(opt.key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.9rem 1.1rem', borderRadius: '12px', border: '2px solid',
                  borderColor: currentAnswer === opt.key ? '#667e6d' : '#e5e7eb',
                  background: currentAnswer === opt.key ? '#f0f5f1' : '#fff',
                  color: currentAnswer === opt.key ? '#2e4a3a' : '#444',
                  fontWeight: currentAnswer === opt.key ? 700 : 400,
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                  fontSize: '0.93rem', lineHeight: 1.4,
                }}
              >
                <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      {!results && (
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            style={{
              flex: 1, padding: '0.9rem', borderRadius: '10px', border: '2px solid #e5e7eb',
              background: '#fff', color: currentStep === 0 ? '#ccc' : '#444',
              cursor: currentStep === 0 ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: '0.95rem',
            }}
          >
            ← Anterior
          </button>
          <button
            onClick={handleNext}
            disabled={!currentAnswer}
            style={{
              flex: 2, padding: '0.9rem', borderRadius: '10px', border: 'none',
              background: currentAnswer ? '#667e6d' : '#ccc',
              color: '#fff', cursor: currentAnswer ? 'pointer' : 'not-allowed',
              fontWeight: 700, fontSize: '0.95rem', transition: 'background 0.2s',
            }}
          >
            {isLastStep ? (allAnswered ? 'Ver mis razas →' : 'Responde esta pregunta') : 'Siguiente →'}
          </button>
        </div>
      )}

      {/* Results */}
      {results && (
        <div id="quizResults">
          <h2 style={{ textAlign: 'center', color: '#2e4a3a', fontFamily: "'Poppins', sans-serif", marginBottom: '0.5rem' }}>
            Tus 3 razas ideales
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Basado en tus respuestas, estas son las razas que mejor encajan con tu estilo de vida.
          </p>

          <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
            {results.map((item, i) => (
              <div key={item.breed.name} style={{
                background: '#fff', borderRadius: '16px', overflow: 'hidden',
                boxShadow: i === 0 ? '0 4px 24px rgba(102,126,109,0.18)' : '0 2px 12px rgba(0,0,0,0.07)',
                border: i === 0 ? '2px solid #667e6d' : '1px solid #e5e7eb',
              }}>
                {/* Card header */}
                <div style={{
                  background: i === 0 ? '#667e6d' : i === 1 ? '#8fa898' : '#b0c4b8',
                  padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem',
                }}>
                  <span style={{
                    background: 'rgba(255,255,255,0.2)', color: '#fff',
                    padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600,
                  }}>
                    {rankLabels[i]}
                  </span>
                </div>

                <div style={{ padding: '1.5rem' }}>
                  {/* Breed name & emoji */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                      width: '56px', height: '56px', borderRadius: '50%',
                      background: item.breed.bg, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0,
                    }}>
                      {item.breed.emoji}
                    </div>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#2e4a3a', fontFamily: "'Poppins', sans-serif" }}>
                      {item.breed.name}
                    </h3>
                  </div>

                  {/* Compatibility bar */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.85rem', color: '#555' }}>
                      <span>Compatibilidad</span>
                      <span style={{ fontWeight: 700, color: '#667e6d' }}>{item.pct}%</span>
                    </div>
                    <div style={{ background: '#e5e7eb', borderRadius: '99px', height: '8px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${item.pct}%`, height: '100%',
                        background: i === 0 ? '#667e6d' : i === 1 ? '#8fa898' : '#b0c4b8',
                        borderRadius: '99px', transition: 'width 0.6s ease',
                      }} />
                    </div>
                  </div>

                  {/* Badges */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                    <span style={{ background: '#f0f5f1', color: '#2e4a3a', padding: '0.2rem 0.65rem', borderRadius: '20px', fontSize: '0.8rem' }}>
                      📏 {item.breed.size}
                    </span>
                    <span style={{ background: '#fff8e1', color: '#795548', padding: '0.2rem 0.65rem', borderRadius: '20px', fontSize: '0.8rem' }}>
                      ⚡ Energía: {item.breed.energy}
                    </span>
                    <span style={{ background: '#f3e5f5', color: '#6a1b9a', padding: '0.2rem 0.65rem', borderRadius: '20px', fontSize: '0.8rem' }}>
                      ✂️ Aseo: {item.breed.groom}
                    </span>
                  </div>

                  {/* Description */}
                  <p style={{ color: '#555', fontSize: '0.93rem', lineHeight: 1.6, margin: '0 0 1rem' }}>
                    {item.breed.desc}
                  </p>

                  {/* Pros & Cons */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <p style={{ fontWeight: 700, color: '#2e7d32', fontSize: '0.85rem', margin: '0 0 0.4rem' }}>✅ Ventajas</p>
                      <ul style={{ margin: 0, padding: '0 0 0 1rem', color: '#444', fontSize: '0.85rem', lineHeight: 1.7 }}>
                        {item.breed.pros.map(p => <li key={p}>{p}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, color: '#c62828', fontSize: '0.85rem', margin: '0 0 0.4rem' }}>⚠️ Inconvenientes</p>
                      <ul style={{ margin: 0, padding: '0 0 0 1rem', color: '#444', fontSize: '0.85rem', lineHeight: 1.7 }}>
                        {item.breed.cons.map(c => <li key={c}>{c}</li>)}
                      </ul>
                    </div>
                  </div>

                  {/* Why text */}
                  <div style={{
                    background: '#f0f5f1', borderLeft: '3px solid #667e6d',
                    borderRadius: '0 8px 8px 0', padding: '0.8rem 1rem',
                    fontSize: '0.88rem', color: '#3d5a47',
                  }}>
                    <strong>¿Por qué te va bien?</strong>{' '}
                    {i === 0
                      ? 'Es la raza que mejor encaja con tu estilo de vida, espacio y nivel de experiencia según tus respuestas.'
                      : 'También es una excelente opción para tu perfil, con características que se adaptan bien a tu situación.'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Retry button */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <button
              onClick={handleRetry}
              style={{
                padding: '0.8rem 2rem', borderRadius: '10px', border: '2px solid #667e6d',
                background: '#fff', color: '#667e6d', cursor: 'pointer',
                fontWeight: 600, fontSize: '0.95rem',
              }}
            >
              🔄 Repetir el test
            </button>
          </div>

          {/* CTA */}
          <div className="cta-box" style={{ marginTop: '1rem' }}>
            <h3>📊 Calcula también su alimentación</h3>
            <p>Una vez que tengas clara la raza, asegúrate de conocer su porción ideal.</p>
            <Link href="/#calculadora" className="btn">Calcular Porción Ideal</Link>
          </div>
        </div>
      )}

      {/* Disclaimer modal */}
      {showDisclaimer && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, padding: '1rem',
        }}>
          <div style={{
            background: '#fff', borderRadius: '16px', padding: '2rem',
            maxWidth: '480px', width: '100%', boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
          }}>
            <h3 style={{ color: '#2e4a3a', fontFamily: "'Poppins', sans-serif", margin: '0 0 1rem' }}>
              📋 Aviso importante
            </h3>
            <p style={{ color: '#555', lineHeight: 1.7, fontSize: '0.93rem', marginBottom: '1.5rem' }}>
              Este test es orientativo y tiene fines informativos. La compatibilidad con una raza depende de muchos factores individuales. Antes de adoptar o comprar un perro, te recomendamos consultar con un veterinario o especialista en comportamiento canino.
            </p>
            <button
              onClick={handleDisclaimerOk}
              style={{
                width: '100%', padding: '0.9rem', borderRadius: '10px', border: 'none',
                background: '#667e6d', color: '#fff', cursor: 'pointer',
                fontWeight: 700, fontSize: '1rem',
              }}
            >
              Entendido, ver mis razas →
            </button>
          </div>
        </div>
      )}
    </>
  )
}
