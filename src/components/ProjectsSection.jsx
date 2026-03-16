import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    title: 'SaaS Landing Page',
    desc: 'A beautiful landing page app using React and Tailwind.',
    tags: ['React', 'TailwindCSS', 'Supabase'],
    img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80',
    live: '#',
    github: '#',
  },
  {
    title: 'Orbit Analytics Dashboard',
    desc: 'Interactive analytics dashboard with data visualization and filtering capabilities.',
    tags: ['TypeScript', 'D3.js', 'Next.js'],
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    live: '#',
    github: '#',
  },
  {
    title: 'E-commerce Platform',
    desc: 'Full-featured e-commerce platform with user authentication and payment processing.',
    tags: ['React', 'Node.js', 'Stripe'],
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    live: '#',
    github: '#',
  },
]

export default function ProjectsSection({ theme }) {
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
    <section id="projects" className="relative z-10 py-28 px-6">
      <div ref={ref} className={`max-w-5xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className={`text-4xl md:text-5xl font-bold text-center mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
          Featured <span className="text-violet-400">Projects</span>
        </h2>
        <p className={`text-center mb-14 max-w-2xl mx-auto ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
          Here are some of my recent projects. Each project was carefully crafted with attention to
          detail, performance, and user experience.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.title}
              className={`rounded-2xl overflow-hidden border transition-all hover:-translate-y-1 ${
                dark
                  ? 'bg-white/5 border-white/10 hover:border-violet-500/40'
                  : 'bg-white border-gray-200 hover:border-violet-400 shadow-sm'
              }`}
            >
              <div className="h-44 overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <div className="flex gap-2 flex-wrap mb-3">
                  {p.tags.map(t => (
                    <span key={t} className={`text-xs px-2 py-0.5 rounded-full ${
                      dark ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-700'
                    }`}>{t}</span>
                  ))}
                </div>
                <h3 className={`font-bold text-lg mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>{p.title}</h3>
                <p className={`text-sm mb-4 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{p.desc}</p>
                <div className="flex gap-3">
                  <a href={p.live} className="text-gray-400 hover:text-violet-400 transition-colors" aria-label="Live demo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                  <a href={p.github} className="text-gray-400 hover:text-violet-400 transition-colors" aria-label="GitHub">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-medium transition-all"
          >
            Check My Github →
          </a>
        </div>
      </div>
    </section>
  )
}
