import { useState, useEffect } from 'react'

/**
 * Returns the id of whichever section is currently most visible
 * in the viewport. Used by Navbar to highlight the active link.
 *
 * @param {string[]} ids - ordered list of section ids, e.g. ['home','about',...]
 */
export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observers = []

    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id)
      })
    }

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(callback, {
        // Section is "active" when its top 40% is within the viewport centre zone
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0,
      })
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [ids])

  return active
}
