import { useEffect, useRef, useState } from 'react'

const PROJECTS = [
  // ── Web Projects ──────────────────────────────────────────────
  {
    type: 'web',
    title: 'Orbit Analytics Dashboard',
    desc: 'Interactive analytics dashboard with real-time data visualization, custom charts, and advanced filtering. Built for SaaS teams to monitor KPIs at a glance.',
    tags: ['TypeScript', 'Next.js', 'D3.js', 'GraphQL'],
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80',
    live: '#',
    github: '#',
    featured: true,
  },
  {
    type: 'web',
    title: 'Hulu Web Platform',
    desc: 'Full-stack streaming platform clone with user authentication, subscription management, and AI-powered content recommendations.',
    tags: ['React', 'Node.js', 'MongoDB', 'JWT'],
    img: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=700&q=80',
    live: '#',
    github: '#',
    featured: false,
  },
  {
    type: 'web',
    title: 'E-commerce Platform',
    desc: 'Production-ready e-commerce solution with product management, cart, Stripe payments, and an admin dashboard for order tracking.',
    tags: ['Next.js', 'PostgreSQL', 'Stripe', 'Prisma'],
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80',
    live: '#',
    github: '#',
    featured: false,
  },
  // ── Mobile Projects ───────────────────────────────────────────
  {
    type: 'mobile',
    title: 'Gebeta Food Delivery',
    desc: 'Cross-platform food delivery app with real-time order tracking, driver location updates via WebSockets, and integrated payment gateway.',
    tags: ['React Native', 'Node.js', 'WebSockets', 'MongoDB'],
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=80',
    live: '#',
    github: '#',
    featured: true,
  },
  {
    type: 'mobile',
    title: 'Fayda-ID Check',
    desc: 'National ID verification mobile app with AI-powered liveness detection, face matching, and secure biometric authentication for government use.',
    tags: ['Flutter', 'Python', 'TensorFlow', 'Spring Boot'],
    img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=700&q=80',
    live: '#',
    github: '#',
    featured: false,
  },
  {
    type: 'mobile',
    title: 'Liyu Social App',
    desc: 'Feature-rich social networking app with stories, real-time messaging, media sharing, and push notifications built for Ethiopian users.',
    tags: ['Flutter', 'Firebase', 'Dart', 'FCM'],
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=700&q=80',
    live: '#',
    github: '#',
    featured: false,
  },
]

const TABS = ['All', 'Web', 'Mobile']

const GlobeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

const PhoneIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
)

const ExternalIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
)

function ProjectCard({ p, dark, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`group rounded-2xl overflow-hidden border transition-all duration-500 flex flex-col ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${
        dark
          ? 'bg-white/4 border-white/8 hover:border-violet-500/50 hover:bg-white/6'
          : 'bg-white border-gray-200 hover:border-violet-400 shadow-sm hover:shadow-lg'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={p.img}
          alt={p.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Type badge */}
        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
          p.type === 'mobile'
            ? 'bg-blue-500/20 border border-blue-400/40 text-blue-300'
            : 'bg-violet-500/20 border border-violet-400/40 text-violet-300'
        }`}>
          {p.type === 'mobile' ? <PhoneIcon /> : <GlobeIcon />}
          {p.type === 'mobile' ? 'Mobile App' : 'Web App'}
        </div>

        {/* Action buttons — appear on hover */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <a
            href={p.live}
            title="Live Demo"
            className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-violet-600 hover:border-violet-500 transition-all duration-200"
          >
            <ExternalIcon />
          </a>
          <a
            href={p.github}
            title="GitHub"
            className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-violet-600 hover:border-violet-500 transition-all duration-200"
          >
            <GithubIcon />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex gap-1.5 flex-wrap mb-3">
          {p.tags.map(t => (
            <span key={t} className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              dark ? 'bg-violet-500/15 text-violet-300 border border-violet-500/20' : 'bg-violet-50 text-violet-700 border border-violet-200'
            }`}>{t}</span>
          ))}
        </div>

        <h3 className={`font-bold text-lg mb-2 leading-snug ${dark ? 'text-white' : 'text-gray-900'}`}>{p.title}</h3>
        <p className={`text-sm leading-relaxed flex-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{p.desc}</p>

        {/* Footer links */}
        <div className={`flex items-center gap-4 mt-4 pt-4 border-t ${dark ? 'border-white/8' : 'border-gray-100'}`}>
          <a href={p.live} className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${dark ? 'text-gray-400 hover:text-violet-400' : 'text-gray-500 hover:text-violet-600'}`}>
            <ExternalIcon /> Live Demo
          </a>
          <a href={p.github} className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${dark ? 'text-gray-400 hover:text-violet-400' : 'text-gray-500 hover:text-violet-600'}`}>
            <GithubIcon /> Source Code
          </a>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsSection({ theme }) {
  const dark = theme === 'dark'
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('All')

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const filtered = activeTab === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.type === activeTab.toLowerCase())

  return (
    <section id="projects" className="relative z-10 py-28 px-6">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        {/* Header */}
        <h2 className={`text-4xl md:text-5xl font-bold text-center mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
          Featured <span className="text-violet-400">Projects</span>
        </h2>
        <p className={`text-center mb-10 max-w-2xl mx-auto text-base ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
          A selection of web and mobile projects — each built with a focus on performance, clean architecture, and real-world impact.
        </p>

        {/* Filter tabs */}
        <div className="flex justify-center mb-10">
          <div className={`flex gap-1 p-1 rounded-full border ${dark ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'}`}>
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === tab
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-500/30'
                    : dark
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab === 'Web' && <GlobeIcon />}
                {tab === 'Mobile' && <PhoneIcon />}
                {tab}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab
                    ? 'bg-white/20 text-white'
                    : dark ? 'bg-white/10 text-gray-400' : 'bg-gray-200 text-gray-500'
                }`}>
                  {tab === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.type === tab.toLowerCase()).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <ProjectCard key={p.title} p={p} dark={dark} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="https://github.com/Abelink2119"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-violet-600 hover:bg-violet-500 active:scale-95 text-white font-medium transition-all duration-200 shadow-lg shadow-violet-500/25"
          >
            <GithubIcon />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
