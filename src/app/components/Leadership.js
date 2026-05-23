"use client"

import Image from "next/image"
import FadeInWhenVisible from "./FadeInWhenVisible"
import SectionHeading from "./SectionHeading"
import { useState } from "react"

export default function Leadership() {
  const slides = [
    {
      image: "/FromChangs.jpg",
      title: "IT Clash 2026",
      subtitle: "King Mongkut's University of Technology Ladkrabang",
      description:
        "Led our team through the IT Clash 2026 game track — coordinating roles, debugging under time pressure, and presenting our multiplayer prototype to judges. The experience sharpened my communication and technical leadership beyond solo coding.",
    },
    {
      image: "/comcamp22.JPG",
      title: "Comcamp 37",
      subtitle: "King Mongkut's University of Technology Thonburi",
      description:
        "Explored the intersection of C, AI, and Microcontrollers to build a rapid-response project focused on natural disaster themes. Developed a working prototype within a 6-hour time limit during Comcamp 37 at KMUTT 5D4N.",
    },
    {
      image: "/itcamp22.jpg",
      title: "IT camp 22",
      subtitle: "King Mongkut's University of Technology Ladkrabang",
      description:
        "Completed an intensive 4D3N Infrastructure program mastering both theory and practice in networking, including IP & Device management, Routing, and Network Configuration via Packet Tracer. Honored to be selected as one of the top 2 finalist teams in the Infrastructure track presentation.",
    },
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
      subtitle: "Faculty of Engineering, Chulalongkorn University • 2026",
      description:
        "Represented our team at the TMH finals — presenting Immune Knight, refining the pitch with mentors, and learning production workflows across Blender and Unity.",
    },
  ]

  const [index, setIndex] = useState(0)
  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const goNext = () => setIndex((i) => (i + 1) % slides.length)

  return (
    <section id="leadership" className="mx-auto max-w-6xl px-8 py-24">
      <FadeInWhenVisible>
        <SectionHeading
          eyebrow="Leadership"
          title="Leadership & Community Involvement"
          description="Competitions, camps, and presentations where I collaborated, led, and learned alongside peers."
        />
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
                sizes="(max-width: 1024px) 100vw, 40vw"
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

            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              {slides[index].description}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-700 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                aria-label="Previous slide"
                onClick={goPrev}
              >
                ←
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-700 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                aria-label="Next slide"
                onClick={goNext}
              >
                →
              </button>
              <div className="ml-2 flex items-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setIndex(i)}
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
