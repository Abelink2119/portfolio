import { useEffect, useRef, useState } from 'react'

// ── Abel's skill data ───────────────────────────────────────────
const SKILL_SETS = {
  All: [
    { name: 'HTML/CSS',      level: 95, desc: 'Web markup & styling fundamentals',   used: 'All web projects' },
    { name: 'JavaScript',    level: 90, desc: 'Core web scripting language',         used: 'All frontend projects' },
    { name: 'React',         level: 90, desc: 'Component-based UI library',          used: 'SaaS Landing, Orbit Dashboard, Hulu Web' },
    { name: 'TypeScript',    level: 85, desc: 'Typed JavaScript superset',           used: 'Orbit Dashboard, Fayda-ID' },
    { name: 'Tailwind CSS',  level: 90, desc: 'Utility-first CSS framework',         used: 'All web projects' },
    { name: 'Next.js',       level: 80, desc: 'Full-stack React framework with SSR', used: 'Hulu Web, E-commerce Platform' },
    { name: 'Node.js',       level: 80, desc: 'Server-side JavaScript runtime',      used: 'Gebeta API, Hulu backend' },
    { name: 'Express',       level: 75, desc: 'Minimal Node.js web framework',       used: 'REST APIs across all projects' },
    { name: 'MongoDB',       level: 70, desc: 'NoSQL document database',             used: 'Gebeta, Hulu' },
    { name: 'PostgreSQL',    level: 65, desc: 'Powerful open-source relational DB',  used: 'Fayda-ID Check, E-commerce' },
    { name: 'MS SQL',        level: 70, desc: 'Microsoft SQL Server relational DB',  used: 'Enterprise backend projects' },
    { name: 'GraphQL',       level: 60, desc: 'Flexible API query language',         used: 'Orbit Dashboard' },
    { name: 'Git/GitHub',    level: 90, desc: 'Version control & collaboration',     used: 'All projects' },
    { name: 'Docker',        level: 72, desc: 'Container & DevOps platform',         used: 'CI/CD pipelines, all deployments' },
    { name: 'Figma',         level: 75, desc: 'UI/UX design & prototyping',          used: 'Liyu, Gebeta design' },
    { name: 'VS Code',       level: 95, desc: 'Primary code editor',                 used: 'All projects' },
    { name: 'IntelliJ IDEA', level: 80, desc: 'Java/Spring IDE by JetBrains',        used: 'Spring Boot projects' },
    { name: 'React Native',  level: 82, desc: 'Cross-platform mobile apps',          used: 'Gebeta, Hulu, Liyu' },
    { name: 'Flutter',       level: 78, desc: 'Cross-platform mobile UI toolkit',    used: 'Liyu, Fayda-ID Check' },
    { name: 'Python',        level: 75, desc: 'AI/ML pipelines & scripting',         used: 'Fayda-ID liveness detection' },
  ],
  Frontend: [
    { name: 'HTML/CSS',      level: 95, desc: 'Web markup & styling fundamentals',   used: 'All web projects' },
    { name: 'JavaScript',    level: 90, desc: 'Core web scripting language',         used: 'All frontend projects' },
    { name: 'React',         level: 90, desc: 'Component-based UI library',          used: 'SaaS Landing, Orbit Dashboard' },
    { name: 'TypeScript',    level: 85, desc: 'Typed JavaScript superset',           used: 'Orbit Dashboard, Fayda-ID' },
    { name: 'Tailwind CSS',  level: 90, desc: 'Utility-first CSS framework',         used: 'All web projects' },
    { name: 'Next.js',       level: 80, desc: 'Full-stack React framework with SSR', used: 'Hulu Web, E-commerce' },
    { name: 'React Native',  level: 82, desc: 'Cross-platform mobile apps',          used: 'Gebeta, Hulu, Liyu' },
    { name: 'Flutter',       level: 78, desc: 'Cross-platform mobile UI toolkit',    used: 'Liyu, Fayda-ID Check' },
  ],
  Backend: [
    { name: 'Node.js',     level: 80, desc: 'Server-side JavaScript runtime',        used: 'Gebeta API, Hulu backend' },
    { name: 'Express',     level: 75, desc: 'Minimal Node.js web framework',         used: 'REST APIs across all projects' },
    { name: 'Python',      level: 75, desc: 'AI/ML pipelines & scripting',           used: 'Fayda-ID liveness detection' },
    { name: 'GraphQL',     level: 60, desc: 'Flexible API query language',           used: 'Orbit Dashboard' },
    { name: 'Spring Boot', level: 70, desc: 'Java enterprise framework',             used: 'Fayda-ID backend services' },
    { name: 'REST APIs',   level: 90, desc: 'RESTful API design & integration',      used: 'All backend projects' },
    { name: 'JWT / Auth',  level: 82, desc: 'Authentication & authorization',        used: 'Fayda-ID, Hulu, Gebeta' },
    { name: 'WebSockets',  level: 72, desc: 'Real-time bidirectional communication', used: 'Hulu AI chat, Gebeta tracking' },
  ],
  Database: [
    { name: 'MongoDB',    level: 70, desc: 'NoSQL document database',               used: 'Gebeta, Hulu' },
    { name: 'PostgreSQL', level: 65, desc: 'Powerful open-source relational DB',    used: 'Fayda-ID Check, E-commerce' },
    { name: 'MySQL',      level: 70, desc: 'Popular relational database',           used: 'E-commerce Platform' },
    { name: 'MS SQL',     level: 70, desc: 'Microsoft SQL Server relational DB',    used: 'Enterprise backend projects' },
    { name: 'Firebase',   level: 75, desc: 'Real-time NoSQL & auth platform',       used: 'Liyu, Fayda-ID mobile' },
  ],
  Tools: [
    { name: 'Git/GitHub', level: 90, desc: 'Version control & collaboration',       used: 'All projects' },
    { name: 'Docker',     level: 72, desc: 'Container & DevOps platform',           used: 'CI/CD pipelines, all deployments' },
    { name: 'Figma',      level: 75, desc: 'UI/UX design & prototyping',            used: 'Liyu, Gebeta design' },
    { name: 'VS Code',    level: 95, desc: 'Primary code editor',                   used: 'All projects' },
    { name: 'IntelliJ IDEA', level: 80, desc: 'Java/Spring IDE by JetBrains',       used: 'Spring Boot projects' },
    { name: 'Postman',    level: 88, desc: 'API testing & documentation',           used: 'All backend projects' },
    { name: 'Swagger',    level: 80, desc: 'API design & documentation',            used: 'Fayda-ID, Hulu APIs' },
  ],
}

