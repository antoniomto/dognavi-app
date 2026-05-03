import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostBySlug, posts, formatDate } from '@/lib/blog/posts'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://dognavi.org/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://dognavi.org/blog/${slug}`,
      images: [{ url: `https://dognavi.org${post.image}` }],
      locale: 'es_ES',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export async function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }))
}

async function getContent(slug: string): Promise<string> {
  try {
    const mod = await import(`@/lib/blog/content/${slug}`)
    return mod.content as string
  } catch {
    return '<p>Contenido no disponible.</p>'
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const content = await getContent(slug)
  const postIndex = posts.findIndex(p => p.slug === slug)
  const prevPost = postIndex > 0 ? posts[postIndex - 1] : null
  const nextPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null

  const relatedPosts = posts
    .filter(p => p.slug !== slug && p.category === post.category)
    .slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    url: `https://dognavi.org/blog/${slug}`,
    image: `https://dognavi.org${post.image}`,
    inLanguage: 'es',
    publisher: {
      '@type': 'Organization',
      name: 'DogNavi',
      url: 'https://dognavi.org',
      logo: 'https://dognavi.org/images/dognavi_logo.png',
    },
    author: { '@type': 'Organization', name: 'DogNavi' },
    datePublished: post.date,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Render the extracted HTML content */}
      <div dangerouslySetInnerHTML={{ __html: content }} />

      {/* Prev/Next navigation */}
      <div className="blog-article" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <nav className="prev-next-nav" aria-label="Artículos anterior y siguiente">
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="pn-link">
              <span className="pn-label">← Anterior</span>
              <span className="pn-title">{prevPost.title}</span>
            </Link>
          ) : (
            <div className="pn-link pn-empty" />
          )}

          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`} className="pn-link pn-next">
              <span className="pn-label">Siguiente →</span>
              <span className="pn-title">{nextPost.title}</span>
            </Link>
          ) : (
            <div className="pn-link pn-empty" />
          )}
        </nav>

        {relatedPosts.length > 0 && (
          <div className="related-posts">
            <h3 className="related-title">Artículos relacionados</h3>
            <div className="related-posts-grid">
              {relatedPosts.map(related => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="related-card">
                  <div className="related-card-img">
                    <img src={related.image} alt={related.title} loading="lazy" />
                  </div>
                  <div className="related-card-body">
                    <span className="related-cat">{related.category}</span>
                    <h4>{related.title}</h4>
                    <span className="related-meta">📅 {formatDate(related.date)} · ⏱️ {related.readTime} min</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
