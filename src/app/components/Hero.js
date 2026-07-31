"use client"

import FadeInWhenVisible from "./FadeInWhenVisible"
import { HERO_SUMMARY, SOCIAL_LINKS } from "../constants/social"
import { TypeAnimation } from "react-type-animation"
import SocialIcon from "./SocialIcon"

const QUOTE = "A wise man learns from the mistakes of others."
const AUTHOR = "Zhuge Liang"

const ROLES = [
  "interactive games.",
  1200,
  "modern web apps.",
  1200,
  "Unity simulators.",
  1200,
  "creative code.",
  1200,
]

export default function Hero() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-32 text-center">
      <FadeInWhenVisible y={30}>
        <div className="flex flex-col items-center gap-7">

          {/* Status Badge */}
          <span className="status-badge">
            <span className="status-dot" aria-hidden />
            Available for worldwide freelance
          </span>

          {/* Supporting line above the headline */}
          <div className="flex flex-col items-center gap-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[rgba(255,255,255,0.4)]">
              Interactive Developer Portfolio
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-lg text-[rgba(255,255,255,0.5)] md:text-xl">
              <span>Creative</span>
              <span className="font-serif italic text-white">developer</span>
              <span>crafting</span>
              <TypeAnimation
                sequence={ROLES}
                wrapper="span"
                speed={48}
                repeat={Infinity}
                className="font-mono text-sm text-[#A2E435]"
              />
            </div>
          </div>

          {/* Oversized headline */}
          <h1 className="font-display headline-tight text-6xl font-medium text-white sm:text-7xl md:text-8xl lg:text-[7rem]">
            Patawee{" "}
            <span className="font-serif font-normal italic text-[#A2E435]">Kimhia</span>
          </h1>

          {/* Summary */}
          <p className="max-w-2xl text-base leading-relaxed text-[rgba(255,255,255,0.5)]">
            {HERO_SUMMARY}
          </p>

          {/* CTA Buttons */}
          <div className="mt-1 flex flex-wrap justify-center gap-3">
            <a
              href="#projects"
              className="btn-glow inline-flex h-12 items-center justify-center px-7 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-2 h-4 w-4" aria-hidden>
                <path d="M3.75 3A1.75 1.75 0 002 4.75v3.26a3.235 3.235 0 011.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0016.25 5h-4.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H3.75zM2 11.75v3.5C2 16.216 2.784 17 3.75 17h12.5A1.75 1.75 0 0018 15.25v-3.5A1.75 1.75 0 0016.25 10H3.75A1.75 1.75 0 002 11.75z" />
              </svg>
              Works
            </a>
            <a
              href="#contact"
              className="btn-outline-glow inline-flex h-12 items-center justify-center px-7 text-sm"
            >
              Connect
            </a>
          </div>

          {/* Quote */}
          <div className="mt-2 flex flex-col items-center gap-1.5">
            <p className="font-serif text-base italic text-[rgba(255,255,255,0.5)]">
              &ldquo;{QUOTE}&rdquo;
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#A2E435]">
              — {AUTHOR}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] text-[rgba(255,255,255,0.75)] transition-all duration-200 hover:scale-105 hover:border-[#A2E435] hover:bg-[rgba(162,228,53,0.08)] hover:text-white"
              >
                <SocialIcon icon={icon} className="text-base" />
              </a>
            ))}
          </div>

        </div>
      </FadeInWhenVisible>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2" aria-hidden>
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[rgba(255,255,255,0.35)]">Scroll</p>
        <div className="animate-bounce-y">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#A2E435]">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </div>
  )
}
