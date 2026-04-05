import SectionHeader from '@components/SectionHeader'

const SKILLS = [
  { cat: '3D & Motion',      items: ['Blender', 'Cinema 4D', 'Substance Painter', 'After Effects', 'Unreal Engine', 'Houdini'] },
  { cat: 'Graphic Design',   items: ['Figma', 'Illustrator', 'Photoshop', 'InDesign', 'Branding', 'Typography'] },
]

const TIMELINE = [
  { year: '2024', title: 'Independent Creative Studio', desc: 'Launched Kuniverse as a full-service creative studio — music, visuals, identity.' },
  { year: '2022', title: '3D Visualisation Lead',       desc: 'Led visual direction for multiple brand campaigns and music video productions.' },
  { year: '2021', title: 'First EP Released',            desc: 'Debuted original music across streaming platforms — ambient electronic with live instrumentation.' },
  { year: '2019', title: 'The Beginning',                desc: 'Started exploring the overlap between music, space and design. The universe opened up.' },
]

export default function About() {
  return (
    <div id="about" className="pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12">

        <SectionHeader
          eyebrow="About me"
          title="Exploring the<br/><em class='text-coral not-italic'>creative cosmos</em>"
          sub="I exist at the intersection of sound, dimension and design — building worlds that feel as infinite as the universe itself."
        />

        {/* Two-col on lg+, stacked below */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-20 mt-12 lg:mt-16 items-start">

          {/* ── Photo + stats ── */}
          <div className="reveal reveal-delay-2 max-w-sm mx-auto w-full lg:max-w-none">
            <div className="relative">
              {/* On mobile shrink to 3:4, full 4:5 on desktop */}
              <div className="w-full aspect-[3/4] sm:aspect-[4/5] bg-navy border border-navy-pale/12 overflow-hidden relative">
                <div className="w-full h-full bg-gradient-to-br from-navy-mid via-violet-dark to-navy-dark flex items-center justify-center">
                  <span className="font-display text-[.6rem] tracking-[.2em] text-navy-pale/30">[ CLIENT PHOTO ]</span>
                </div>
              </div>
              {/* Corner brackets */}
              {[['top-[-5px] left-[-5px]', 'border-t-2 border-l-2'],
                ['top-[-5px] right-[-5px]', 'border-t-2 border-r-2'],
                ['bottom-[-5px] left-[-5px]', 'border-b-2 border-l-2'],
                ['bottom-[-5px] right-[-5px]', 'border-b-2 border-r-2']].map(([pos, border], i) => (
                <div key={i} className={`absolute w-4 h-4 border-coral/70 ${pos} ${border}`} />
              ))}
              <div className="absolute bottom-0 left-0 right-0 bg-navy/90 border-t border-navy-pale/12 px-4 py-2 flex justify-between items-center">
                <span className="font-display text-[.52rem] tracking-[.18em] text-violet-light">KUNIVERSE</span>
                <span className="font-display text-[.52rem] tracking-[.12em] text-coral">Est. 2019</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 sm:mt-5">
              {[['50+','Projects'],['5+','Years'],['3','Disciplines']].map(([num, label]) => (
                <div key={label} className="bg-navy/50 border border-navy-pale/12 p-3 sm:p-4 text-center">
                  <div className="font-display font-black text-xl sm:text-2xl text-coral">{num}</div>
                  <div className="font-body text-[.55rem] sm:text-[.6rem] tracking-[.12em] sm:tracking-[.14em] uppercase text-navy-pale/60 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Bio + skills + timeline ── */}
          <div>
            <p className="font-body text-[.85rem] sm:text-[.9rem] font-bold leading-loose text-white/80 mb-4">
              A multi-disciplinary creator orbiting the edges of 3D rendering and graphic design.
              Every project is a new galaxy — unexplored, infinite and entirely its own.
            </p>
            <p className="font-body text-[.85rem] sm:text-[.9rem] font-bold leading-loose text-white/80">
              Based in the physical world, working across every dimension. From a single guitar riff to a full
              motion-graphic universe — if it can be imagined, it gets built.
            </p>

            {/* Skills */}
            <div className="mt-8 sm:mt-10">
              {SKILLS.map(({ cat, items }) => (
                <div key={cat} className="mb-6 sm:mb-7">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-display font-bold text-[.52rem] sm:text-[.55rem] tracking-[.2em] sm:tracking-[.22em] uppercase text-coral">{cat}</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-violet-light/20 to-transparent" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map(item => (
                      <span key={item}
                        className="font-body text-[.65rem] sm:text-[.68rem] font-medium tracking-[.06em] sm:tracking-[.08em] px-2.5 sm:px-3 py-1 border border-navy-pale/12 text-navy-pale/75 hover:border-violet/40 hover:text-white hover:bg-violet/[.06] transition-all cursor-default">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="mt-10 sm:mt-12 border-l border-navy-pale/15 pl-6 sm:pl-8">
              {TIMELINE.map(({ year, title, desc }) => (
                <div key={year} className="relative mb-7 sm:mb-9 timeline-dot">
                  <div className="font-display text-[.52rem] sm:text-[.55rem] tracking-[.18em] sm:tracking-[.2em] text-coral mb-1">{year}</div>
                  <div className="font-body text-[.82rem] sm:text-[.85rem] font-bold tracking-[.04em] sm:tracking-[.05em] text-white">{title}</div>
                  <div className="font-body text-[.72rem] sm:text-[.75rem] font-light text-gray/60 mt-1 leading-loose">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
