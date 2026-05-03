export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
  readTime: number
  image: string
}

export const posts: BlogPost[] = [
  {
    slug: 'senales-sobrealimentacion',
    title: '10 Señales de que tu Perro Está Sobrealimentado',
    description: 'Descubre las señales reales de sobrealimentación en perros y cómo corregirlas sin culpa. Guía práctica basada en criterio veterinario.',
    date: '2025-11-01',
    category: 'Nutrición',
    readTime: 5,
    image: '/images/blogs/señales_sobrealimentacion.jpg',
  },
  {
    slug: 'cuanto-debe-comer-perro-peso',
    title: 'Cuánto Debe Comer un Perro Según su Peso: Tabla Completa',
    description: 'Tabla completa de porciones para perros de 5kg a 40kg+. Basada en fórmulas veterinarias certificadas.',
    date: '2025-11-15',
    category: 'Nutrición',
    readTime: 8,
    image: '/images/blogs/cuanto_debe_comer_tu_perro.jpg',
  },
  {
    slug: 'perro-sobrepeso-plan-4-semanas',
    title: 'Plan de 4 Semanas para Perros con Sobrepeso',
    description: 'Plan paso a paso para adelgazar de forma saludable. Ejercicios, alimentación y seguimiento semanal.',
    date: '2025-11-20',
    category: 'Salud',
    readTime: 12,
    image: '/images/blogs/plan_bajar_peso.jpg',
  },
  {
    slug: 'ansiedad-separacion-perros',
    title: 'Ansiedad por Separación: 7 Señales + Solución en 15 Minutos',
    description: 'Cómo identificar y solucionar la ansiedad por separación con una rutina veterinaria de solo 15 minutos antes de salir.',
    date: '2025-12-01',
    category: 'Comportamiento',
    readTime: 8,
    image: '/images/blogs/perro_ventana.jpg',
  },
  {
    slug: 'alimentacion-chihuahuas-guia-completa',
    title: 'Alimentación para Chihuahuas: Guía Completa 2025',
    description: 'Tabla de porciones exactas por peso y edad, errores fatales comunes y mejores alimentos para Chihuahuas.',
    date: '2025-12-02',
    category: 'Nutrición',
    readTime: 10,
    image: '/images/blogs/chihuahua_comiendo.jpg',
  },
  {
    slug: 'perro-no-quiere-comer-causas-soluciones',
    title: 'Mi Perro No Quiere Comer: 7 Causas + Soluciones',
    description: 'Test de urgencia + protocolo de 24 horas para que tu perro vuelva a comer. Causas médicas vs conductuales explicadas.',
    date: '2025-12-10',
    category: 'Salud',
    readTime: 9,
    image: '/images/blogs/perro_chico_comiendo.jpg',
  },
  {
    slug: 'como-socializar-un-cachorro-correctamente',
    title: 'Cómo Socializar un Cachorro Correctamente (Guía + Checklist)',
    description: 'Aprende la técnica correcta de socialización, etapa por etapa. Checklist imprimible, errores comunes y recomendaciones veterinarias.',
    date: '2025-12-15',
    category: 'Comportamiento',
    readTime: 8,
    image: '/images/blogs/socializar_perro.jpg',
  },
  {
    slug: 'perro-deshidratado-senales-que-hacer',
    title: '¿Mi perro está deshidratado? Señales, pruebas y qué hacer',
    description: 'Aprende a identificar la deshidratación en tu perro con señales claras, pruebas rápidas en casa y acciones veterinarias recomendadas.',
    date: '2026-01-10',
    category: 'Salud',
    readTime: 6,
    image: '/images/blogs/perro-deshidratacion/dog-deshidratacion.jpg',
  },
  {
    slug: 'golpe-de-calor-en-perros-senales-que-hacer',
    title: 'Golpe de Calor en Perros: Señales, Primeros Auxilios y Prevención',
    description: 'Aprende a identificar un golpe de calor, los primeros auxilios en los primeros 60 segundos y cómo prevenirlo según veterinarios.',
    date: '2026-01-15',
    category: 'Salud',
    readTime: 7,
    image: '/images/blogs/golpe-calor/dog-golpe-calor.jpg',
  },
  {
    slug: 'porque-mi-perro-tiembla-causas-soluciones',
    title: 'Mi Perro Tiembla: 9 Causas Reales y Qué Hacer',
    description: 'Descubre por qué tu perro tiembla: frío, dolor, miedo, hipoglucemia, intoxicación y más. Señales de alerta y soluciones rápidas.',
    date: '2026-01-20',
    category: 'Salud',
    readTime: 7,
    image: '/images/blogs/perro-tiembla/tarjeta.jpg',
  },
  {
    slug: 'como-banar-perro-en-casa',
    title: 'Cómo Bañar a tu Perro en Casa: Guía Paso a Paso Sin Estrés',
    description: 'Cada cuánto bañarlo, qué productos usar, temperatura del agua y técnica correcta para un baño sin estrés.',
    date: '2026-02-05',
    category: 'Cuidado',
    readTime: 7,
    image: '/images/blogs/cachorro_superficies.jpg',
  },
  {
    slug: 'alimentos-prohibidos-perros',
    title: 'Alimentos Prohibidos para Perros: Lista Completa + Qué Hacer si Come Uno',
    description: 'Chocolate, uvas, xilitol, cebolla y más: qué pasa si los come y cómo actuar en una emergencia.',
    date: '2026-02-15',
    category: 'Nutrición',
    readTime: 9,
    image: '/images/blogs/perro-aburrido-comida.jpg',
  },
  {
    slug: 'diarrea-en-perros-causas-remedios',
    title: 'Diarrea en Perros: Causas, Remedios Caseros y Cuándo ir al Veterinario',
    description: 'Dieta blanda, probióticos y señales de alarma. Todo lo que necesitas saber sobre la diarrea canina.',
    date: '2026-02-25',
    category: 'Salud',
    readTime: 8,
    image: '/images/blogs/perro-triste-plato.jpg',
  },
  {
    slug: 'como-limpiar-dientes-perro',
    title: 'Cómo Limpiar los Dientes de tu Perro en Casa (Guía Paso a Paso)',
    description: 'Técnica correcta para limpiar los dientes de tu perro, con qué productos usar y señales de enfermedad dental.',
    date: '2026-03-10',
    category: 'Cuidado',
    readTime: 7,
    image: '/images/blogs/perro_chico_comiendo.jpg',
  },
  {
    slug: 'perro-ladra-mucho-causas-soluciones',
    title: 'Mi Perro Ladra Mucho: 8 Causas Reales y Cómo Corregirlo',
    description: 'Por qué tu perro ladra demasiado y técnicas efectivas de refuerzo positivo para reducirlo.',
    date: '2026-03-20',
    category: 'Comportamiento',
    readTime: 8,
    image: '/images/blogs/perro_ventana.jpg',
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug)
}

export function formatDate(dateStr: string): string {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  const d = new Date(dateStr + 'T12:00:00')
  return `${months[d.getMonth()]} ${d.getFullYear()}`
}
