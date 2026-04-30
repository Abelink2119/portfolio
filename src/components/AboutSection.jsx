import { useEffect, useRef, useState } from 'react'
import mePng from '../assets/me.jpg'

const cards = [
  { icon: '⟨/⟩', title: 'Full Stack Development', desc: 'Building end-to-end web and mobile applications with React, Node.js, and cloud-native architectures.' },
  { icon: '◎',   title: 'DevOps & Cloud',          desc: 'Automating CI/CD pipelines, containerizing with Docker/Kubernetes, and deploying on AWS & GCP.' },
  { icon: '⬡',   title: 'Solution Architecture',   desc: 'Designing scalable, resilient system architectures that align with business goals and growth.' },
]

const cvSkills = [
  { name: 'JavaScript',    dots: 5 },
  { name: 'React / Next.js', dots: 5 },
  { name: 'Node.js',       dots: 4 },
  { name: 'TypeScript',    dots: 4 },
  { name: 'MongoDB',       dots: 4 },
  { name: 'PostgreSQL / MS SQL', dots: 3 },
  { name: 'Spring Boot',   dots: 4 },
  { name: 'Tailwind CSS',  dots: 5 },
  { name: 'Docker',        dots: 4 },
  { name: 'React Native',  dots: 4 },
  { name: 'Flutter',       dots: 4 },
  { name: 'Python',        dots: 3 },
]

function Dots({ filled, total = 5 }) {
  return (
    <span style={{ display: 'flex', gap: 4 }}>
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} style={{
          width: 12, height: 12, borderRadius: '50%',
          background: i < filled ? '#10b981' : 'transparent',
          border: '2px solid #10b981',
          display: 'inline-block', flexShrink: 0,
        }} />
      ))}
    </span>
  )
}

