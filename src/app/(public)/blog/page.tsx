'use client'

import { useState } from 'react'
import Link from 'next/link'
import { posts, formatDate } from '@/lib/blog/posts'

export const dynamic = 'force-dynamic'

const CATEGORIES = ['Todos', 'Nutrición', 'Salud', 'Comportamiento', 'Cuidado']

export default function BlogIndexPage() {
  const [activeFilter, setActiveFilter] = useState('Todos')

  const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))

  const filteredPosts = activeFilter === 'Todos'
    ? sortedPosts
    : sortedPosts.filter(p => p.category === activeFilter)

  return (
    <>
      <div className="blog-index-header">
        <h1>📚 Blog DogNavi</h1>
        <p>Guías prácticas para dueños de perros, basadas en criterio veterinario y experiencia real.</p>
      </div>

      <div className="blog-index-body">
        {/* Category filters */}
        <div className="blog-filter-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-tab${activeFilter === cat ? ' active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat === 'Nutrición' ? '🥣 Nutrición'
                : cat === 'Salud' ? '🩺 Salud'
                : cat === 'Comportamiento' ? '🧠 Comportamiento'
                : cat === 'Cuidado' ? '✂️ Cuidado'
                : 'Todos'}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        {filteredPosts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', padding: '4rem 2rem' }}>
            No hay artículos en esta categoría todavía.
          </p>
        ) : (
          <div className="blog-grid">
            {filteredPosts.map(post => (
              <div key={post.slug} className="blog-card">
                <div className="card-img-wrapper">
                  <span className="category-badge">{post.category}</span>
                  <img src={post.image} alt={post.title} loading="lazy" />
                </div>
                <div className="card-content">
                  <div className="blog-meta">
                    <span>📅 {formatDate(post.date)}</span>
                    <span>⏱️ {post.readTime} min</span>
                  </div>
                  <h2 className="blog-title">{post.title}</h2>
                  <p className="blog-desc">{post.description}</p>
                  <Link href={`/blog/${post.slug}`} className="btn-primary blog-btn">
                    Leer Guía Completa
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
