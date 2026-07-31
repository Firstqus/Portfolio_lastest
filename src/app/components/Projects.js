"use client"

import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import FadeInWhenVisible from "./FadeInWhenVisible"
import SectionHeading from "./SectionHeading"

const SPIRIT_SLAYER_GALLERY = [
  "/start.jpg",
  "/ingame.jpg",
  "/before.jpg",
  "/died.jpg",
]

const STATION_4_GALLERY = ["/1 (2).jpg", "/2 (2).jpg", "/3 (2).jpg", "/4 (2).jpg"]

const IMMUNE_KNIGHT_GALLERY = [
  "/immune1.jpg",
  "/immune2.jpg",
  "/immune3.jpg",
  "/immune4.jpg",
]

const FROMCHANG_GALLERY = [
  "/FromChang1.jpg",
  "/FromChang2.jpg",
  "/FromChang3.jpg",
  "/FromChang4.jpg",
]

const projects = [
  {
    title: "Spirit Slayer",
    github: "https://patawee.itch.io/spirit-slayer-demo",
    gallery: SPIRIT_SLAYER_GALLERY,
    image: SPIRIT_SLAYER_GALLERY[0],
    imageFit: "cover",
    aspectClass: "aspect-[16/10]",
    tech: ["Unity", "C#", "Action"],
    description:
      "Play as Eren, a young orphan adopted and raised by the dojo’s leaders—mentor and father figures. After they are killed by the Spirit Realm, Eren seeks revenge for his family and fights through the five Spirit Realm leaders.",
  },
  {
    title: "Station 4",
    github: "https://github.com/Firstqus",
    gallery: STATION_4_GALLERY,
    image: STATION_4_GALLERY[0],
    imageFit: "cover",
    aspectClass: "aspect-[16/10]",
    tech: ["Unity", "C#", "Horror"],
    description:
      "You are a Park Ranger with a normal daily mission: check the radio station. But once you enter, you hear strange sounds and an unsettling atmosphere. With limited ammo, a flashlight, and a radio communicator that can detect a monster’s signal, you must find a way out—before the station consumes you.",
  },
  {
    title: "Immune Knight",
    github: "https://github.com/Firstqus/white-blood-cell-game",
    gallery: IMMUNE_KNIGHT_GALLERY,
    image: IMMUNE_KNIGHT_GALLERY[0],
    imageFit: "contain",
    aspectClass: "aspect-[4/5]",
    tech: ["Unity", "C#", "Game Design"],
    description:
      "Immune Knight is an educational tower defense game where players deploy real immune cells to fight off pathogens invading the body. Instead of just memorizing biology facts, players apply their knowledge in real time—making decisions under pressure the way your immune system actually does. Built as a submission for the TMH Innovation Competition, the game is designed to make immunology engaging, accurate, and interactive for students. That’s why we ranked top 24 teams in Thailand.",
  },
  {
    title: "FromChang",
    github: "https://nanil3as.itch.io/formchang67",
    gallery: FROMCHANG_GALLERY,
    image: FROMCHANG_GALLERY[0],
    imageFit: "cover",
    aspectClass: "aspect-[16/10]",
    tech: ["Unity", "C#", "Multiplayer"],
    description:
      "Gained hands-on experience with the Ragdoll physics system, team collaboration, and game debugging while developing 'FromChang', securing 3rd place among 12 finalist teams.",
  },
  {
    title: "AgriSpark AI",
    github: "https://agri-advisor-self.vercel.app",
    image: "/agriAdviser.jpg",
    imageFit: "cover",
    aspectClass: "aspect-[16/10]",
    tech: ["Next.js", "LLM API", "Weather API", "TailwindCSS"],
    description:
      "An AI-powered agricultural advisory chatbot developed for the AgriSpark Hackathon 2.0. It integrates real-time weather APIs with Large Language Models to provide customized recommendations for cassava care and pest management.",
  },
]

