import { useEffect, useRef, useState } from 'react'

/* ── Programmer SVG icons ─────────────────────────────────────── */
const CodeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
)
const MobileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="1"/>
  </svg>
)
const LayoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
  </svg>
)

const EXPERIENCES = [
  {
    role: 'Full Stack Developer',
    company: 'Freelance / Self-employed',
    period: '2023 – Present',
    type: 'Full-time',
    location: 'Remote',
    Icon: CodeIcon,
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
    Icon: MobileIcon,
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
    Icon: LayoutIcon,
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
  const isLeft = index % 2 === 0   // even → card on LEFT, odd → card on RIGHT
  const badge = dark ? TYPE_BADGE[exp.type].dark : TYPE_BADGE[exp.type].light
  const { Icon } = exp

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  /* Card content — shared */
  const CardBody = (
    <div className={`flex-1 rounded-2xl border p-5 md:p-6 transition-all duration-300 ${
      dark
        ? 'bg-white/[0.03] border-white/10 hover:border-violet-500/40 hover:bg-white/[0.05]'
        : 'bg-white border-gray-200 shadow-sm hover:shadow-lg hover:border-violet-300'
    }`}>
      {/* Top */}
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div>
          <h3 className={`text-base font-extrabold leading-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
            {exp.role}
          </h3>
          <p className={`text-xs mt-0.5 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            <span className="text-violet-400 font-semibold">{exp.company}</span>
            <span className={`mx-1.5 ${dark ? 'text-gray-600' : 'text-gray-300'}`}>·</span>
            {exp.location}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 justify-end">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${badge}`}>{exp.type}</span>
          <span className={`text-xs px-2.5 py-0.5 rounded-full ${dark ? 'bg-white/6 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>{exp.period}</span>
        </div>
      </div>

      {/* Divider */}
      <div className={`h-px mb-3 ${dark ? 'bg-white/6' : 'bg-gray-100'}`} />

      {/* Points */}
      <ul className="flex flex-col gap-2">
        {exp.points.map((pt, j) => (
          <li key={j} className={`flex gap-2.5 text-xs leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-1.5" />
            {pt}
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* ── Desktop: alternating layout ── */}
      <div className="hidden md:flex items-start gap-0">

        {/* LEFT side — card or spacer */}
        <div className="flex-1 flex justify-end pr-6">
          {isLeft ? CardBody : <div className="flex-1" />}
        </div>

        {/* CENTER: wire + node */}
        <div className="flex flex-col items-center w-12 shrink-0">
          {/* top wire */}
          <div className={`w-px ${index === 0 ? 'h-4 opacity-0' : 'h-4'} ${dark ? 'bg-violet-500/50' : 'bg-violet-400/60'}`} />
          {/* node */}
          <div className={`w-11 h-11 rounded-full border-2 flex items-center justify-center z-10 shrink-0 transition-all duration-300 ${
            dark
              ? 'bg-[#0a0a0f] border-violet-500 text-violet-400 shadow-[0_0_16px_rgba(139,92,246,0.45)]'
              : 'bg-white border-violet-500 text-violet-600 shadow-md'
          }`}>
            <Icon />
          </div>
          {/* bottom wire */}
          {!isLast
            ? <div className={`w-px flex-1 min-h-[60px] ${dark ? 'bg-violet-500/50' : 'bg-violet-400/60'}`} />
            : <div className="h-4" />
          }
        </div>

        {/* RIGHT side — card or spacer */}
        <div className="flex-1 pl-6">
          {!isLeft ? CardBody : <div className="flex-1" />}
        </div>
      </div>

      {/* ── Mobile: single column ── */}
      <div className="flex md:hidden gap-4 mb-8">
        {/* wire + node */}
        <div className="flex flex-col items-center shrink-0">
          <div className={`w-px ${index === 0 ? 'h-3 opacity-0' : 'h-3'} ${dark ? 'bg-violet-500/50' : 'bg-violet-400/60'}`} />
          <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 ${
            dark
              ? 'bg-[#0a0a0f] border-violet-500 text-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.4)]'
              : 'bg-white border-violet-500 text-violet-600 shadow-md'
          }`}>
            <Icon />
          </div>
          {!isLast && <div className={`w-px flex-1 min-h-[40px] ${dark ? 'bg-violet-500/50' : 'bg-violet-400/60'}`} />}
        </div>
        {/* card */}
        <div className="flex-1 pb-2">{CardBody}</div>
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
        className={`max-w-4xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
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
