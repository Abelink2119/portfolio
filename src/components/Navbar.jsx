import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'

const links = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Certifications', 'Contact']

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const dark = theme === 'dark'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled
        ? dark
          ? 'bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/10'
          : 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <span className="text-lg font-bold cursor-default select-none">
          <span className={dark ? 'text-white' : 'text-gray-900'}>abel's</span>
          <span className="text-violet-500"> Portfolio</span>
        </span>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {links.map(l => (
            <li key={l}>
              <button
                onClick={() => go(l)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-violet-400 cursor-pointer ${
                  dark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {l}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden flex flex-col gap-1.5 p-1 cursor-pointer ${dark ? 'text-gray-300' : 'text-gray-700'}`}
            aria-label="Menu"
          >
            <span className="block w-5 h-0.5 bg-current rounded" />
            <span className="block w-5 h-0.5 bg-current rounded" />
            <span className="block w-5 h-0.5 bg-current rounded" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className={`md:hidden px-6 pb-5 flex flex-col gap-1 ${
          dark ? 'bg-[#0a0a0f]/95 border-t border-white/10' : 'bg-white/95 border-t border-gray-200'
        }`}>
          {links.map(l => (
            <button
              key={l}
              onClick={() => go(l)}
              className={`text-left py-2.5 text-sm font-medium transition-colors hover:text-violet-400 cursor-pointer ${
                dark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
