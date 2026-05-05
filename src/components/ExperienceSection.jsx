import { useEffect, useRef, useState } from 'react'

const EXPERIENCES = [
  {
    role: 'Full Stack Developer',
    company: 'Freelance / Self-employed',
    period: '2023 – Present',
    type: 'Full-time',
    location: 'Remote',
    icon: '⟨/⟩',
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
    points: [
      'Developed responsive UIs with React and Tailwind CSS.',
      'Collaborated with design teams to implement pixel-perfect interfaces.',
      'Optimized web performance and accessibility across projects.',
    ],
  },
]

const TYPE_BADGE = {
  'Full-time':     { dark: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', light: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  'Project-based': { dark: 'bg-blue-500/15 text-blue-400 border-blue-500/30',          light: 'bg-blue-50 text-blue-700 border-blue-200' },
  'Internship':    { dark: 'bg-amber-500/15 text-amber-400 border-amber-500/30',        light: 'bg-amber-50 text-amber-700 border-amber-200' },
}

function ExperienceCard({ exp, dark, index, isLast }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const badge = dark ? TYPE_BADGE[exp.type].dark : TYPE_BADGE[exp.type].light

  return (
    <div
      ref={ref}
      className={`relative flex gap-0 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* ── Timeline column ── */}
      <div className="flex flex-col items-center w-14 shrink-0">
        {/* Top wire segment (hidden for first item) */}
        <div className={`w-px flex-none ${index === 0 ? 'h-6 opacity-0' : 'h-6'} ${dark ? 'bg-violet-500/40' : 'bg-violet-300'}`} />

        {/* Node */}
        <div className={`relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 font-bold text-sm transition-all duration-300 ${
          dark
            ? 'bg-[#0a0a0f] border-violet-500 text-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.4)]'
            : 'bg-white border-violet-500 text-violet-600 shadow-md'
        }`}>
          {exp.icon}
        </div>

        {/* Bottom wire (hidden for last item) */}
        {!isLast && (
          <div className={`w-px flex-1 mt-0 min-h-[80px] ${dark ? 'bg-violet-500/40' : 'bg-violet-300'}`} />
        )}
      </div>

      {/* ── Card ── */}
      <div className={`flex-1 ml-4 mb-10 rounded-2xl border p-6 transition-all duration-300 ${
        dark
          ? 'bg-white/[0.03] border-white/10 hover:border-violet-500/40 hover:bg-white/[0.05]'
          : 'bg-white border-gray-200 shadow-sm hover:shadow-lg hover:border-violet-300'
      }`}>

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className={`text-lg font-extrabold tracking-tight leading-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
              {exp.role}
            </h3>
            <p className={`text-sm mt-0.5 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
              <span className="text-violet-400 font-semibold">{exp.company}</span>
              <span className={`mx-1.5 ${dark ? 'text-gray-600' : 'text-gray-300'}`}>·</span>
              <span className="inline-flex items-center gap-1">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {exp.location}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${badge}`}>
              {exp.type}
            </span>
            <span className={`text-xs font-medium px-3 py-1 rounded-full inline-flex items-center gap-1.5 ${
              dark ? 'bg-white/6 text-gray-400' : 'bg-gray-100 text-gray-500'
            }`}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
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
              <span className="text-violet-400 shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 block" />
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

        {/* Timeline */}
        <div>
          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard
              key={i}
              exp={exp}
              dark={dark}
              index={i}
              isLast={i === EXPERIENCES.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
