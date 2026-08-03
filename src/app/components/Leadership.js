"use client"

import Image from "next/image"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import FadeInWhenVisible from "./FadeInWhenVisible"
import SectionHeading from "./SectionHeading"
import { useRef, useState } from "react"

export default function Leadership() {
  const photoRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start end", "end start"],
  })
  const photoY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"])

  const slides = [
    {
      image: "/FromChangs.jpg",
      title: "IT Clash 2026",
      subtitle: "King Mongkut's University of Technology Ladkrabang",
      description:
        "Led our team through the IT Clash 2026 game track — coordinating roles, debugging under time pressure, and presenting our multiplayer prototype to judges. The experience sharpened my communication and technical leadership beyond solo coding.",
      tag: "Game Dev",
    },
    {
      image: "/comcamp22.JPG",
      title: "Comcamp 37",
      subtitle: "King Mongkut's University of Technology Thonburi",
      description:
        "Explored the intersection of C, AI, and Microcontrollers to build a rapid-response project focused on natural disaster themes. Developed a working prototype within a 6-hour time limit during Comcamp 37 at KMUTT 5D4N.",
      tag: "AI & IoT",
    },
    {
      image: "/itcamp22.jpg",
      title: "IT camp 22",
      subtitle: "King Mongkut's University of Technology Ladkrabang",
      description:
        "Completed an intensive 4D3N Infrastructure program mastering both theory and practice in networking, including IP & Device management, Routing, and Network Configuration via Packet Tracer. Honored to be selected as one of the top 2 finalist teams in the Infrastructure track presentation.",
      tag: "Networking",
    },
    {
      image: "/present_MU.jpeg",
      title: "Super AI Track Innovation",
      subtitle: "Mahidol University • 2025",
      description:
        "I presented on building deep learning for image classification, covering practical workflow, model training, and evaluation considerations for real-world problems.",
      tag: "Deep Learning",
    },
    {
      image: "/workshop_CU_TMH.JPG",
      title: "TMH 24 Final Team",
      subtitle: "Faculty of Engineering, Chulalongkorn University • 2026",
      description:
        "Represented our team at the TMH finals — presenting Immune Knight, refining the pitch with mentors, and learning production workflows across Blender and Unity.",
      tag: "Game & 3D",
    },
  ]

  const [index, setIndex] = useState(0)
  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const goNext = () => setIndex((i) => (i + 1) % slides.length)
  const current = slides[index]

  return (
    <section id="leadership" className="mx-auto max-w-6xl px-8 py-24">
      <FadeInWhenVisible>
        <SectionHeading
          eyebrow="Leadership"
          title={
            <>
              Collabs & <span className="font-serif italic font-normal text-[#A2E435]">Involvement</span>
            </>
          }
          description="Competitions, camps, and presentations where I collaborated, led, and learned alongside peers."
        />
      </FadeInWhenVisible>

      <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* Image - Editorial border */}
        <FadeInWhenVisible className="lg:col-span-5">
          <div className="relative">
            <div ref={photoRef} className="relative overflow-hidden rounded-[32px] border border-[rgba(255,255,255,0.1)] bg-black/40">
              <div className="relative h-[280px] w-full">
                <motion.div
                  className="absolute inset-0"
                  style={reduce ? undefined : { y: photoY, scale: 1.12 }}
                >
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-all duration-500"
                  />
                </motion.div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#000000] to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="rounded-full bg-black border border-[rgba(255,255,255,0.15)] px-2.5 py-1 font-mono text-[9px] font-bold text-white uppercase tracking-wider">
                    {current.tag}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Content - Editorial Card */}
        <FadeInWhenVisible className="lg:col-span-7" delay={0.06}>
          <div className="rounded-[32px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] p-6 sm:p-8 flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#A2E435] font-mono text-xs text-[#A2E435]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-white">{current.title}</h3>
                <p className="mt-1 font-mono text-xs font-semibold text-[#A2E435]">{current.subtitle}</p>
              </div>
            </div>

            <p className="text-[0.9rem] leading-relaxed text-[rgba(255,255,255,0.75)]">{current.description}</p>

            {/* Slide controls */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] text-[rgba(255,255,255,0.75)] transition hover:border-[#A2E435] hover:text-white"
                aria-label="Previous slide"
                onClick={goPrev}
              >
                ←
              </button>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] text-[rgba(255,255,255,0.75)] transition hover:border-[#A2E435] hover:text-white"
                aria-label="Next slide"
                onClick={goNext}
              >
                →
              </button>

              {/* Minimal bar indicators */}
              <div className="ml-2 flex items-center gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === index
                        ? "h-1 w-5 bg-[#A2E435]"
                        : "h-1 w-1 bg-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.3)]"
                    }`}
                  />
                ))}
              </div>

              <span className="ml-auto font-mono text-[10px] text-[rgba(255,255,255,0.4)]">
                / {String(slides.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}
