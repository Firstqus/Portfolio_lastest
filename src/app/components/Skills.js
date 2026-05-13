import FadeInWhenVisible from "./FadeInWhenVisible"

const skills = [
  {
    category: "Languages",
    items: [
      { name: "Python", icon: "devicon-python-plain colored" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
      { name: "HTML", icon: "devicon-html5-plain colored" },
      { name: "CSS", icon: "devicon-css3-plain colored" },
      { name: "C", icon: "devicon-c-plain colored" },
      { name: "C#", icon: "devicon-csharp-plain colored" },
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      { name: "React", icon: "devicon-react-original colored" },
      { name: "Next.js", icon: "devicon-nextjs-plain" },
      { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain colored" },
    ],
  },
  {
    category: "Data & Databases",
    items: [
      { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
      { name: "MySQL", icon: "devicon-mysql-plain colored" },
      { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
      { name: "Node.js", icon: "devicon-nodejs-plain colored" },
    ],
  },

  {
    category: "OS & Tool",
    items: [
      { name: "Kalilinux", icon:"devicon-kalilinux-original colored"},
      { name: "Unity", icon:"devicon-unity-plain colored"},
      { name: "Git", icon:"devicon-git-plain colored"},
      { name: "VS code", icon:"devicon-vscode-plain colored"},
      { name: "Vercel", icon:"devicon-vercel-original"},
      { 
        name: "Cisco & Network", 
        svg: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
            <path d="M12.002 9.066c-1.391 0-2.52 1.129-2.52 2.52 0 1.39 1.129 2.518 2.52 2.518s2.519-1.128 2.519-2.518c0-1.391-1.128-2.52-2.519-2.52m0 6.64c-2.272 0-4.12-1.848-4.12-4.12 0-2.27 1.848-4.119 4.12-4.119 2.271 0 4.119 1.849 4.119 4.119 0 2.272-1.848 4.12-4.119 4.12M3.923 8.35v11.726H2.324V8.35h1.599m17.753 0v11.726H20.08V8.35h1.596M12.002 0v5.864h-1.6V0h1.6m-4.04 2.293v7.41h-1.6V2.293h1.6m8.078 0v7.41h-1.598V2.293h1.598M7.962 4.606v9.124h-1.6V4.606h1.6m8.077 0v9.124h-1.598V4.606h1.598z"/>
          </svg>
        )
      },
    ],
  },
]

export default function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-6xl px-8 py-24"
    >
      <FadeInWhenVisible>
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest text-sky-600 dark:text-sky-300">
            THE STACK PIPELINE
          </p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Every solution starts with the right foundation.
          </h2>
        </div>
      </FadeInWhenVisible>

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        {skills.map((group, i) => (
          <FadeInWhenVisible key={group.category} delay={i * 0.06}>
            <div>
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                <p className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-300">
                  {group.category}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {group.items.map((skill) => (
                  <div
                    key={skill.name}
                      className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/70 bg-white/60 p-4 transition hover:-translate-y-0.5 hover:border-sky-500/50 dark:border-white/10 dark:bg-white/5"
                    aria-label={skill.name}
                  >
                    {skill.svg ? (
                      <div className="flex h-[36px] items-center justify-center text-slate-800 dark:text-slate-200">
                        {skill.svg}
                      </div>
                    ) : (
                      <i className={`${skill.icon} text-4xl`} />
                    )}
                    <span className="mt-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </section>
  )
}