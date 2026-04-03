"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

export default function FadeInWhenVisible({
  children,
  className = "",
  delay = 0,
  y = 24,
}) {
  const [mounted, setMounted] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    queueMicrotask(() => setMounted(true))
  }, [])

  // Match SSR + first client paint; only animate when reduceMotion is explicitly false (not null)
  if (!mounted || reduce !== false) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
