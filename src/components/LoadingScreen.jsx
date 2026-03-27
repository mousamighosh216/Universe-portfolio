import { useState, useEffect } from 'react'

const MESSAGES = [
  'Mapping star coordinates…',
  'Generating spiral arms…',
  'Lighting nebulae…',
  'Calibrating parallax…',
  'Entering Kuniverse…',
]

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [msgIdx,   setMsgIdx]   = useState(0)
  const [fading,   setFading]   = useState(false)

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        const next = Math.min(p + Math.random() * 20, 100)
        const mi = Math.floor((next / 100) * MESSAGES.length)
        if (mi < MESSAGES.length) setMsgIdx(mi)
        if (next >= 100) {
          clearInterval(iv)
          setTimeout(() => { setFading(true); setTimeout(onComplete, 900) }, 400)
        }
        return next
      })
    }, 95)
    return () => clearInterval(iv)
  }, [onComplete])

  return (
    <div className={`
      fixed inset-0 z-[999] flex flex-col items-center justify-center bg-navy-dark
      transition-opacity duration-[900ms]
      ${fading ? 'opacity-0 pointer-events-none' : 'opacity-100'}
    `}>
      <div className="font-display font-black tracking-[.32em] sm:tracking-[.35em] text-white mb-8 sm:mb-10 animate-pulse-slow"
        style={{ fontSize: 'clamp(1.2rem, 5vw, 2rem)' }}>
        KUN<span className="text-coral">I</span>VERSE
      </div>

      <div className="w-[180px] sm:w-[220px] h-px bg-navy-pale/10 mb-3 overflow-hidden">
        <div className="h-full loader-fill transition-[width_.25s_ease]" style={{ width: `${progress}%` }} />
      </div>

      <div className="font-display text-[.54rem] sm:text-[.58rem] tracking-[.16em] sm:tracking-[.2em] text-navy-pale/40 transition-all duration-300 text-center px-8">
        {progress >= 100 ? 'Welcome.' : MESSAGES[msgIdx]}
      </div>
    </div>
  )
}
