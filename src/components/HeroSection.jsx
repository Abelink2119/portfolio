import heroPng from '../assets/me.jpg'

export default function HeroSection({ theme }) {
  const dark = theme === 'dark'

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center z-10 px-6 md:px-16 lg:px-24"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 animate-fade-up">

        {/* ── Left: text ── */}
        <div className="flex-1 text-left">
          <p className={`text-sm font-medium mb-3 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            Hello, I&apos;m
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4">
            <span className="text-violet-400">Abel</span>{' '}
            <span className={dark ? 'text-white' : 'text-gray-900'}>Assefa</span>
          </h1>

          <p className={`text-lg md:text-xl font-semibold mb-4 ${dark ? 'text-gray-200' : 'text-gray-700'}`}>
            Software Engineer | Full Stack Developer | DevOps Engineer | Solution Architect
          </p>

          <p className={`text-sm md:text-base mb-10 max-w-lg leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            Building scalable, production-ready solutions with modern tech — 2+ years of experience across web, mobile, and cloud.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-7 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 active:scale-95 text-white font-semibold transition-all duration-200 animate-pulse-glow cursor-pointer"
            >
              Contact Me
            </button>
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className={`px-7 py-3 rounded-lg border font-semibold transition-all duration-200 active:scale-95 cursor-pointer ${
                dark
                  ? 'border-white/25 text-white hover:bg-white/10'
                  : 'border-gray-300 text-gray-800 hover:bg-gray-100'
              }`}
            >
              View My Work
            </button>
          </div>
        </div>

        {/* ── Right: avatar circle ── */}
        <div className="shrink-0 flex items-center justify-center">
          <div className="animate-float relative w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-violet-600 via-violet-500 to-blue-500 flex items-center justify-center shadow-2xl shadow-violet-500/40">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600 to-blue-500 blur-2xl opacity-30 scale-110" />
            {/* Profile image */}
            <img
              src={heroPng}
              alt="Abel Assefa"
              className="relative w-full h-full rounded-full object-cover object-top"
            />
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className={`text-xs tracking-[0.2em] uppercase ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
          Scroll Down
        </span>
        {/* Mouse icon */}
        <div className={`w-6 h-9 rounded-full border-2 flex items-start justify-center pt-1.5 ${dark ? 'border-gray-600' : 'border-gray-400'}`}>
          <div className="w-1 h-2 rounded-full bg-violet-400 animate-scroll-bounce" />
        </div>
      </div>
    </section>
  )
}
