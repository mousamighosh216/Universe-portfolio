export default function SectionHeader({ eyebrow, title, sub, className = '' }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3 mb-3 sm:mb-4">
        <span className="w-6 sm:w-[30px] h-px bg-coral/50" />
        <span className="font-display text-[.5rem] sm:text-[.55rem] tracking-[.3em] sm:tracking-[.35em] uppercase text-coral">
          {eyebrow}
        </span>
      </div>
      <h2
        className="font-display font-black leading-none tracking-[.08em] sm:tracking-[.1em] text-white mb-4 sm:mb-6"
        style={{ fontSize: 'clamp(1.8rem, 5vw, 3.8rem)' }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {sub && (
        <p className="font-body text-[.82rem] sm:text-[.9rem] font-light tracking-[.04em] sm:tracking-[.06em] text-navy-pale/60 leading-loose max-w-xl">
          {sub}
        </p>
      )}
    </div>
  )
}
