import FadeInWhenVisible from "./FadeInWhenVisible"
import SectionHeading from "./SectionHeading"

const skills = [
  {
    category: "Languages",
    items: [
      { name: "Python", icon: "devicon-python-plain colored", color: "#3776AB" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored", color: "#F7DF1E" },
      { name: "HTML", icon: "devicon-html5-plain colored", color: "#E34F26" },
      { name: "CSS", icon: "devicon-css3-plain colored", color: "#1572B6" },
      { name: "C", icon: "devicon-c-plain colored", color: "#A8B9CC" },
      { name: "C#", icon: "devicon-csharp-plain colored", color: "#239120" },
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      { name: "React", icon: "devicon-react-original colored", color: "#61DAFB" },
      { name: "Next.js", icon: "devicon-nextjs-plain", color: "#FFFFFF" },
      { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain colored", color: "#38BDF8" },
      { name: "Node.js", icon: "devicon-nodejs-plain colored", color: "#339933" },
    ],
  },
  {
    category: "Data & Databases",
    items: [
      { name: "PostgreSQL", icon: "devicon-postgresql-plain colored", color: "#336791" },
      { name: "MySQL", icon: "devicon-mysql-plain colored", color: "#00758F" },
      { name: "MongoDB", icon: "devicon-mongodb-plain colored", color: "#47A248" },
    ],
  },
  {
    category: "OS & Tools",
    items: [
      { name: "Kali Linux", icon: "devicon-kalilinux-original colored", color: "#557C94" },
      { name: "Unity", icon: "devicon-unity-plain colored", color: "#A2E435" },
      { name: "Git", icon: "devicon-git-plain colored", color: "#F05032" },
      { name: "VS Code", icon: "devicon-vscode-plain colored", color: "#007ACC" },
      { name: "Vercel", icon: "devicon-vercel-original", color: "#FFFFFF" },
      {
        name: "Cisco & Network",
        color: "#1BA0D7",
        svg: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
            <path d="M12.002 9.066c-1.391 0-2.52 1.129-2.52 2.52 0 1.39 1.129 2.518 2.52 2.518s2.519-1.128 2.519-2.518c0-1.391-1.128-2.52-2.519-2.52m0 6.64c-2.272 0-4.12-1.848-4.12-4.12 0-2.27 1.848-4.119 4.12-4.119 2.271 0 4.119 1.849 4.119 4.119 0 2.272-1.848 4.12-4.119 4.12M3.923 8.35v11.726H2.324V8.35h1.599m17.753 0v11.726H20.08V8.35h1.596M12.002 0v5.864h-1.6V0h1.6m-4.04 2.293v7.41h-1.6V2.293h1.6m8.078 0v7.41h-1.598V2.293h1.598M7.962 4.606v9.124h-1.6V4.606h1.6m8.077 0v9.124h-1.598V4.606h1.598z" />
          </svg>
        ),
      },
    ],
  },
]

const allSkills = skills.flatMap((group) => group.items)

/** Nivora-style endless strip: every tool in the stack, drifting past. */
function SkillMarquee() {
  return (
    <div className="marquee-mask relative left-1/2 mt-14 w-screen -translate-x-1/2 overflow-hidden">
      <div className="marquee-strip gap-3">
        {[...allSkills, ...allSkills].map((skill, i) => (
          <span
            key={`${skill.name}-${i}`}
            className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] px-5 py-2.5"
          >
            {skill.svg ? (
              <span
                className="flex h-5 w-5 items-center justify-center [&>svg]:h-5 [&>svg]:w-5"
                style={{ color: skill.color || "#A2E435" }}
              >
                {skill.svg}
              </span>
            ) : (
              <i className={`${skill.icon} text-xl`} />
            )}
            <span className="whitespace-nowrap font-mono text-xs text-[rgba(255,255,255,0.75)]">
              {skill.name}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-8 py-24">
      <FadeInWhenVisible>
        <SectionHeading
          align="center"
          eyebrow="The Stack Pipeline"
          title={
            <>
              Every solution starts with the <span className="font-serif italic font-normal text-[#A2E435]">right foundation.</span>
            </>
          }
        />
      </FadeInWhenVisible>

      <SkillMarquee />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {skills.map((group, i) => (
          <FadeInWhenVisible key={group.category} delay={i * 0.07}>
            <div className="rounded-[32px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] p-6 h-full">
              {/* Category Header */}
              <div className="mb-5 flex items-baseline gap-3">
                <span className="font-mono text-[11px] text-[rgba(255,255,255,0.35)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-mono text-xs uppercase tracking-widest text-[rgba(255,255,255,0.6)]">
                  {group.category}
                </p>
              </div>

              {/* Checklist — Nivora's "Our service" feature-list pattern */}
              <ul className="flex flex-col">
                {group.items.map((skill) => (
                  <li key={skill.name} className="checklist-row">
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center [&>svg]:h-5 [&>svg]:w-5"
                      style={{ color: skill.color || "rgba(255,255,255,0.75)" }}
                    >
                      {skill.svg ? skill.svg : <i className={`${skill.icon} text-lg`} />}
                    </span>
                    <span className="flex-1 text-sm text-[rgba(255,255,255,0.75)]">
                      {skill.name}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0 text-[#A2E435]" aria-hidden>
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </section>
  )
}
