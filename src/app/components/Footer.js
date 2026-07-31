import { SOCIAL_LINKS } from "../constants/social"
import SocialIcon from "./SocialIcon"

const footerLinks = [
  { id: "about", label: "About" },
  { id: "leadership", label: "Leadership" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-[rgba(255,255,255,0.1)] bg-[#000000] py-16">
      {/* Elegant separator line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.12)] to-transparent" aria-hidden />

      <div className="mx-auto grid max-w-6xl gap-10 px-8 text-center sm:grid-cols-3 sm:text-left">
        {/* Brand + copyright */}
        <div>
          <a href="#home" className="font-serif text-2xl italic text-white transition-colors hover:text-[#A2E435]">
            First<span className="font-sans font-bold text-[#A2E435]">.</span>
          </a>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-[rgba(255,255,255,0.5)] mx-auto sm:mx-0">
            Full-stack &amp; game developer building Unity games and web applications.
          </p>
          <p className="mt-4 font-mono text-xs text-[rgba(255,255,255,0.35)]">
            © {year} · Built with Next.js &amp; Tailwind CSS
          </p>
        </div>

        {/* Quick nav */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[rgba(255,255,255,0.35)]">
            Navigate
          </p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {footerLinks.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-sm text-[rgba(255,255,255,0.6)] transition-colors hover:text-[#A2E435]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[rgba(255,255,255,0.35)]">
            Find me on
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 sm:justify-start">
            {SOCIAL_LINKS.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] text-[rgba(255,255,255,0.75)] transition-all hover:border-[#A2E435] hover:bg-[rgba(162,228,53,0.08)] hover:text-white hover:scale-105"
              >
                <SocialIcon icon={icon} className="text-base" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
