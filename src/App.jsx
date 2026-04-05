import { useState, useEffect, useRef } from 'react'
import GalaxyScene   from '@scenes/GalaxyScene'
import LoadingScreen from '@components/LoadingScreen'
import Navbar        from '@components/Navbar'
import useReveal     from './hooks/useReveal'

import Home     from '@pages/Home'
import About    from '@pages/About'
import Projects from '@pages/Projects'
import Music    from '@pages/Music'
import Contact  from '@pages/Contact'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  // Wire up scroll-reveal for all .reveal elements
  useReveal()

  // Smooth-scroll helper passed to nav + hero CTA buttons
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative">

      {/* ── Galaxy fixed behind everything ── */}
            <GalaxyScene  onLoaded={() => setLoaded(true)} />

      {/* ── Fixed vignette overlay ── */}
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 20%, rgba(5,13,31,.75) 100%)' }}
      />

      {/* ── Cursor glow (desktop) ── */}
      <CursorGlow />

      {/* ── Loader ── */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* ── Fixed nav ── */}
      {loaded && <Navbar scrollTo={scrollTo} />}

      {/* ── The one scrollable page ── */}
      {loaded && (
        <main className="relative z-10">
          <Home    scrollTo={scrollTo} />
          <About   />
          <Projects />
          {/* <Music   scrollTo={scrollTo} /> */}
          <Contact />
          <Footer  />
        </main>
      )}
    </div>
  )
}

/* ── Sticky cursor glow ── */
function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const move = e => { el.style.left = e.clientX + 'px'; el.style.top = e.clientY + 'px' }
    document.addEventListener('mousemove', move)
    return () => document.removeEventListener('mousemove', move)
  }, [])
  return (
    <div ref={ref}
      className="hidden md:block fixed w-80 h-80 rounded-full pointer-events-none z-[3]"
      style={{
        background: 'radial-gradient(circle, rgba(142,49,164,.07) 0%, transparent 70%)',
        transform: 'translate(-50%,-50%)',
        left: '-999px', top: '-999px',
      }}
    />
  )
}

/* ── Page footer ── */
function Footer() {
  return (
    <footer className="relative z-10 border-t border-navy-pale/10 py-10 px-5 sm:px-8 lg:px-16">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="font-display font-black text-[.8rem] tracking-[.28em] text-white">
          KUN<span className="text-coral">I</span>VERSE
        </div>
        <div className="flex gap-6">
          {['Behance','ArtStation','SoundCloud','Instagram'].map(s => (
            <a key={s} href="#"
              className="font-body text-[.62rem] tracking-[.1em] text-navy-pale/40 hover:text-violet-light transition-colors no-underline">
              {s}
            </a>
          ))}
        </div>
        <div className="font-display text-[.48rem] tracking-[.12em] text-navy-pale/20 text-center sm:text-right leading-loose">
          <div>RA 17h 45m 40s · Dec −29° 00′ 28″</div>
          <div>© 2024 Kuniverse. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
