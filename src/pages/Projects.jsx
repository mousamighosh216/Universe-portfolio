import { useState } from 'react'
import SectionHeader from '@components/SectionHeader'
import { projects } from '@data/projects'

const FILTERS = ['all', '3d',  'design']

const CAT_STYLES = {
  music:  { dot: 'bg-coral',        label: 'text-coral-light' },
  '3d':   { dot: 'bg-violet-light', label: 'text-violet-light' },
  design: { dot: 'bg-navy-pale',    label: 'text-navy-pale' },
}

const OVERLAY_COLORS = {
 '3d':   'bg-violet/25',
  design: 'bg-navy-pale/15',
}

export default function Projects() {
  const [active, setActive] = useState('all')
  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active)

  return (
    <div className="pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">

        <SectionHeader
          eyebrow="Selected work"
          title="Projects from<br/>the <em class='text-coral not-italic'>multiverse</em>"
        />

        {/* Filter bar */}
        <div className="flex gap-2 sm:gap-3 mt-8 sm:mt-10 mb-8 sm:mb-10 flex-wrap">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActive(f)}
              className={`font-display text-[.48rem] sm:text-[.52rem] tracking-[.16em] sm:tracking-[.18em] uppercase px-3 sm:px-4 py-[.35rem] sm:py-[.38rem] border transition-all duration-200
                ${active === f
                  ? 'border-violet text-violet-light bg-violet/10'
                  : 'border-navy-pale/12 text-navy-pale/60 hover:border-violet/40 hover:text-violet-pale'}`}>
              {f === 'all' ? 'All' : f === '3d' ? '3D Render' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid:
            mobile  → 1 col
            sm      → 2 col (featured = still 2 col / full width)
            lg      → 3 col (featured = span 2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </div>
  )
}

function ProjectCard({ project }) {
  const catStyle   = CAT_STYLES[project.category]
  const overlayCol = OVERLAY_COLORS[project.category]

  return (
    <div className={`
      project-card bg-navy/35 border border-navy-pale/12 overflow-hidden
      cursor-pointer transition-all duration-250 relative
      ${project.featured ? 'sm:col-span-2 lg:col-span-2' : ''}
    `}>
      {/* Thumbnail */}
      <div className="w-full aspect-video relative overflow-hidden">
        <div className={`w-full h-full ${project.gradient} flex items-center justify-center`}>
          <span className="font-display text-[.55rem] sm:text-[.6rem] tracking-[.18em] sm:tracking-[.2em] text-white/15 uppercase z-10 relative">
            {project.category}
          </span>
        </div>
        <div className={`overlay absolute inset-0 ${overlayCol} flex items-center justify-center`}>
          <div className="font-display text-[.52rem] sm:text-[.55rem] tracking-[.15em] sm:tracking-[.18em] border border-white/50 px-3 sm:px-4 py-2 text-white bg-navy-dark/60">
            View Project
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 sm:p-5">
        <div className={`flex items-center gap-2 mb-2 font-display text-[.44rem] sm:text-[.48rem] tracking-[.2em] sm:tracking-[.22em] uppercase ${catStyle.label}`}>
          <span className={`w-[5px] h-[5px] rounded-full ${catStyle.dot}`} />
          {project.category === '3d' ? '3D Render' : project.category.charAt(0).toUpperCase() + project.category.slice(1)}
        </div>
        <h3 className="font-body text-[.85rem] sm:text-[.88rem] font-bold tracking-[.04em] sm:tracking-[.05em] text-white mb-2">{project.title}</h3>
        <p className="font-body text-[.7rem] sm:text-[.72rem] font-light text-navy-pale/60 leading-relaxed">{project.desc}</p>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-navy-pale/10">
          <div className="flex gap-1.5 sm:gap-2 flex-wrap">
            {project.tags.map(tag => (
              <span key={tag} className="font-body text-[.52rem] sm:text-[.55rem] tracking-[.06em] sm:tracking-[.08em] px-1.5 sm:px-2 py-0.5 bg-navy-pale/7 text-navy-pale/60">
                {tag}
              </span>
            ))}
          </div>
          <span className="font-display text-[.48rem] sm:text-[.5rem] tracking-[.13em] sm:tracking-[.15em] text-navy-pale/35 flex-shrink-0 ml-2">{project.year}</span>
        </div>
      </div>
    </div>
  )
}
