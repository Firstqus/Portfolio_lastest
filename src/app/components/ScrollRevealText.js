"use client"

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { useRef } from "react"

/**
 * Nivora's signature intro paragraph: the copy sits dim and fills in word by
 * word as the block scrolls through the viewport.
 */
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <motion.span className="reveal-word" style={{ opacity }}>
      {children}
    </motion.span>
  )
}

export default function ScrollRevealText({ children, className = "" }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  })

  const words = String(children).split(" ")

  if (reduce) {
    return (
      <p ref={ref} className={className}>
        {children}
      </p>
    )
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = (i + 1) / words.length
        return (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
            {i === words.length - 1 ? word : `${word} `}
          </Word>
        )
      })}
    </p>
  )
}
