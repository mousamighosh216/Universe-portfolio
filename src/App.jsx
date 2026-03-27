import { useState, useCallback } from 'react'
import GalaxyScene   from '@scenes/GalaxyScene'
import Navbar        from '@components/Navbar'
import LoadingScreen from '@components/LoadingScreen'
import Home     from '@pages/Home'
import About    from '@pages/About'
import Projects from '@pages/Projects'
import Music    from '@pages/Music'
import Contact  from '@pages/Contact'

const PAGES = { home: Home, about: About, projects: Projects, music: Music, contact: Contact }

export default function App() {
  const [loaded,       setLoaded]       = useState(false)
  const [currentPage,  setCurrentPage]  = useState('home')
  const [transitioning,setTransitioning]= useState(false)

  const navigate = useCallback((id) => {
    if (id === currentPage || transitioning) return
    setTransitioning(true)
    setTimeout(() => { setCurrentPage(id); setTransitioning(false) }, 350)
  }, [currentPage, transitioning])

  const PageComponent = PAGES[currentPage]

  return (
    <div className="w-full h-full relative overflow-hidden bg-navy-dark">

      {/* Galaxy canvas — always mounted */}
      <GalaxyScene currentPage={currentPage}  onLoaded={() => setLoaded(true)} />

      {/* Vignette */}
      <div className="fixed inset-0 z-[5] pointer-events-none transition-all duration-700"
        style={{
          background: currentPage === 'home'
            ? 'radial-gradient(ellipse at center, transparent 25%, rgba(5,13,31,.72) 100%)'
            : 'radial-gradient(ellipse at 20% 50%, transparent 30%, rgba(5,13,31,.9) 100%)',
        }}
      />

      {/* Cursor glow — desktop only */}
      <CursorGlow />

      {/* Loader */}
      {!loaded && <LoadingScreen />}

      {/* Nav */}
      {loaded && <Navbar currentPage={currentPage} navigate={navigate} />}

      {/* Page */}
      {loaded && (
        <main
          id="page-scroll"
          className={`
            fixed inset-0 z-10 overflow-y-auto overflow-x-hidden page-scroll
            transition-all duration-[350ms]
            ${transitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}
          `}
        >
          <PageComponent navigate={navigate} />
        </main>
      )}

      {/* Bottom bar — hidden on small screens */}
      {loaded && <BottomBar />}
    </div>
  )
}

function CursorGlow() {
  return (
    <div
      id="cursor-glow"
      className="hidden md:block fixed w-80 h-80 rounded-full pointer-events-none z-[4]"
      style={{
        background: 'radial-gradient(circle, rgba(142,49,164,.07) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        left: '-999px', top: '-999px',
      }}
      ref={el => {
        if (!el) return
        const move = e => { el.style.left = e.clientX + 'px'; el.style.top = e.clientY + 'px' }
        document.addEventListener('mousemove', move)
      }}
    />
  )
}

function BottomBar() {
  return (
    <div className="hidden sm:flex fixed bottom-0 left-0 right-0 z-10 items-end justify-between px-6 sm:px-8 lg:px-12 pb-5 lg:pb-7 pointer-events-none">
      <div className="font-display text-[.48rem] tracking-[.12em] text-navy-pale/20 leading-loose">
        <div>RA 17h 45m 40s</div>
        <div>Dec −29° 00′ 28″</div>
      </div>
      <div className="flex flex-col items-end gap-[.35rem]">
        {['Twitter','Instagram','LinkedIn'].map(s => (
          <a key={s} href="#"
            className="font-body text-[.56rem] tracking-[.1em] text-navy-pale/22 no-underline hover:text-violet-light transition-colors pointer-events-auto">
            {s}
          </a>
        ))}
      </div>
    </div>
  )
}
