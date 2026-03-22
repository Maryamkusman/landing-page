import { useEffect, useRef, useState } from 'react'

export function useStatCounter(target: number, suffix: string) {
  const [display, setDisplay] = useState(`0${suffix}`)
  const ref = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true
            const isDecimal = target % 1 !== 0
            const duration = 1500
            const start = performance.now()

            function animate(now: number) {
              const elapsed = now - start
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              const current = eased * target

              setDisplay(
                (isDecimal ? current.toFixed(1) : Math.round(current).toString()) + suffix
              )

              if (progress < 1) requestAnimationFrame(animate)
            }

            requestAnimationFrame(animate)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix])

  return { ref, display }
}
