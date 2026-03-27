import SectionHeader from '@components/SectionHeader'
import { tracks, genres } from '@data/tracks'

const WAVE_COUNT = 52

export default function Music({ navigate }) {
  return (
    <div className="pt-40 pb-24">
      <div className="max-w-[1100px] mx-auto px-12">

        <SectionHeader
          eyebrow="Discography"
          title="Sound from<br/>the <em class='text-coral not-italic'>outer rim</em>"
          sub="Electronic, ambient, cinematic — music that moves through dimensions."
        />

        {/* ── Hero: waveform + genre list ── */}
        <div className="grid grid-cols-2 gap-16 items-center mt-16 mb-16">

          {/* Waveform visual */}
          <div className="h-[320px] bg-navy/40 border border-navy-pale/12 flex items-center justify-center overflow-hidden relative">
            <div className="flex items-center gap-[3px] px-8 h-full w-full">
              {Array.from({ length: WAVE_COUNT }).map((_, i) => {
                const h = 18 + Math.random() * 62
                return (
                  <div
                    key={i}
                    className="wave-bar flex-shrink-0"
                    style={{
                      height:              `${h}%`,
                      '--dur':             `${0.9 + Math.random() * 0.9}s`,
                      '--delay':           `${(i / WAVE_COUNT) * 1.4}s`,
                      animationDelay:      `${(i / WAVE_COUNT) * 1.4}s`,
                      animationDuration:   `${0.9 + Math.random() * 0.9}s`,
                    }}
                  />
                )
              })}
            </div>
          </div>

          {/* Genre list */}
          <div className="flex flex-col gap-3">
            {genres.map(g => (
              <div
                key={g.name}
                className="flex items-start gap-5 px-5 py-4 border border-navy-pale/12 bg-navy/30 hover:border-coral/30 hover:bg-coral/[.04] cursor-pointer transition-all duration-200"
              >
                <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${g.dot}`} />
                <div>
                  <div className="font-body text-[.82rem] font-medium tracking-[.06em] text-white">{g.name}</div>
                  <div className="font-body text-[.7rem] font-light text-navy-pale/60 mt-0.5">{g.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Track list ── */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-display text-[.55rem] tracking-[.25em] uppercase text-violet-light">Latest releases</span>
            <div className="flex-1 h-px bg-gradient-to-r from-violet-light/20 to-transparent" />
          </div>

          <div className="flex flex-col">
            {tracks.map((tr, i) => (
              <div key={tr.id} className="track-row flex items-center gap-5 px-4 py-4 border-b border-navy-pale/10 cursor-pointer hover:bg-violet/[.06] relative transition-colors">
                {/* Track number */}
                <span className="font-display text-[.55rem] text-navy-pale/30 w-5 text-right tracking-[.1em]">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Play button */}
                <div className="w-7 h-7 rounded-full border border-navy-pale/15 flex items-center justify-center flex-shrink-0 hover:border-coral/50 hover:bg-coral/10 transition-all">
                  <div className="w-0 h-0 ml-0.5 border-y-[5px] border-l-[9px] border-y-transparent border-l-navy-pale/60 group-hover:border-l-coral" />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="font-body text-[.82rem] font-medium tracking-[.04em] text-white">{tr.name}</div>
                  <div className="font-body text-[.65rem] font-light text-navy-pale/55 mt-0.5 tracking-[.06em]">
                    {tr.genre} · {tr.year}
                  </div>
                </div>

                <span className="font-display text-[.55rem] tracking-[.12em] text-navy-pale/40">{tr.dur}</span>

                {/* Bottom sweep bar */}
                <div className="track-bar" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Collab callout ── */}
        <div className="mt-16 p-8 border border-navy-pale/12 bg-violet/[.06] relative">
          <div
            className="absolute -top-2 left-5 font-display text-[.5rem] tracking-[.22em] uppercase text-violet-light bg-navy-dark px-3"
          >
            Available for collabs
          </div>
          <p className="font-body text-[.85rem] font-light text-violet-pale/70 leading-loose">
            Open to music collaborations, soundtrack commissions and sound design projects. Every creative universe
            benefits from unexpected collisions — let's make one.
          </p>
          <button
            onClick={() => navigate('contact')}
            className="inline-block mt-5 font-display text-[.58rem] tracking-[.18em] uppercase text-coral border border-coral/35 px-5 py-2 hover:bg-coral hover:text-white transition-all duration-200"
          >
            Get in touch →
          </button>
        </div>

      </div>
    </div>
  )
}
