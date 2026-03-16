import { useEffect, useRef, useState } from 'react'

const certs = [
  {
    title: 'Android Developer Fundamentals',
    issuer: 'Udacity',
    year: 'Feb 11, 2026',
    color: 'from-blue-600 to-blue-400',
    verify: 'https://confirm.udacity.com/JZATQUQ9',
  },
  {
    title: 'Programming Fundamentals',
    issuer: 'Udacity',
    year: 'Feb 11, 2026',
    color: 'from-violet-600 to-violet-400',
    verify: 'https://confirm.udacity.com/J652DHET',
  },
  {
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'Udacity',
    year: 'Feb 10, 2026',
    color: 'from-orange-500 to-yellow-400',
    verify: 'https://confirm.udacity.com/DZNDQNCR',
  },
  {
    title: 'Data Analysis Fundamentals',
    issuer: 'Udacity',
    year: 'Feb 10, 2026',
    color: 'from-green-600 to-emerald-400',
    verify: 'https://confirm.udacity.com/E4UJRWWJ',
  },
  {
    title: 'Meta React Native Specialization',
    issuer: 'Meta / Coursera',
    year: '2024',
    color: 'from-sky-600 to-cyan-400',
    verify: null,
  },
  {
    title: 'Full Stack Open',
    issuer: 'University of Helsinki',
    year: '2023',
    color: 'from-teal-600 to-teal-400',
    verify: null,
  },
  {
    title: 'Node.js, Express, MongoDB Bootcamp',
    issuer: 'Udemy',
    year: '2023',
    color: 'from-red-500 to-orange-400',
    verify: null,
  },
  {
    title: 'Flutter & Dart — The Complete Guide',
    issuer: 'Udemy',
    year: '2022',
    color: 'from-pink-600 to-rose-400',
    verify: null,
  },
]

const BadgeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
)

export default function CertificationsSection({ theme }) {
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
    <section id="certifications" className="relative z-10 py-28 px-6">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <h2 className={`text-4xl md:text-5xl font-bold text-center mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
          <span className="text-violet-400">Certifications</span>
        </h2>
        <p className={`text-center mb-14 max-w-xl mx-auto text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
          Courses and certifications that shaped my technical foundation.
        </p>

        {/* Education block */}
        <div className={`mb-12 p-6 rounded-2xl border flex gap-5 items-start ${
          dark ? 'bg-violet-500/10 border-violet-500/30' : 'bg-violet-50 border-violet-200'
        }`}>
          <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center text-2xl shadow-lg">
            🎓
          </div>
          <div>
            <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${dark ? 'text-violet-400' : 'text-violet-600'}`}>Education</p>
            <h3 className={`font-bold text-base mb-0.5 ${dark ? 'text-white' : 'text-gray-900'}`}>BSc in Software Engineering</h3>
            <p className="text-violet-400 text-sm font-medium mb-1">Woldia University</p>
            <span className={`inline-block text-xs px-2.5 py-0.5 rounded-full font-semibold mb-3 ${dark ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-700'}`}>
              CGPA: 3.31
            </span>
            <p className={`text-xs leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              Completed my bachelor&apos;s degree with honors, focusing on software development, database management, and network administration. Participated in various tech competitions and research projects.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((c, i) => (
            <div
              key={i}
              className={`group p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-1 flex gap-4 items-start ${
                dark
                  ? 'bg-white/5 border-white/10 hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10'
                  : 'bg-white border-gray-200 shadow-sm hover:border-violet-300 hover:shadow-md'
              }`}
            >
              {/* Icon badge */}
              <div className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white shadow-lg`}>
                <BadgeIcon />
              </div>
              <div>
                <h3 className={`font-semibold text-sm leading-snug mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>{c.title}</h3>
                <p className="text-violet-400 text-xs font-medium mb-1">{c.issuer}</p>
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{c.year}</span>
                  {c.verify && (
                    <a href={c.verify} target="_blank" rel="noreferrer"
                      className="text-xs text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors">
                      Verify ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
