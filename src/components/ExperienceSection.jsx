import { useEffect, useRef, useState } from 'react'

const EXPERIENCES = [
  {
    role: 'Full Stack Developer',
    company: 'Freelance / Self-employed',
    period: '2023 – Present',
    type: 'Full-time',
    location: 'Remote',
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
    location: 'Ethiopia',
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
    location: 'Ethiopia',
    points: [
      'Developed responsive UIs with React and Tailwind CSS.',
      'Collaborated with design teams to implement pixel-perfect interfaces.',
      'Optimized web performance and accessibility across projects.',
    ],
  },
]

const typeColors = {
  'Full-time':     { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/25' },
  'Project-based': { bg: 'bg-blue-500/15',    text: 'text-blue-400',    border: 'border-blue-500/25' },
  'Internship':    { bg: 'bg-amber-500/15',   text: 'text-amber-400',   border: 'border-amber-500/25' },
}

const typeColorsLight = {
  'Full-time':     { bg: 'bg-emerald-50',  text: 'text-emerald-700', border: 'border-emerald-200' },
  'Project-based': { bg: 'bg-blue-50',     text: 'text-blue-700',    border: 'border-blue-200' },
  'Internship':    { bg: 'bg-amber-50',    text: 'text-amber-700',   border: 'border-amber-200' },
}

function ExperienceCard({ exp, dark, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const colors = dark ? typeColors[exp.type] : typeColorsLight[exp.type]

  return (
    <div
      ref={ref}
      className={`relative flex gap-6 transition-all duration-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center shrink-0">
        <div className="w-10 h-10 rounded-full bg-violet-600/20 border-2 border-violet-500 flex items-center justify-center z-10">
          <div className="w-3 h-3 rounded-full bg-violet-400" />
        </div>
        {index < EXPERIENCES.length - 1 && (
          <div className={`w-px flex-1 mt-2 ${dark ? 'bg-white/10' : 'bg-gray-200'}`} style={{ minHeight: '40px' }} />
        )}
      </div>

      {/* Card */}
      <div className={`flex-1 mb-10 rounded-2xl border p-6 transition-all duration-200 ${
        dark
          ? 'bg-white/4 border-white/8 hover:border-violet-500/40 hover:bg-white/6'
          : 'bg-white border-gray-200 shadow-sm hover:border-violet-300 hover:shadow-md'
      }`}>
        {/* Top row */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className={`font-bold text-lg leading-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
              {exp.role}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-violet-400 font-semibold text-sm">{exp.company}</span>
              <span className={`text-xs ${dark ? 'text-gray-600' : 'text-gray-400'}`}>·</span>
              <span className={`text-xs flex items-center gap-1 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {exp.location}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className={`text-xs px-3 py-1 rounded-full border font-medium ${colors.bg} ${colors.text} ${colors.border}`}>
              {exp.type}
            </span>
            <span className={`text-xs flex items-center gap-1 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {exp.period}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className={`h-px mb-4 ${dark ? 'bg-white/6' : 'bg-gray-100'}`} />

        {/* Bullet points */}
        <ul className="flex flex-col gap-2.5">
          {exp.points.map((pt, j) => (
            <li key={j} className={`flex gap-3 text-sm leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              <span className="text-violet-400 shrink-0 mt-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </span>
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
        <h2 className={`text-4xl md:text-5xl font-bold text-center mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
          Work <span className="text-violet-400">Experience</span>
        </h2>
        <p className={`text-center mb-14 max-w-xl mx-auto text-base ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
          My professional journey building real-world products.
        </p>

        {/* Timeline */}
        <div>
          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} dark={dark} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
