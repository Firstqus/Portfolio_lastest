"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import FadeInWhenVisible from "./FadeInWhenVisible"

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
    tech: ["Unity", "C#", "Action"],
    description:
      "Play as Eren, a young orphan adopted and raised by the dojo’s leaders—mentor and father figures. After they are killed by the Spirit Realm, Eren seeks revenge for his family and fights through the five Spirit Realm leaders.",
  },
  {
    title: "Station 4",
    github: "https://github.com/Firstqus",
    gallery: STATION_4_GALLERY,
    image: STATION_4_GALLERY[0],
    tech: ["Unity", "C#", "Horror"],
    description:
      "You are a Park Ranger with a normal daily mission: check the radio station. But once you enter, you hear strange sounds and an unsettling atmosphere. With limited ammo, a flashlight, and a radio communicator that can detect a monster’s signal, you must find a way out—before the station consumes you.",
  },
  {
    title: "Immune Knight",
    github: "https://github.com/Firstqus/white-blood-cell-game",
    gallery: IMMUNE_KNIGHT_GALLERY,
    image: IMMUNE_KNIGHT_GALLERY[0],
    tech: ["Unity", "C#", "Game Design"],
    description:
      "Immune Knight is an educational tower defense game where players deploy real immune cells to fight off pathogens invading the body. Instead of just memorizing biology facts, players apply their knowledge in real time—making decisions under pressure the way your immune system actually does. Built as a submission for the TMH Innovation Competition, the game is designed to make immunology engaging, accurate, and interactive for students. That’s why we ranked top 24 teams in Thailand.",
  },
  {
    title: "FromChang",
    github: "https://nanil3as.itch.io/formchang67",
    gallery: FROMCHANG_GALLERY,
    image: FROMCHANG_GALLERY[0],
    tech: ["Unity", "C#", "Multiplayer"],
    description:
      "Gained hands-on experience with the Ragdoll physics system, team collaboration, and game debugging while developing 'FromChang', securing 3rd place among 12 finalist teams.",
  },
  {
    title: "AgriSpark AI",
    github: "https://agri-advisor-self.vercel.app",
    image: "/agriAdviser.jpg",
    tech: ["Next.js", "LLM API", "Weather API", "TailwindCSS"],
    description:
      "An AI-powered agricultural advisory chatbot developed for the AgriSpark Hackathon 2.0. It integrates real-time weather APIs with Large Language Models to provide customized recommendations for cassava care and pest management.",
  },
]

function ProjectCard({ project, idx }) {
  const [slideIndex, setSlideIndex] = useState(0)
  const hasGallery = project.gallery && project.gallery.length > 0

  useEffect(() => {
    if (!hasGallery) return
    const t = setInterval(() => {
      setSlideIndex((i) => (i + 1) % project.gallery.length)
    }, 2500)
    return () => clearInterval(t)
  }, [hasGallery, project.gallery])

  const imageSrc = hasGallery ? project.gallery[slideIndex] : project.image

  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200/70 bg-white/60 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-sky-500/40 dark:border-white/10 dark:bg-white/5">
      <div
        className={[
          "relative overflow-hidden bg-slate-50 dark:bg-white/5",
          idx === 2 ? "aspect-[4/5]" : "aspect-[16/10]",
        ].join(" ")}
      >
        <Image
          src={imageSrc}
          alt={project.title}
          fill
          className={
            idx !== 2
              ? "object-cover p-0"
              : "object-contain p-6"
          }
        />

        <div className="absolute inset-0 bg-sky-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex flex-wrap justify-center gap-2 px-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-sky-500/35 bg-sky-500/15 px-3 py-1 text-xs font-medium text-indigo-100 backdrop-blur dark:text-indigo-50"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
          {project.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {project.description}
        </p>

        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:border-sky-500/60 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-50"
        >
          <span>
            {project.github.includes("itch.io")
              ? "Play on itch.io"
              : project.github.includes("vercel.app")
                ? "Launch App"
                : "View on GitHub"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M9 18l-6 3 3-6 13-13a2 2 0 0 1 3 3L9 18z" />
            <path d="M15 6l3 3" />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false)
  const visibleProjects = showAll ? projects : projects.slice(0, 4)

  return (
    <section id="projects" className="mx-auto max-w-6xl px-8 py-24">
      <FadeInWhenVisible>
        <div className="text-left">
          <p className="text-sm font-semibold tracking-widest text-sky-600 dark:text-sky-300">
            FEATURED PROJECTS
          </p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            A selection of projects where I build and ship.
          </h2>
        </div>
      </FadeInWhenVisible>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {visibleProjects.map((project, idx) => (
          <FadeInWhenVisible key={project.title} delay={idx * 0.06}>
            <ProjectCard project={project} idx={idx} />
          </FadeInWhenVisible>
        ))}
      </div>

      {projects.length > 4 && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-6 py-3 text-sm font-semibold text-sky-600 transition hover:bg-sky-500/20 dark:text-sky-300 dark:hover:bg-sky-500/20"
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
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}
