"use client"

import { useEffect, useRef, useState } from "react"

const MAX_PARTICLES = 90
const LINK_DISTANCE = 140
const CURSOR_RADIUS = 160

export default function ParticleNetwork() {
  const canvasRef = useRef(null)
  // null until the media query resolves on the client — render the static
  // fallback grid until then so we never flash the canvas in for reduced-motion users.
  const [reduceMotion, setReduceMotion] = useState(null)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    queueMicrotask(() => setReduceMotion(mq.matches))
    const onChange = (e) => setReduceMotion(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (reduceMotion !== false) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches
    const pointer = { x: -9999, y: -9999, active: false }

    let width = 0
    let height = 0
    let particles = []
    let rafId = null
    let running = true
    let resizeTimer = null

    function distToPointer(p) {
      const dx = p.x - pointer.x
      const dy = p.y - pointer.y
      return Math.sqrt(dx * dx + dy * dy)
    }

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(MAX_PARTICLES, Math.floor((width * height) / 18000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.2 + 0.6,
      }))
    }

    function onResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 150)
    }

    function onPointerMove(e) {
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.active = true
    }

    function onPointerLeave() {
      pointer.active = false
    }

    function step() {
      if (!running) return
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < LINK_DISTANCE) {
            const near =
              pointer.active &&
              (distToPointer(a) < CURSOR_RADIUS || distToPointer(b) < CURSOR_RADIUS)
            const alpha = (1 - dist / LINK_DISTANCE) * (near ? 0.35 : 0.12)
            ctx.strokeStyle = near
              ? `rgba(162, 228, 53, ${alpha})`
              : `rgba(255, 255, 255, ${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        const near = pointer.active && distToPointer(p) < CURSOR_RADIUS
        ctx.fillStyle = near ? "rgba(162, 228, 53, 0.55)" : "rgba(255, 255, 255, 0.3)"
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      rafId = requestAnimationFrame(step)
    }

    function onVisibilityChange() {
      if (document.hidden) {
        running = false
        if (rafId) cancelAnimationFrame(rafId)
      } else if (!running) {
        running = true
        rafId = requestAnimationFrame(step)
      }
    }

    resize()
    rafId = requestAnimationFrame(step)

    window.addEventListener("resize", onResize)
    document.addEventListener("visibilitychange", onVisibilityChange)
    if (!isCoarsePointer) {
      window.addEventListener("mousemove", onPointerMove, { passive: true })
      window.addEventListener("mouseleave", onPointerLeave)
    }

    return () => {
      running = false
      if (rafId) cancelAnimationFrame(rafId)
      clearTimeout(resizeTimer)
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      window.removeEventListener("mousemove", onPointerMove)
      window.removeEventListener("mouseleave", onPointerLeave)
    }
  }, [reduceMotion])

  if (reduceMotion !== false) {
    return <div className="bg-network" aria-hidden />
  }

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden />
}
