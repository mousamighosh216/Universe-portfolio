export default function Home({ scrollTo }) {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 sm:px-8">

      <p className="rounded-xl backdrop-blur-sm font-body text-[.55rem] sm:text-[.6rem] font-medium tracking-[.3em] sm:tracking-[.42em] uppercase text-gray-pale/50 mb-5 sm:mb-6 animate-fade-up">
        Multi-dimensional creator
      </p>

      <h1
        className="font-display font-black tracking-[.14em] sm:tracking-[.18em] uppercase text-white leading-none animate-fade-up"
        style={{
          fontSize: 'clamp(2.8rem, 11vw, 9.5rem)',
          animationDelay: '.15s',
          textShadow: '0 0 80px rgba(142,49,164,.38), 0 0 160px rgba(142,49,164,.14)',
        }}
      >
        KUN<span className="text-coral">I</span>VERSE
      </h1>

      <div className="flex items-center gap-3 sm:gap-4 my-6 sm:my-9 animate-fade-up" style={{ animationDelay: '.3s' }}>
        <div className="w-10 sm:w-14 h-px bg-gradient-to-r from-transparent to-navy-pale/30" />
        <div className="w-1 h-1 rounded-full bg-coral opacity-70" />
        <div className="w-10 sm:w-14 h-px bg-gradient-to-l from-transparent to-navy-pale/30" />
      </div>

      <p
        className="font-body rounded-xl backdrop-blur-sm text-shadow text-[.8rem] sm:text-[.9rem] font-medium tracking-[.08em] sm:tracking-[.12em] text-white max-w-[300px] sm:max-w-sm leading-loose animate-fade-up"
        style={{ animationDelay: '.45s' }}
      >
        Where three-dimensional space and visual design converge into one creative universe
      </p>

      {/* Tag pills */}
      <div className="flex gap-2  sm:gap-3 mt-7 sm:mt-9 flex-wrap justify-center animate-fade-up" style={{ animationDelay: '.6s' }}>
        {[
          { label: '3D Render',page: 'projects', cls: 'text-white border-violet hover:bg-violet/10' },
          { label: 'Design',   page: 'projects', cls: 'text-white border-navy-pale hover:bg-navy-pale/10' },
        ].map(({ label, page, cls }) => (
          <button key={label} onClick={() => navigate(page)}
            className={`font-display rounded-xl backdrop-blur-sm text-[.46rem] sm:text-[.5rem] tracking-[.16em] sm:tracking-[.18em] uppercase border px-3 sm:px-[.9rem] py-[.3rem] sm:py-[.33rem] transition-all duration-250 ${cls}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-display rounded-xl backdrop-blur-sm text-[.48rem] sm:text-[.52rem] tracking-[.2em] sm:tracking-[.22em] uppercase text-gray-300 hover:text-white">Explore</span>
        <div className="scroll-line bg-white" />
      </div>
    </section>
  )
}
