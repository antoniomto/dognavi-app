'use client'

import { useState, useEffect } from 'react'

export default function MobileMenuToggle() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const nav = document.getElementById('mainNav')
    if (!nav) return

    if (active) {
      nav.classList.add('active')
    } else {
      nav.classList.remove('active')
    }
  }, [active])

  // Close menu when clicking outside
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      const nav = document.getElementById('mainNav')
      const toggle = document.getElementById('menuToggle')
      if (nav && toggle && !nav.contains(e.target as Node) && !toggle.contains(e.target as Node)) {
        setActive(false)
      }
    }

    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [])

  // Close on nav link click
  useEffect(() => {
    const nav = document.getElementById('mainNav')
    if (!nav) return
    const links = nav.querySelectorAll('a')
    const handler = () => setActive(false)
    links.forEach(link => link.addEventListener('click', handler))
    return () => links.forEach(link => link.removeEventListener('click', handler))
  }, [])

  return (
    <div
      className={`menu-toggle${active ? ' active' : ''}`}
      id="menuToggle"
      onClick={(e) => {
        e.stopPropagation()
        setActive(prev => !prev)
      }}
      role="button"
      aria-label="Abrir menú"
      aria-expanded={active}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}
