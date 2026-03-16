import { useEffect, useRef, useState } from 'react'

const cards = [
  { icon: '⟨/⟩', title: 'Full Stack Development', desc: 'Building end-to-end web and mobile applications with React, Node.js, and cloud-native architectures.' },
  { icon: '◎',   title: 'DevOps & Cloud',          desc: 'Automating CI/CD pipelines, containerizing with Docker/Kubernetes, and deploying on AWS & GCP.' },
  { icon: '⬡',   title: 'Solution Architecture',   desc: 'Designing scalable, resilient system architectures that align with business goals and growth.' },
]

export default function AboutSection({ theme }) {
  const dark = theme === 'dark'
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
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
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 active:scale-95 text-white text-sm font-medium transition-all duration-200 cursor-pointer"
              >
                Get In Touch
              </button>
              <a
                href="/resume.pdf"
                download="Abel's Resume.pdf"
                className={`px-6 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 inline-flex items-center gap-2 ${
                  dark
                    ? 'border-white/20 text-white hover:bg-white/10'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}>
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
  )
}
