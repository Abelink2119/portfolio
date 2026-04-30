import { useEffect } from 'react'

const CV_DATA = {
  name: 'Abel Assefa',
  title: 'Software Engineer · Full Stack Developer · DevOps · Solution Architect',
  contact: [
    { icon: '✉', label: 'abelassefa2119@gmail.com' },
    { icon: '🔗', label: 'github.com/Abelink2119', href: 'https://github.com/Abelink2119' },
    { icon: '📍', label: 'Ethiopia' },
  ],
  summary:
    'Results-driven Software Engineer with 2+ years of experience building production-ready web, mobile, and cloud solutions. Specialized in full-stack development, DevOps automation, and scalable system architecture.',
  experience: [
    {
      role: 'Full Stack Developer',
      company: 'Freelance / Self-employed',
      period: '2023 – Present',
      points: [
        'Built and deployed full-stack web & mobile apps for clients across Ethiopia and remotely.',
        'Developed Gebeta (food delivery), Hulu (service provider), and Liyu (fashion) platforms.',
        'Architected REST APIs with Node.js/Express; managed PostgreSQL & MongoDB databases.',
        'Implemented CI/CD pipelines using Docker and GitHub Actions.',
      ],
    },
    {
      role: 'Mobile App Developer',
      company: 'Personal Projects',
      period: '2022 – 2023',
      points: [
        'Built cross-platform mobile apps using React Native and Flutter.',
        'Integrated AI features: liveness detection (Fayda-ID) and style recommendations (Liyu).',
        'Delivered apps with offline-first architecture and real-time tracking.',
      ],
    },
    {
      role: 'Frontend Developer',
      company: 'Internship / Junior Role',
      period: '2022',
      points: [
        'Developed responsive UIs with React and Tailwind CSS.',
        'Collaborated with design teams to implement pixel-perfect interfaces.',
        'Optimized web performance and accessibility across projects.',
      ],
    },
  ],
  skills: [
    { cat: 'Frontend',  items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React Native', 'Flutter'] },
    { cat: 'Backend',   items: ['Node.js', 'Express', 'Spring Boot', 'Python', 'REST APIs', 'GraphQL'] },
    { cat: 'Database',  items: ['PostgreSQL', 'MongoDB', 'MySQL', 'MS SQL', 'Firebase'] },
    { cat: 'DevOps',    items: ['Docker', 'GitHub Actions', 'AWS', 'GCP', 'CI/CD'] },
    { cat: 'Tools',     items: ['Git', 'VS Code', 'IntelliJ IDEA', 'Figma', 'Postman'] },
  ],
  education: {
    degree: 'BSc in Software Engineering',
    school: 'Woldia University',
    gpa: 'CGPA: 3.31',
    year: '2019 – 2023',
  },
  certifications: [
    { title: 'Android Developer Fundamentals', issuer: 'Udacity', year: '2026' },
    { title: 'Artificial Intelligence Fundamentals', issuer: 'Udacity', year: '2026' },
    { title: 'Meta React Native Specialization', issuer: 'Meta / Coursera', year: '2024' },
    { title: 'Full Stack Open', issuer: 'University of Helsinki', year: '2023' },
    { title: 'Node.js, Express, MongoDB Bootcamp', issuer: 'Udemy', year: '2023' },
  ],
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-violet-400">{title}</h3>
        <div className="flex-1 h-px bg-violet-500/20" />
      </div>
      {children}
    </div>
  )
}

export default function CVModal({ onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[999] flex flex-col"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(10px)' }}
    >
      {/* ── Top bar ── */}
      <div
        className="flex items-center justify-between px-4 md:px-6 py-3 shrink-0"
        style={{ background: 'rgba(15,10,30,0.98)', borderBottom: '1px solid rgba(139,92,246,0.2)' }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-violet-600/30 border border-violet-500/40 flex items-center justify-center">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-tight">Abel Assefa</p>
            <p className="text-gray-500 text-xs">Curriculum Vitae</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/Abel's Resume.pdf"
            download="Abel's Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 active:scale-95 text-white text-xs font-semibold transition-all duration-150"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span>Download</span>
          </a>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-150"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Scrollable CV content ── */}
      <div className="flex-1 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">

          {/* Header */}
          <div className="mb-8 pb-6 border-b border-white/10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-1">{CV_DATA.name}</h1>
            <p className="text-violet-400 text-sm font-medium mb-4">{CV_DATA.title}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
              {CV_DATA.contact.map((c, i) => (
                <span key={i} className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <span>{c.icon}</span>
                  {c.href
                    ? <a href={c.href} target="_blank" rel="noreferrer" className="hover:text-violet-400 transition-colors">{c.label}</a>
                    : <span>{c.label}</span>
                  }
                </span>
              ))}
            </div>
          </div>

          {/* Summary */}
          <Section title="Profile">
            <p className="text-gray-300 text-sm leading-relaxed">{CV_DATA.summary}</p>
          </Section>

          {/* Experience */}
          <Section title="Experience">
            <div className="flex flex-col gap-5">
              {CV_DATA.experience.map((exp, i) => (
                <div key={i} className="relative pl-4 border-l-2 border-violet-500/30">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-violet-500" />
                  <div className="flex flex-wrap items-start justify-between gap-1 mb-2">
                    <div>
                      <h4 className="text-white font-semibold text-sm">{exp.role}</h4>
                      <p className="text-violet-400 text-xs font-medium">{exp.company}</p>
                    </div>
                    <span className="text-gray-500 text-xs shrink-0">{exp.period}</span>
                  </div>
                  <ul className="flex flex-col gap-1">
                    {exp.points.map((pt, j) => (
                      <li key={j} className="flex gap-2 text-gray-400 text-xs leading-relaxed">
                        <span className="text-violet-500 shrink-0 mt-0.5">▸</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* Skills */}
          <Section title="Skills">
            <div className="flex flex-col gap-3">
              {CV_DATA.skills.map((s, i) => (
                <div key={i} className="flex flex-wrap items-start gap-2">
                  <span className="text-gray-500 text-xs w-16 shrink-0 pt-0.5">{s.cat}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {s.items.map((item, j) => (
                      <span key={j} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-500/15 text-violet-300 border border-violet-500/20">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Education */}
          <Section title="Education">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center text-lg shrink-0">🎓</div>
              <div>
                <h4 className="text-white font-semibold text-sm">{CV_DATA.education.degree}</h4>
                <p className="text-violet-400 text-xs font-medium">{CV_DATA.education.school}</p>
                <div className="flex gap-3 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-semibold">{CV_DATA.education.gpa}</span>
                  <span className="text-gray-500 text-xs">{CV_DATA.education.year}</span>
                </div>
              </div>
            </div>
          </Section>

          {/* Certifications */}
          <Section title="Certifications">
            <div className="flex flex-col gap-2">
              {CV_DATA.certifications.map((c, i) => (
                <div key={i} className="flex items-center justify-between gap-3 py-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-2.5">
                    <span className="text-violet-500 text-xs">◆</span>
                    <div>
                      <p className="text-white text-xs font-medium">{c.title}</p>
                      <p className="text-gray-500 text-xs">{c.issuer}</p>
                    </div>
                  </div>
                  <span className="text-gray-600 text-xs shrink-0">{c.year}</span>
                </div>
              ))}
            </div>
          </Section>

        </div>
      </div>
    </div>
  )
}
