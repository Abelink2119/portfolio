import { useEffect, useRef, useState } from 'react'

const EXPERIENCES = [
  {
    role: 'Full Stack Developer',
    company: 'Freelance / Self-employed',
    period: '2023 – Present',
    type: 'Full-time',
    location: 'Remote',
    icon: '⟨/⟩',
    color: 'violet',
    points: [
      'Built and deployed full-stack web & mobile apps for clients across Ethiopia and remotely.',
      'Developed Gebeta (food delivery), Hulu (service provider), and Liyu (fashion) platforms.',
      'Architected REST APIs with Node.js/Express, managed PostgreSQL & MongoDB databases.',
      'Implemented CI/CD pipelines using Docker and GitHub Actions.',
    ],
  },
  {
    role: 'Mobile App Developer',
    company: 'Personal Projects',
    period: '2022 – 2023',
    type: 'Project-based',
    location: 'Ethiopia',
    icon: '◱',
    color: 'blue',
    points: [
      'Built cross-platform mobile apps using React Native and Flutter.',
      'Integrated AI features: liveness detection (Fayda-ID) and style recommendations (Liyu).',
      'Delivered apps with offline-first architecture and real-time GPS tracking.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Internship / Junior Role',
    period: '2022',
    type: 'Internship',
    location: 'Ethiopia',
    icon: '◎',
    color: 'amber',
    points: [
      'Developed responsive UIs with React and Tailwind CSS.',
      'Collaborated with design teams to implement pixel-perfect interfaces.',
      'Optimized web performance and accessibility across projects.',
    ],
  },
]

const COLORS = {
  violet: {
    icon:   'bg-violet-500/20 text-violet-400 border-violet-500/30',
    badge:  'bg-violet-500/15 text-violet-300 border-violet-500/25',
    badgeL: 'bg-violet-50 text-violet-700 border-violet-200',
    glow:   'hover:shadow-violet-500/10',
    dot:    'bg-violet-400',
    line:   'from-violet-500/40 to-transparent',
  },
  blue: {
    icon:   'bg-blue-500/20 text-blue-400 border-blue-500/30',
    badge:  'bg-blue-500/15 text-blue-300 border-blue-500/25',
    badgeL: 'bg-blue-50 text-blue-700 border-blue-200',
    glow:   'hover:shadow-blue-500/10',
    dot:    'bg-blue-400',
    line:   'from-blue-500/40 to-transparent',
  },
  amber: {
    icon:   'bg-amber-500/20 text-amber-400 border-amber-500/30',
    badge:  'bg-amber-500/15 text-amber-300 border-amber-500/25',
    badgeL: 'bg-amber-50 text-amber-700 border-amber-200',
    glow:   'hover:shadow-amber-500/10',
    dot:    'bg-amber-400',
    line:   'from-amber-500/40 to-transparent',
  },
}

function Card({ exp, dark, index, total }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const c = COLORS[exp.color]

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`flex gap-5 transition-all duration-600 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Left: icon + line */}
      <div className="flex flex-col items-center gap-0 shrink-0 pt-1">
        <div className={`w-11 h-11 rounded-xl border text-lg font-bold flex items-center justify-center shrink-0 ${c.icon}`}>
          {exp.icon}
        </div>
        {index < total - 1 && (
          <div className={`w-px flex-1 mt-2 bg-gradient-to-b ${c.line}`} style={{ minHeight: '32px' }} />
        )}
      </div>

      {/* Right: card */}
      <div className={`flex-1 mb-8 rounded-2xl border p-6 transition-all duration-300 hover:shadow-xl ${c.glow} ${
        dark
          ? 'bg-white/[0.03] border-white/8 hover:border-white/15'
          : 'bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300'
      }`}>

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className={`text-xl font-extrabold tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
              {exp.role}
            </h3>
            <p className={`text-sm mt-0.5 font-medium ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
              {exp.company}
              <span className={`mx-2 ${dark ? 'text-gray-700' : 'text-gray-300'}`}>·</span>
              {exp.location}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${dark ? c.badge : c.badgeL}`}>
              {exp.type}
            </span>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${
              dark ? 'bg-white/6 text-gray-400' : 'bg-gray-100 text-gray-500'
            }`}>
              {exp.period}
            </span>
          </div>
        </div>

        {/* Points */}
        <ul className="flex flex-col gap-2">
          {exp.points.map((pt, j) => (
            <li key={j} className={`flex gap-3 text-sm leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-2 ${c.dot}`} />
              {pt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function ExperienceSection({ theme }) {
  const dark = theme === 'dark'
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="experience" className="relative z-10 py-28 px-6">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
            Work <span className="text-violet-400">Experience</span>
          </h2>
          <p className={`max-w-md mx-auto text-base ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            My professional journey building real-world products.
          </p>
        </div>

        {/* Cards */}
        <div>
          {EXPERIENCES.map((exp, i) => (
            <Card key={i} exp={exp} dark={dark} index={i} total={EXPERIENCES.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
