import { useEffect } from 'react'

/**
 * Observes all elements with class "reveal" inside the given ref
 * and adds "visible" when they enter the viewport.
 * Call this once at the App level so it covers all sections.
 */
export default function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            obs.unobserve(e.target) // animate once
          }
        })
      },
      { threshold: 0.12 }
    )

    // Observe everything currently in the DOM, then watch for new nodes
    const attach = () =>
      document.querySelectorAll('.reveal').forEach(el => obs.observe(el))

    attach()

    // MutationObserver so dynamically rendered sections are also caught
    const mo = new MutationObserver(attach)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => { obs.disconnect(); mo.disconnect() }
  }, [])
}