const TABS = ['All', 'Frontend', 'Backend', 'Database', 'Tools']

// ── Animated skill bar ──────────────────────────────────────────
function SkillBar({ skill, dark, index, trigger }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setWidth(0)
    const t = setTimeout(() => setWidth(skill.level), 80 + index * 40)
    return () => clearTimeout(t)
  }, [skill, trigger])

  return (
    <div
      className={`px-4 py-3 rounded-xl border transition-all duration-200 ${
        dark
          ? 'bg-white/5 border-white/10 hover:border-violet-500/50 hover:bg-violet-500/5'
          : 'bg-white border-gray-200 hover:border-violet-300 shadow-sm hover:shadow-md'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-semibold ${dark ? 'text-gray-200' : 'text-gray-800'}`}>{skill.name}</span>
        <span className="text-violet-400 text-xs font-bold">{skill.level}%</span>
      </div>
      <div className={`h-1.5 rounded-full overflow-hidden ${dark ? 'bg-white/10' : 'bg-gray-100'}`}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400"
          style={{ width: `${width}%`, transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </div>
    </div>
  )
}

// ── Radar chart ─────────────────────────────────────────────────
function RadarChart({ skills, dark, hoveredIdx, onHover }) {
  const SIZE = 420
  const CX = SIZE / 2
  const CY = SIZE / 2
  const R = 150
  const n = skills.length
  const levels = [20, 40, 60, 80, 100]

  const angle = (i) => (Math.PI * 2 * i) / n - Math.PI / 2
  const pt = (i, pct) => ({
    x: CX + (pct / 100) * R * Math.cos(angle(i)),
    y: CY + (pct / 100) * R * Math.sin(angle(i)),
  })
  const labelPt = (i) => {
    const r = R + 30
    return { x: CX + r * Math.cos(angle(i)), y: CY + r * Math.sin(angle(i)) }
  }
  const gridPoly = (pct) =>
    skills.map((_, i) => { const p = pt(i, pct); return `${p.x},${p.y}` }).join(' ')
  const dataPoly = skills.map((s, i) => { const p = pt(i, s.level); return `${p.x},${p.y}` }).join(' ')

  // tooltip position — keep inside SVG
  const tooltipFor = (i) => {
    const p = pt(i, skills[i].level)
    const lp = labelPt(i)
    const tx = lp.x > CX ? lp.x - 10 : lp.x - 150
    const ty = lp.y > CY ? lp.y + 10 : lp.y - 70
    return { tx: Math.max(5, Math.min(SIZE - 165, tx)), ty: Math.max(5, Math.min(SIZE - 80, ty)), p }
  }

  return (
    <div className="relative w-full flex justify-center">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full max-w-lg"
        style={{ overflow: 'visible' }}
      >
        {/* Grid rings */}
        {levels.map(l => (
          <polygon key={l} points={gridPoly(l)} fill="none"
            stroke={dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'} strokeWidth="1" />
        ))}
        {/* Axis spokes */}
        {skills.map((_, i) => {
          const p = pt(i, 100)
          return <line key={i} x1={CX} y1={CY} x2={p.x} y2={p.y}
            stroke={dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'} strokeWidth="1" />
        })}
        {/* % labels on first spoke */}
        {levels.map(l => {
          const p = pt(0, l)
          return (
            <text key={l} x={p.x + 4} y={p.y} fontSize="8"
              fill={dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)'}
              dominantBaseline="middle">{l}%</text>
          )
        })}
        {/* Filled polygon */}
        <polygon points={dataPoly}
          fill="rgba(139,92,246,0.22)" stroke="#8b5cf6" strokeWidth="2" strokeLinejoin="round" />
        {/* Hover line from center to hovered point */}
        {hoveredIdx !== null && (() => {
          const p = pt(hoveredIdx, skills[hoveredIdx].level)
          return <line x1={CX} y1={CY} x2={p.x} y2={p.y}
            stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeDasharray="4 3" />
        })()}
        {/* Dots + labels */}
        {skills.map((s, i) => {
          const p = pt(i, s.level)
          const lp = labelPt(i)
          const active = hoveredIdx === i
          return (
            <g key={i} onMouseEnter={() => onHover(i)} onMouseLeave={() => onHover(null)} className="cursor-pointer">
              {/* Large invisible hit area */}
              <circle cx={p.x} cy={p.y} r={24} fill="transparent" />
              {/* Glow ring */}
              {active && (
                <circle cx={p.x} cy={p.y} r={14}
                  fill="rgba(139,92,246,0.18)" stroke="rgba(139,92,246,0.4)" strokeWidth="1" />
              )}
              {/* Dot */}
              <circle cx={p.x} cy={p.y} r={active ? 7 : 4.5}
                fill={active ? '#8b5cf6' : (dark ? '#13111e' : '#fff')}
                stroke={active ? '#c4b5fd' : '#8b5cf6'} strokeWidth="2"
                style={{ transition: 'r 0.15s' }} />
              {/* Label hit area */}
              <rect x={lp.x - 40} y={lp.y - 11} width={80} height={22} fill="transparent" />
              <text x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle"
                fontSize="10.5" fontWeight={active ? '700' : '500'}
                fill={active ? '#a78bfa' : (dark ? 'rgba(255,255,255,0.72)' : 'rgba(0,0,0,0.65)')}>
                {s.name}
              </text>
            </g>
          )
        })}
        {/* Tooltip inside SVG */}
        {hoveredIdx !== null && (() => {
          const s = skills[hoveredIdx]
          const { tx, ty } = tooltipFor(hoveredIdx)
          return (
            <g>
              <rect x={tx} y={ty} width={160} height={72} rx="8"
                fill={dark ? '#0f0e1a' : '#fff'}
                stroke="#7c3aed" strokeWidth="1.2"
                style={{ filter: 'drop-shadow(0 4px 16px rgba(139,92,246,0.25))' }} />
              <text x={tx + 10} y={ty + 18} fontSize="11" fontWeight="700" fill="#a78bfa">{s.name}</text>
              <text x={tx + 10} y={ty + 33} fontSize="9.5" fill={dark ? '#9ca3af' : '#6b7280'}>{s.desc}</text>
              <text x={tx + 10} y={ty + 47} fontSize="9" fill={dark ? '#6b7280' : '#9ca3af'}>
                <tspan fill={dark ? '#d1d5db' : '#374151'}>Used in: </tspan>{s.used.length > 28 ? s.used.slice(0, 28) + '…' : s.used}
              </text>
              <text x={tx + 10} y={ty + 61} fontSize="9.5" fill="#a78bfa" fontWeight="600">
                Proficiency: {s.level}%
              </text>
            </g>
          )
        })()}
      </svg>
    </div>
  )
}

// ── Main section ────────────────────────────────────────────────
export default function SkillsSection({ theme }) {
  const dark = theme === 'dark'
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('All')
  const [hoveredIdx, setHoveredIdx] = useState(null)
  // trigger key forces bar re-animation on tab change
  const [barKey, setBarKey] = useState(0)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const handleTab = (tab) => {
    setActiveTab(tab)
    setHoveredIdx(null)
    setBarKey(k => k + 1)
  }

  const skills = SKILL_SETS[activeTab]

  return (
    <section id="skills" className="relative z-10 py-28 px-6">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {/* Heading */}
        <h2 className={`text-4xl md:text-5xl font-bold text-center mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
          My <span className="text-violet-400">Skills</span>
        </h2>
        <p className={`text-center mb-10 max-w-xl mx-auto text-sm leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
          Filter by category to explore specific areas of expertise.
        </p>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 flex-wrap mb-10">
          {TABS.map(tab => (
            <button key={tab} onClick={() => handleTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                  : dark
                    ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                    : 'bg-gray-100 text-gray-600 hover:bg-violet-50 hover:text-violet-600 border border-gray-200'
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* ── Skill bars (TOP) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-16">
          {skills.map((s, i) => (
            <SkillBar key={`${activeTab}-${s.name}`} skill={s} dark={dark} index={i} trigger={barKey} />
          ))}
        </div>

        {/* ── Tech Stack Heatmap (BOTTOM) ── */}
        <div className={`rounded-2xl border p-6 md:p-10 ${dark ? 'bg-white/3 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
          <h3 className={`text-2xl md:text-3xl font-bold text-center mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
            Tech Stack <span className="text-violet-400">Heatmap</span>
          </h3>
          {/* Gradient underline */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-0.5 rounded-full bg-gradient-to-r from-violet-600 to-blue-500" />
          </div>
          <p className={`text-center text-sm mb-8 max-w-lg mx-auto leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            Interactive visualization of my technical expertise across different domains.
            Hover on the data points to see details about each technology.
          </p>

          <RadarChart skills={skills} dark={dark} hoveredIdx={hoveredIdx} onHover={setHoveredIdx} />

          {/* Legend */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="w-3 h-3 rounded-sm bg-violet-500/50 border border-violet-500" />
            <span className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Proficiency</span>
          </div>
          <p className={`text-center text-xs mt-4 ${dark ? 'text-gray-600' : 'text-gray-400'}`}>
            Each point represents my proficiency level with a technology, based on experience and project usage.
            <br />Filter by category to focus on specific areas of expertise.
          </p>
        </div>

      </div>
    </section>
  )
}