function CVModal({ onClose }) {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '12px',
      }}
    >
      {/* Modal shell */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 820,
          height: '92dvh',
          background: '#0f172a',
          border: '1px solid rgba(139,92,246,0.4)',
          borderRadius: 16,
          boxShadow: '0 32px 80px rgba(139,92,246,0.25)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* ── Top bar ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: '#0f172a',
          flexShrink: 0,
        }}>
          {/* Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'rgba(139,92,246,0.2)',
              border: '1px solid rgba(139,92,246,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>Abel Assefa</div>
              <div style={{ color: '#94a3b8', fontSize: 11 }}>Curriculum Vitae</div>
            </div>
          </div>
          {/* Right */}
          <div style={{ display: 'flex', gap: 8 }}>
            <a
              href="/Abel's Resume.pdf"
              download="Abel's Resume.pdf"
              onClick={e => e.stopPropagation()}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 16px', borderRadius: 8,
                background: '#7c3aed', color: '#fff',
                fontSize: 13, fontWeight: 600, textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#6d28d9'}
              onMouseLeave={e => e.currentTarget.style.background = '#7c3aed'}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download
            </a>
            <button
              onClick={onClose}
              style={{
                width: 34, height: 34, borderRadius: 8,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#94a3b8', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#94a3b8' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── CV Content (scrollable) ── */}
        <div style={{ flex: 1, overflowY: 'auto', background: '#fff' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', padding: '28px 24px 40px' }}>

            {/* Profile header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
              <img
                src={mePng}
                alt="Abel Assefa"
                style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '3px solid #e2e8f0', flexShrink: 0 }}
              />
              <div>
                <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.2 }}>Abel Assefa</h1>
                <p style={{ fontSize: 15, color: '#475569', margin: '4px 0 2px', fontWeight: 500 }}>Software Engineer</p>
                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Full Stack Developer · DevOps · Solution Architect</p>
              </div>
            </div>

            {/* Contact bar */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '8px 24px',
              background: '#f1f5f9', borderRadius: 10,
              padding: '12px 20px', marginBottom: 28,
              fontSize: 13, color: '#334155',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                abelink2119@gmail.com
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>
                0948102787
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Addis Ababa, Ethiopia
              </span>
            </div>

            {/* Two-column layout */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0 40px' }}>

              {/* LEFT column */}
              <div>
                {/* Education */}
                <h2 style={{ fontSize: 13, fontWeight: 800, color: '#10b981', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12, borderBottom: '2px solid #e2e8f0', paddingBottom: 6 }}>Education</h2>
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', margin: '0 0 2px' }}>BSc, Software Engineering</p>
                  <p style={{ fontSize: 13, color: '#475569', margin: '0 0 4px' }}>WiT, Woldia University</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94a3b8', fontStyle: 'italic', marginBottom: 4 }}>
                    <span>09/2022 – 06/2026</span>
                    <span>Woldia, Ethiopia</span>
                  </div>
                  <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>CGPA – 3.31</p>
                </div>

                {/* Work Experience */}
                <h2 style={{ fontSize: 13, fontWeight: 800, color: '#10b981', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12, borderBottom: '2px solid #e2e8f0', paddingBottom: 6 }}>Work Experience</h2>

                {[
                  { title: 'Full Stack Web & Mobile Developer', company: 'Freelancer, Upwork', period: '2023 – Present', desc: 'Built production-ready web and mobile apps for international clients using React, Node.js, and React Native.' },
                  { title: 'Software Engineer Intern', company: 'Ethio Telecom', period: '2024', desc: 'Developed internal tools and REST APIs, contributed to DevOps pipelines using Docker and CI/CD.' },
                ].map(exp => (
                  <div key={exp.title} style={{ marginBottom: 18 }}>
                    <p style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', margin: '0 0 1px' }}>{exp.title}</p>
                    <p style={{ fontSize: 13, color: '#475569', margin: '0 0 2px' }}>{exp.company}</p>
                    <p style={{ fontSize: 11, color: '#94a3b8', fontStyle: 'italic', margin: '0 0 4px' }}>{exp.period}</p>
                    <p style={{ fontSize: 12, color: '#64748b', margin: 0, lineHeight: 1.5 }}>{exp.desc}</p>
                  </div>
                ))}

                {/* Languages */}
                <h2 style={{ fontSize: 13, fontWeight: 800, color: '#10b981', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12, borderBottom: '2px solid #e2e8f0', paddingBottom: 6, marginTop: 8 }}>Languages</h2>
                {[{ lang: 'Amharic', level: 'Native' }, { lang: 'English', level: 'Professional' }, { lang: 'Afaan Oromo', level: 'Conversational' }].map(l => (
                  <div key={l.lang} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#334155', marginBottom: 6 }}>
                    <span style={{ fontWeight: 500 }}>{l.lang}</span>
                    <span style={{ color: '#94a3b8' }}>{l.level}</span>
                  </div>
                ))}
              </div>

              {/* RIGHT column */}
              <div>
                {/* Skills */}
                <h2 style={{ fontSize: 13, fontWeight: 800, color: '#10b981', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12, borderBottom: '2px solid #e2e8f0', paddingBottom: 6 }}>Skills</h2>
                <div style={{ marginBottom: 24 }}>
                  {cvSkills.map(s => (
                    <div key={s.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 13, color: '#334155', fontWeight: 500 }}>{s.name}</span>
                      <Dots filled={s.dots} />
                    </div>
                  ))}
                </div>

                {/* Certifications */}
                <h2 style={{ fontSize: 13, fontWeight: 800, color: '#10b981', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12, borderBottom: '2px solid #e2e8f0', paddingBottom: 6 }}>Certifications</h2>
                {[
                  'AWS Cloud Practitioner',
                  'Meta Front-End Developer',
                  'Google UX Design',
                  'Docker & Kubernetes (Udemy)',
                ].map(cert => (
                  <div key={cert} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: '#334155' }}>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AboutSection({ theme }) {
  const dark = theme === 'dark'
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [showCV, setShowCV] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <section id="about" className="relative z-10 py-28 px-6">
        <div
          ref={ref}
          className={`max-w-5xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${dark ? 'text-white' : 'text-gray-900'}`}>
            About <span className="text-violet-400">Me</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left — bio */}
            <div>
              <h3 className={`text-xl font-semibold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
                Software Engineer &amp; Solution Architect
              </h3>
              <p className={`mb-4 leading-relaxed text-base ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                With 2+ years of hands-on experience, I build production-ready solutions across web, mobile, and cloud.
                I specialize in full-stack development, DevOps automation, and designing scalable system architectures.
              </p>
              <p className={`mb-8 leading-relaxed text-base ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                Graduated with a BSc in Software Engineering from Woldia University (CGPA 3.31), I&apos;m driven by
                turning complex problems into elegant, maintainable software — and I&apos;m always pushing into new
                technologies to stay sharp.
              </p>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 active:scale-95 text-white text-sm font-medium transition-all duration-200 cursor-pointer"
                >
                  Get In Touch
                </button>

                {/* View CV */}
                <button
                  onClick={() => setShowCV(true)}
                  className={`px-6 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 inline-flex items-center gap-2 active:scale-95 cursor-pointer ${
                    dark
                      ? 'border-violet-500/50 text-violet-300 hover:bg-violet-500/10'
                      : 'border-violet-400 text-violet-600 hover:bg-violet-50'
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  View CV
                </button>

                {/* Download CV */}
                <a
                  href="/Abel's Resume.pdf"
                  download="Abel's Resume.pdf"
                  className={`px-6 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 inline-flex items-center gap-2 ${
                    dark
                      ? 'border-white/20 text-white hover:bg-white/10'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download CV
                </a>
              </div>
            </div>

            {/* Right — cards */}
            <div className="flex flex-col gap-4">
              {cards.map((c) => (
                <div
                  key={c.title}
                  className={`flex items-start gap-4 p-5 rounded-xl border transition-all duration-200 ${
                    dark
                      ? 'bg-white/5 border-white/10 hover:border-violet-500/50 hover:bg-white/8'
                      : 'bg-white border-gray-200 hover:border-violet-400 shadow-sm hover:shadow-md'
                  }`}
                >
                  <span className="text-violet-400 text-lg mt-0.5 w-7 shrink-0 font-mono">{c.icon}</span>
                  <div>
                    <h4 className={`font-semibold mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>{c.title}</h4>
                    <p className={`text-sm leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {showCV && <CVModal onClose={() => setShowCV(false)} />}
    </>
  )
}
