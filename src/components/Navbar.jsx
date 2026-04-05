import { useState } from 'react'
import useActiveSection from '../hooks/useActiveSection'

const SECTIONS = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact',  label: 'Contact' },
]

export default function Navbar({ scrollTo }) {
  const active   = useActiveSection(SECTIONS.map(s => s.id))
  const [menuOpen, setMenuOpen] = useState(false)

  const go = (id) => { scrollTo(id); setMenuOpen(false) }

  return (
    <>
      <nav className={`
        fixed top-0 left-0 right-0 z-[100]
        flex items-center justify-between
        px-5 sm:px-8 lg:px-14 py-4 sm:py-5
        transition-all duration-300
        ${active !== 'home'
          ? 'bg-navy-dark/92 border-b border-navy-pale/10 backdrop-blur-md'
          : 'bg-gradient-to-b from-navy-dark/70 to-transparent'}
      `}>

        {/* Logo */}
        <button onClick={() => go('home')}
          className="font-display font-black text-[.82rem] sm:text-[.92rem] tracking-[.24em] text-white hover:opacity-80 transition-opacity z-10">
          KUN<span className="text-coral">I</span>VERSE
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {SECTIONS.map(({ id, label }) => (
            <button key={id} onClick={() => go(id)}
              className={`nav-link font-body text-[.64rem] lg:text-[.68rem] font-medium tracking-[.13em] uppercase transition-colors
                ${active === id ? 'text-white active' : 'text-navy-pale/65 hover:text-white'}`}>
              {label}
            </button>
          ))}
          <button onClick={() => go('contact')}
            className="ml-2 font-display text-[.55rem] lg:text-[.58rem] font-bold tracking-[.16em] uppercase text-coral border border-coral/45 px-3 lg:px-4 py-[.42rem] hover:bg-coral hover:text-white hover:border-coral transition-all duration-250">
            Hire me
          </button>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(o => !o)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] z-10"
          aria-label="Open menu">
          <span className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`}/>
          <span className={`block w-5 h-px bg-white transition-all duration-200 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}/>
          <span className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}/>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`
        fixed inset-0 z-[99] md:hidden flex flex-col items-center justify-center
        bg-navy-dark/98 backdrop-blur-xl transition-all duration-500
        ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        <div className="flex flex-col items-center gap-8">
          {SECTIONS.map(({ id, label }, i) => (
            <button key={id} onClick={() => go(id)}
              className={`font-display font-black text-3xl tracking-[.18em] uppercase transition-all duration-300
                ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
                ${active === id ? 'text-coral' : 'text-white hover:text-violet-light'}`}
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}>
              {label}
            </button>
          ))}
          <button onClick={() => go('contact')}
            className={`mt-4 font-display text-[.65rem] font-bold tracking-[.22em] uppercase text-coral border border-coral/50 px-10 py-3 hover:bg-coral hover:text-white transition-all duration-250
              ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
            style={{ transitionDelay: menuOpen ? `${SECTIONS.length * 60}ms` : '0ms' }}>
            Hire me
          </button>
        </div>
      </div>
    </>
  )
}
