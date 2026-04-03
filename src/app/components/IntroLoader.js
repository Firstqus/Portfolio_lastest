"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { INTRO_STORAGE_KEY } from "../constants/sections"

const MIN_MS = 900

export default function IntroLoader({ children }) {
  const [showLoader, setShowLoader] = useState(null)

  useEffect(() => {
    queueMicrotask(() => {
      if (localStorage.getItem(INTRO_STORAGE_KEY)) {
        setShowLoader(false)
      } else {
        setShowLoader(true)
      }
    })
  }, [])

  useEffect(() => {
    if (showLoader !== true) return
    const t = setTimeout(() => {
      localStorage.setItem(INTRO_STORAGE_KEY, "1")
      setShowLoader(false)
    }, MIN_MS)
    return () => clearTimeout(t)
  }, [showLoader])

  const contentVisible =
    showLoader === false
      ? "opacity-100 transition-opacity duration-500"
      : "opacity-0 pointer-events-none select-none"

  return (
    <>
      <div className={contentVisible}>{children}</div>

      {showLoader === null && (
        <div
          className="fixed inset-0 z-[200] bg-zinc-900"
          aria-busy="true"
          aria-label="Loading"
        />
      )}

      <AnimatePresence>
        {showLoader === true && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-zinc-900"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            aria-busy="true"
            aria-label="Welcome"
          >
            <motion.div
              className="h-10 w-10 rounded-full border-2 border-sky-500 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-sm tracking-wide text-zinc-400">Loading portfolio…</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
