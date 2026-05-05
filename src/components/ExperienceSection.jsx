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
    points: [
      'Developed responsive UIs with React and Tailwind CSS.',
      'Collaborated with design teams to implement pixel-perfect interfaces.',
      'Optimized web performance and accessibility across projects.',
    ],
  },
]

const TYPE_STYLE = {
  'Full-time':     'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'Project-based': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'Internship':    'bg-amber-500/15 text-amber-400 border-amber-500/30',
}
const TYPE_STYLE_LIGHT = {
  'Full-time':     'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Project-based': 'bg-blue-50 text-blue-700 border-blue-200',
  'Internship':    'bg-amber-50 text-amber-700 border-amber-200',
}
const ACCENT = {
  'Full-time':     'bg-emerald-400',
  'Project-based': 'bg-blue-400',
  'Internship':    'bg-amber-400',
}

function Card({ exp, dark, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const badge = dark ? TYPE_STYLE[exp.type] : TYPE_STYLE_LIGHT[exp.type]
  const accent = ACCENT[exp.type]

  return (
    <div
      ref={ref}
      className={`relative flex gap-0 rounded-2xl overflow-hidden border transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${dark
        ? 'bg-white/4 border-white/8 hover:border-violet-500/40 hover:bg-white/6'
        : 'bg-white border-gray-200 shadow-sm hover:shadow-lg hover:border-violet-300'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Left accent bar */}
      <div className={`w-1 shrink-0 ${accent}`} />

      {/* Content */}
      <div className="flex-1 p-6 md:p-7">
        {/* Top row */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
          {/* Left: role + company */}
          <div>
            <h3 className={`text-xl font-bold leading-tight mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>
              {exp.role}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-violet-400 font-semibold">{exp.company}</span>
              <span className={dark ? 'text-gray-600' : 'text-gray-300'}>|</span>
              <span className={`flex items-center gap-1 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                {/* Location pin */}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {exp.location}
              </span>
            </div>
          </div>

          {/* Right: badge + period */}
          <div className="flex flex-col items-end gap-2">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${badge}`}>
              {exp.type}
            </span>
            <span className={`text-xs flex items-center gap-1.5 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {exp.period}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className={`h-px mb-5 ${dark ? 'bg-white/6' : 'bg-gray-100'}`} />

        {/* Bullet points */}
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
          {exp.points.map((pt, j) => (
            <li key={j} className={`flex gap-2.5 text-sm leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              <span className="text-violet-400 shrink-0 mt-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="4"/>
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

        {/* Cards */}
        <div className="flex flex-col gap-5">
          {EXPERIENCES.map((exp, i) => (
            <Card key={i} exp={exp} dark={dark} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
