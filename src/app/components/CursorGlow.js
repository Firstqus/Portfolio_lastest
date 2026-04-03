"use client"

import { useEffect, useState } from "react"

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const mqCoarse = window.matchMedia("(pointer: coarse)")
    if (mqReduce.matches || mqCoarse.matches) return

    queueMicrotask(() => {
      setEnabled(true)
    })
  }, [])

  useEffect(() => {
    if (!enabled) return

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          left: pos.x,
          top: pos.y,
          background:
            "radial-gradient(circle, rgba(var(--cursor-glow-rgb), 0.45) 0%, transparent 65%)",
        }}
      />
    </div>
  )
}
