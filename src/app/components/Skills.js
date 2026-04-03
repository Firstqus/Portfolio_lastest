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
                    <i className={`${skill.icon} text-4xl`} />
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