"use client"

import Image from "next/image"
import FadeInWhenVisible from "./FadeInWhenVisible"
import { useState } from "react"

export default function Leadership() {
  const slides = [
    {
      image: "/present_MU.jpeg",
      title: "Super AI Track Innovation",
      subtitle: "Mahidol University • 2025",
      description:
        "I presented on building deep learning for image classification, covering practical workflow, model training, and evaluation considerations for real-world problems.",
    },
    {
      image: "/workshop_CU_TMH.JPG",
      title: "TMH 24 Final Team",
      subtitle: "at the Faculty of Engineering, Chulalongkorn University 2026",
      description:
        "Learn the basics of Blender and Unity, and recommend the Mangos website.",
    },
  ]

  // Simple in-component slider controlled by the existing arrows.
  // (No external carousel library needed for just 2 slides.)
  const [index, setIndex] = useState(0)
  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const goNext = () => setIndex((i) => (i + 1) % slides.length)

  return (
    <section
      id="achievements"
      className="mx-auto max-w-6xl px-8 py-24"
    >
      <FadeInWhenVisible>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
          Leadership &amp; Community Involvement
        </h2>
        <div className="mt-2 h-1 w-20 rounded bg-sky-500/30" />
      </FadeInWhenVisible>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center">
        <FadeInWhenVisible className="lg:col-span-5">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/60 dark:border-white/10 dark:bg-white/5">
            <div className="relative h-[320px] w-full">
              <Image
                src={slides[index].image}
                alt={slides[index].title}
                fill
                priority={index === 0}
                className="object-cover"
              />
            </div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible className="lg:col-span-7" delay={0.06}>
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                {slides[index].title}
              </h3>
              <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-300">
                {slides[index].subtitle}
              </p>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {slides[index].description}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-700 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                aria-label="Previous"
                onClick={goPrev}
              >
                ←
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-700 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                aria-label="Next"
                onClick={goNext}
              >
                →
              </button>
              <div className="ml-2 flex items-center gap-2">
                {slides.map((_, i) => (
                  <span
                    key={i}
                    className={
                      i === index
                        ? "h-2 w-7 rounded-full bg-sky-500/70 dark:bg-sky-400/70"
                        : "h-2 w-2 rounded-full bg-slate-300 dark:bg-white/20"
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}

