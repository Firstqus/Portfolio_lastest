import { useState, useMemo, useRef, useEffect } from "react"
import Image from "next/image"
import FadeInWhenVisible from "./FadeInWhenVisible"
import SectionHeading from "./SectionHeading"
import { motion, useReducedMotion } from "framer-motion"

const achievements = [
  {
    title: "Game Development Achievement",
    issuer: "Kanchanapisek Wittayalai Nakhon Pathom School",
    date: "2025",
    image: "/Ref.png",
    category: "Game",
  },
  {
    title: "Game Project Certification",
    issuer: "Kanchanapisek Wittayalai Nakhon Pathom School",
    date: "2026",
    image: "/cer.png",
    category: "Game",
  },
  {
    title: "TMH Game Award",
    issuer: "Thailand Medical Hub (TMH)",
    date: "2025",
    image: "/TMH_cer.jpg",
    category: "Game",
  },
  {
    title: "IT clash Multimedia 2026",
    issuer: "King Mongkut's Institute of Technology Ladkrabang",
    date: "2026",
    image: "/IT Clash 2026 Multimedia.jpg",
    category: "Game",
  },
  {
    title: "C++ Programming Model",
    issuer: "Kanchanapisek Wittayalai Nakhon Pathom School",
    date: "2025",
    image: "/c++_model.jpg",
    category: "Programming",
  },
  {
    title: "IT Clash Competition",
    issuer: "King Mongkut's Institute of Technology Ladkrabang",
    date: "2025",
    image: "/ITclash.png",
    category: "Programming",
  },
  {
    title: "TobeIT Achievement",
    issuer: "TobeIT",
    date: "2025",
    image: "/tobeIT.jpg",
    category: "Programming",
  },
  {
    title: "Web Development Review",
    issuer: "Kanchanapisek Wittayalai Nakhon Pathom School",
    date: "2025",
    image: "/game-review.jpg",
    category: "Web",
  },
  {
    title: "AgriAdviser Project",
    issuer: "AgriSpark Hackathon 2.0",
    date: "2026",
    image: "/agriAdviser.jpg",
    category: "Web",
  },
  {
    title: "IOT Research Project",
    issuer: "Kanchanapisek Wittayalai Nakhon Pathom School",
    date: "2025",
    image: "/reseach_IOT.jpg",
    category: "IOT",
  },
  {
    title: "AIAT AI Specialist",
    issuer: "AIAT (Artificial Intelligence Association of Thailand)",
    date: "2025",
    image: "/AIAT.jpg",
    category: "AI",
  },
  {
    title: "Innovator Award",
    issuer: "National Innovation Agency",
    date: "2025",
    image: "/INNOVATOR_1.jpg",
    category: "AI",
  },
  {
    title: "PSU AI Prompt Challenge",
    issuer: "Prince of Songkla University",
    date: "2025",
    image: "/PSU_Ai_Prompt.jpg",
    category: "AI",
  },
  {
    title: "Agispark AI Hackathon",
    issuer: "AgriSpark Hackathon 2.0",
    date: "2026",
    image: "/Agispark.jpg",
    category: "AI",
  },
  {
    title: "Comcamp Certificate",
    issuer: "King Mongkut's University of Technology Thonburi",
    date: "2025",
    image: "/comcamp_cer.jpg",
    category: "Camp",
  },
  {
    title: "IT Camp 22 Certificate",
    issuer: "King Mongkut's Institute of Technology Ladkrabang",
    date: "2025",
    image: "/ITcamp22_cer.jpg",
    category: "Camp",
  },
  {
    title: "MUIC Excel Certification",
    issuer: "Mahidol University International College",
    date: "2024",
    image: "/MUIC Excel.png",
    category: "Other",
  },
]

const categories = ["All", ...new Set(achievements.map((a) => a.category))]

