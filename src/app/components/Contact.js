"use client"

import { useState } from "react"
import FadeInWhenVisible from "./FadeInWhenVisible"
import SectionHeading from "./SectionHeading"
import { SOCIAL_LINKS } from "../constants/social"
import SocialIcon from "./SocialIcon"

const contactInfo = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
      </svg>
    ),
    label: "Email",
    value: "patawee@example.com",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 10-16 0c0 3.63 1.556 6.324 3.5 8.327a19.58 19.58 0 002.683 2.282 16.975 16.975 0 001.144.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
    ),
    label: "Location",
    value: "Nakhon Pathom, Thailand",
  },
]

export default function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState({ type: "", text: "" })
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedMsg = message.trim()

    if (!trimmedName || !trimmedEmail || !trimmedMsg) {
      setStatus({ type: "error", text: "Please fill in all fields." })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      setStatus({ type: "error", text: "Please enter a valid email address." })
      return
    }

    try {
      setIsSending(true)
      setStatus({ type: "", text: "" })

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, email: trimmedEmail, message: trimmedMsg }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to send message.")

      setName(""); setEmail(""); setMessage("")
      setStatus({ type: "success", text: "Message sent! I'll get back to you soon." })
    } catch (err) {
      setStatus({ type: "error", text: err?.message || "Something went wrong while sending." })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-8 py-24">
      <FadeInWhenVisible>
        <SectionHeading
          align="center"
          eyebrow="Contact"
          title="Let's Stay In Touch"
          description="I am currently focused on building side projects that address tangible, real-world challenges. Whether you have a project to connect or just want to collaborate, I'd love to hear from you."
        />
      </FadeInWhenVisible>

      {/* Two-column layout */}
      <div className="mx-auto mt-14 max-w-5xl grid gap-8 lg:grid-cols-5">

        {/* LEFT — Info Panel */}
        <FadeInWhenVisible delay={0.06} className="lg:col-span-2">
          <div className="rounded-[32px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] h-full p-7 flex flex-col gap-8">
            <div>
              <h3 className="font-display text-lg font-bold text-white">Get in touch</h3>
              <p className="mt-2 text-sm text-[rgba(255,255,255,0.75)] leading-relaxed">
                Open to freelance projects, collaborations, and full-time opportunities. Let&apos;s build something great together.
              </p>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-3 rounded-[20px] bg-[rgba(162,228,53,0.06)] border border-[rgba(162,228,53,0.15)] p-4">
              <span className="status-dot flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#A2E435]">Available</p>
                <p className="text-[11px] text-[rgba(255,255,255,0.75)]">Open to new opportunities</p>
              </div>
            </div>

            {/* Contact Info Items */}
            <div className="flex flex-col gap-4">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] text-[#A2E435]">
                    {info.icon}
                  </div>
                  <div>
                    <p className="font-mono text-[9px] font-semibold text-[rgba(255,255,255,0.4)] uppercase tracking-wider">{info.label}</p>
                    <p className="text-sm text-[rgba(255,255,255,0.75)]">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="font-mono text-[9px] font-semibold text-[rgba(255,255,255,0.4)] uppercase tracking-wider mb-3">Find me on</p>
              <div className="flex items-center gap-2">
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
        </FadeInWhenVisible>

        {/* RIGHT — Form */}
        <FadeInWhenVisible delay={0.1} className="lg:col-span-3">
          <form
            className="rounded-[32px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] p-7"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-mono text-[9px] font-bold text-[rgba(255,255,255,0.75)] uppercase tracking-wider" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="ds-input mt-1.5"
                    required
                  />
                </div>
                <div>
                  <label className="font-mono text-[9px] font-bold text-[rgba(255,255,255,0.75)] uppercase tracking-wider" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="ds-input mt-1.5"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[9px] font-bold text-[rgba(255,255,255,0.75)] uppercase tracking-wider" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me about your project or idea..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="ds-input mt-1.5 resize-none"
                  required
                />
              </div>

              {status.text && (
                <p className={`text-xs font-semibold ${
                  status.type === "success" ? "text-[#A2E435]" : "text-[#F87171]"
                }`}>
                  {status.type === "success" ? "✓ " : "✗ "}
                  {status.text}
                </p>
              )}

              <button
                type="submit"
                disabled={isSending}
                className="btn-glow inline-flex h-11 w-full items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider disabled:opacity-60"
              >
                {isSending ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                      <circle cx="12" cy="12" r="10" strokeWidth="3" className="opacity-25" />
                      <path d="M12 2a10 10 0 0110 10" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden>
                      <path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}
