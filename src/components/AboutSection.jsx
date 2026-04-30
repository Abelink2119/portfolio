import { useEffect, useRef, useState } from 'react'

const cards = [
  { icon: '⟨/⟩', title: 'Full Stack Development', desc: 'Building end-to-end web and mobile applications with React, Node.js, and cloud-native architectures.' },
  { icon: '◎',   title: 'DevOps & Cloud',          desc: 'Automating CI/CD pipelines, containerizing with Docker/Kubernetes, and deploying on AWS & GCP.' },
  { icon: '⬡',   title: 'Solution Architecture',   desc: 'Designing scalable, resilient system architectures that align with business goals and growth.' },
]

function CVModal({ onClose }) {
  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose() }

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(0px, 2vw, 24px)',
        animation: 'cvFadeIn 0.2s ease both',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '860px',
          height: 'min(92vh, 1100px)',
          display: 'flex', flexDirection: 'column',
          borderRadius: 'clamp(0px, 2vw, 18px)',
          overflow: 'hidden',
          background: '#111118',
          border: '1px solid rgba(139,92,246,0.25)',
          boxShadow: '0 32px 100px rgba(139,92,246,0.2), 0 0 0 1px rgba(255,255,255,0.04)',
          animation: 'cvSlideUp 0.25s cubic-bezier(0.22,1,0.36,1) both',
        }}
      >
        {/* ── Top bar ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px',
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          flexShrink: 0,
        }}>
          {/* Left: identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'linear-gradient(135deg,#7c3aed,#2563eb)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15, fontWeight: 800, color: '#fff', flexShrink: 0,
            }}>A</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: 13, lineHeight: 1.2 }}>Abel Assefa</div>
              <div style={{ color: '#9ca3af', fontSize: 11 }}>Curriculum Vitae</div>
            </div>
          </div>

          {/* Right: actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <a
              href="/Abel's Resume.pdf"
              download="Abel's Resume.pdf"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 8,
                background: 'linear-gradient(135deg,#7c3aed,#4f46e5)',
                color: '#fff', fontSize: 12, fontWeight: 600,
                textDecoration: 'none', whiteSpace: 'nowrap',
                transition: 'opacity 0.15s', cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>Download</span>
            </a>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)', color: '#9ca3af',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#9ca3af' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── PDF viewer — fills all remaining space ── */}
        <div style={{ flex: 1, overflow: 'hidden', background: '#f3f4f6' }}>
          <iframe
            src="/Abel's Resume.pdf"
            title="Abel Assefa — CV"
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes cvFadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes cvSlideUp { from { opacity:0; transform:translateY(24px) scale(0.98) } to { opacity:1; transform:translateY(0) scale(1) } }
      `}</style>
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
