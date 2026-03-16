import { useEffect, useRef, useState } from 'react'

const experiences = [
  {
    role: 'Full Stack Developer',
    company: 'Freelance / Self-employed',
    period: '2023 – Present',
    type: 'Full-time',
    points: [
      'Built and deployed full-stack web & mobile apps for clients across Ethiopia and remotely.',
      'Developed Gebeta (food delivery), Hulu (service provider), and Liyu (fashion) platforms.',
      'Architected REST APIs with Node.js/Express and managed PostgreSQL & MongoDB databases.',
      'Implemented CI/CD pipelines using Docker and GitHub Actions.',
    ],
  },
  {
    role: 'Mobile App Developer',
    company: 'Personal Projects',
    period: '2022 – 2023',
    type: 'Project-based',
    points: [
      'Built cross-platform mobile apps using React Native and Flutter.',
      'Integrated AI features including liveness detection (Fayda-ID) and style recommendations (Liyu).',
      'Delivered apps with offline-first architecture and real-time tracking.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Internship / Junior Role',
    period: '2022',
    type: 'Internship',
    points: [
      'Developed responsive UIs with React and Tailwind CSS.',
      'Collaborated with design teams to implement pixel-perfect interfaces.',
      'Optimized web performance and accessibility across projects.',
    ],
  },
]

export default function ExperienceSection({ theme }) {
  const dark = theme === 'dark'
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="experience" className="relative z-10 py-28 px-6">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <h2 className={`text-4xl md:text-5xl font-bold text-center mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
          Work <span className="text-violet-400">Experience</span>
        </h2>
        <p className={`text-center mb-14 max-w-xl mx-auto text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
          My professional journey building real-world products.
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 ${dark ? 'bg-white/10' : 'bg-gray-200'}`} />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-violet-500 border-2 border-violet-300 mt-1.5 z-10" />

                {/* Spacer for opposite side */}
                <div className="hidden md:block flex-1" />

                {/* Card */}
                <div className={`flex-1 ml-10 md:ml-0 p-6 rounded-2xl border transition-all duration-200 ${
                  dark
                    ? 'bg-white/5 border-white/10 hover:border-violet-500/40'
                    : 'bg-white border-gray-200 shadow-sm hover:border-violet-300 hover:shadow-md'
                }`}>
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className={`font-bold text-base ${dark ? 'text-white' : 'text-gray-900'}`}>{exp.role}</h3>
                      <p className="text-violet-400 text-sm font-medium">{exp.company}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-xs px-3 py-1 rounded-full ${dark ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-700'}`}>
                        {exp.type}
                      </span>
                      <span className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{exp.period}</span>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {exp.points.map((pt, j) => (
                      <li key={j} className={`text-xs leading-relaxed flex gap-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <span className="text-violet-400 mt-0.5 shrink-0">▸</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