export default function Achievements() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedIdx, setSelectedIdx] = useState(null)

  const filtered = useMemo(() => {
    return achievements.filter((a) => {
      const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.issuer.toLowerCase().includes(search.toLowerCase())
      const matchCategory = activeCategory === "All" || a.category === activeCategory
      return matchSearch && matchCategory
    })
  }, [search, activeCategory])

  const isFiltering = search !== "" || activeCategory !== "All"

  // Split items for two rows
  const midPoint = Math.ceil(filtered.length / 2)
  const firstRow = filtered.slice(0, midPoint)
  const secondRow = filtered.slice(midPoint)

  const handleSelect = (item) => {
    const idx = filtered.findIndex((x) => x.title === item.title)
    if (idx !== -1) {
      setSelectedIdx(idx)
    }
  }

  return (
    <section id="achievements" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <FadeInWhenVisible>
            <SectionHeading
              align="center"
              eyebrow="Achievements"
              title={
                <>
                  My <span className="font-serif italic font-normal text-[#A2E435]">Achievements</span>
                </>
              }
              description="A collection of certificates and awards reflecting my continuous learning and growth."
            />
          </FadeInWhenVisible>

          {/* Search & Filter UI */}
          <FadeInWhenVisible delay={0.1} className="mt-10 w-full max-w-3xl">
            <div className="flex flex-col gap-6">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search certificates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-6 py-3.5 pl-12 text-sm text-white outline-none transition-all focus:border-[#A2E435] placeholder-[rgba(255,255,255,0.4)]"
                />
                <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[rgba(255,255,255,0.4)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${activeCategory === cat
                      ? "bg-[#A2E435] text-black shadow-sm"
                      : "border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] text-[rgba(255,255,255,0.75)] hover:border-[rgba(255,255,255,0.2)] hover:text-white"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative mt-4">
        {isFiltering ? (
          /* Grid View when filtering */
          <div className="mx-auto max-w-7xl px-8">
            {filtered.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((item, idx) => (
                  <AchievementCard key={idx} item={item} variant="grid" onSelect={() => handleSelect(item)} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center text-[rgba(255,255,255,0.4)] font-mono text-xs uppercase tracking-wider">
                No certificates found matching your search.
              </div>
            )}
          </div>
        ) : (
          /* Two-Row Infinite Marquee View by default */
          <div className="flex flex-col gap-8 py-10">
            <MarqueeRow items={firstRow} direction="left" speed={50} onSelect={handleSelect} />
            <MarqueeRow items={secondRow} direction="right" speed={55} onSelect={handleSelect} />
          </div>
        )}
      </div>

      {/* Certificate Modal Lightbox */}
      {selectedIdx !== null && filtered[selectedIdx] && (
        <CertificateModal
          item={filtered[selectedIdx]}
          onClose={() => setSelectedIdx(null)}
          onPrev={() => setSelectedIdx((selectedIdx - 1 + filtered.length) % filtered.length)}
          onNext={() => setSelectedIdx((selectedIdx + 1) % filtered.length)}
        />
      )}
    </section>
  )
}


function MarqueeRow({ items, direction = "left", speed = 50, onSelect }) {
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const doubledItems = [...items, ...items, ...items]
  const shouldAnimate = reduceMotion !== true && !paused

  return (
    <div
      className="flex overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="marquee-track flex gap-6 pr-6"
        animate={
          shouldAnimate
            ? {
                x: direction === "left" ? ["0%", "-33.33%"] : ["-33.33%", "0%"],
              }
            : false
        }
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ width: "fit-content" }}
      >
        {doubledItems.map((item, idx) => (
          <div key={idx} className="w-[280px] flex-shrink-0">
            <AchievementCard item={item} onSelect={() => onSelect(item)} />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function AchievementCard({ item, onSelect, variant = "marquee" }) {
  return (
    <div
      onClick={onSelect}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] transition-colors duration-300 hover:border-[#A2E435]"
    >
      {/* Grid view leans toward Nivora's near-square product-gallery tiles */}
      <div className={`relative overflow-hidden bg-black/25 ${variant === "grid" ? "aspect-[5/4]" : "aspect-[4/3]"}`}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="280px"
          className="object-cover transition-transform duration-500 group-hover:scale-102"
        />
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <span className="rounded-full bg-black border border-[rgba(255,255,255,0.12)] px-2 py-0.5 text-[9px] font-mono font-bold text-[#A2E435] uppercase tracking-wider">
            {item.category}
          </span>
          <span className="rounded-full bg-black border border-[rgba(255,255,255,0.12)] px-2 py-0.5 text-[9px] font-mono font-bold text-white uppercase tracking-wider">
            {item.date}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[1px]">
          <button className="rounded-full border border-[#A2E435] bg-[#A2E435] text-black px-4 py-2 text-[11px] font-bold uppercase tracking-wider transform translate-y-3 transition-all duration-300 group-hover:translate-y-0 hover:scale-105">
            Quick View
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-sm font-bold text-white line-clamp-1 group-hover:text-[#A2E435] transition-colors">
          {item.title}
        </h3>
        <p className="mt-1 text-[10px] text-[rgba(255,255,255,0.75)]">
          {item.issuer}
        </p>
      </div>
    </div>
  )
}

function CertificateModal({ item, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose, onPrev, onNext])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-4 rounded-[32px] border border-[rgba(255,255,255,0.1)] bg-[#000000] p-6 shadow-2xl backdrop-blur-xl md:p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] bg-black/60 text-white transition hover:bg-black active:scale-95"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Content Area with Arrows */}
        <div className="relative flex w-full items-center justify-center">
          {/* Prev Arrow */}
          <button
            onClick={onPrev}
            className="absolute left-2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] bg-black/60 text-white shadow-lg transition hover:bg-black active:scale-95 sm:-left-4 md:-left-6"
            aria-label="Previous certificate"
          >
            ←
          </button>

          {/* Certificate Image Container */}
          <div className="relative aspect-[4/3] w-full max-w-[580px] overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.1)] bg-black/40">
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority
              className="object-contain"
            />
          </div>

          {/* Next Arrow */}
          <button
            onClick={onNext}
            className="absolute right-2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] bg-black/60 text-white shadow-lg transition hover:bg-black active:scale-95 sm:-right-4 md:-right-6"
            aria-label="Next certificate"
          >
            →
          </button>
        </div>

        {/* Info */}
        <div className="text-center text-white mt-2 max-w-xl">
          <h3 className="font-display text-base font-bold sm:text-lg">{item.title}</h3>
          <p className="text-xs text-[rgba(255,255,255,0.75)] mt-1 sm:text-sm">{item.issuer} • {item.date}</p>
          <span className="mt-2.5 inline-block rounded-full bg-[rgba(162,228,53,0.08)] border border-[rgba(162,228,53,0.2)] px-3 py-0.5 text-[9px] font-mono font-bold text-[#A2E435] uppercase tracking-wider">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  )
}