const LIME_TECH = new Set(["Unity", "Game Design", "Next.js"])

function ctaLabel(url) {
  if (url.includes("itch.io")) return "Play on itch.io"
  if (url.includes("vercel.app")) return "Launch App"
  return "View on GitHub"
}

function TechTags({ tech, className = "" }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tech.map((t) => (
        <span
          key={t}
          className={`rounded-full border px-3 py-0.5 font-mono text-[10px] ${
            LIME_TECH.has(t)
              ? "border-[rgba(162,228,53,0.25)] bg-[rgba(162,228,53,0.06)] text-[#A2E435]"
              : "border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] text-[rgba(255,255,255,0.6)]"
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  )
}

/** Cursor-following thumbnail, Nivora-style. Cycles the project gallery. */
function HoverPreview({ project, position }) {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    if (!project?.gallery?.length) return
    const t = setInterval(
      () => setSlide((i) => (i + 1) % project.gallery.length),
      1400
    )
    return () => clearInterval(t)
  }, [project])

  if (!project) return null

  const src = project.gallery?.length ? project.gallery[slide] : project.image

  return (
    <div
      className="project-preview hidden bg-black md:block"
      style={{ left: position.x, top: position.y }}
      aria-hidden
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="320px"
        className={project.imageFit === "contain" ? "object-contain p-4" : "object-cover"}
      />
    </div>
  )
}

function ProjectRow({ project, index, onEnter, onLeave }) {
  return (
    <a
      href={project.github}
      target="_blank"
      rel="noreferrer"
      className="project-row group px-2 py-8 sm:px-6"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[11px] text-[rgba(255,255,255,0.35)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="project-row-title headline-tight text-4xl sm:text-5xl md:text-6xl">
              {project.title}
            </h3>
          </div>

          <div className="mt-4 md:pl-10">
            <TechTags tech={project.tech} />
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[rgba(255,255,255,0.5)] line-clamp-2">
              {project.description}
            </p>
          </div>
        </div>

        {/* Mobile gets a static thumbnail since there is no hover */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.1)] bg-black md:hidden">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="100vw"
            className={project.imageFit === "contain" ? "object-contain p-4" : "object-cover"}
          />
        </div>

        <span className="project-row-cta shrink-0 whitespace-nowrap text-[11px] uppercase tracking-[0.12em] text-[#A2E435]">
          ↳ {ctaLabel(project.github)}
        </span>
      </div>
    </a>
  )
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const listRef = useRef(null)

  const visibleProjects = useMemo(
    () => (showAll ? projects : projects.slice(0, 4)),
    [showAll]
  )

  const onMouseMove = (e) => {
    setPos({ x: e.clientX, y: e.clientY })
  }

  return (
    <section id="projects" className="mx-auto max-w-6xl px-8 py-24">
      <FadeInWhenVisible>
        <SectionHeading
          eyebrow="Featured Projects"
          title={
            <>
              Selected <span className="font-serif font-normal italic text-[#A2E435]">Works</span>
            </>
          }
        />
      </FadeInWhenVisible>

      <div ref={listRef} className="mt-14" onMouseMove={onMouseMove}>
        {visibleProjects.map((project, idx) => (
          <FadeInWhenVisible key={project.title} delay={idx * 0.05}>
            <ProjectRow
              project={project}
              index={idx}
              onEnter={() => setHovered(project)}
              onLeave={() => setHovered(null)}
            />
          </FadeInWhenVisible>
        ))}
      </div>

      {/* keyed so a new project remounts the preview at its first frame */}
      <HoverPreview key={hovered?.title ?? "none"} project={hovered} position={pos} />

      {projects.length > 4 && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="btn-outline-glow inline-flex items-center gap-2 px-7 py-3 text-sm"
          >
            <span>{showAll ? "Show Less" : "View More Projects"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-4 w-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
              aria-hidden
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}
