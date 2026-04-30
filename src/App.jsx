import { useState, useEffect, useCallback } from 'react'
import StarBackground from './components/StarBackground'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectsSection from './components/ProjectsSection'
import CertificationsSection from './components/CertificationsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import SplashScreen from './components/SplashScreen'

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [mode, setMode] = useState('system') // 'light' | 'dark' | 'system'
  const [theme, setTheme] = useState(getSystemTheme)
  const [splash, setSplash] = useState(true)
  const handleSplashDone = useCallback(() => setSplash(false), [])

  // Resolve actual theme whenever mode changes
  useEffect(() => {
    if (mode === 'system') {
      setTheme(getSystemTheme())
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = (e) => setTheme(e.matches ? 'dark' : 'light')
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    } else {
      setTheme(mode)
    }
  }, [mode])

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      {splash && <SplashScreen onDone={handleSplashDone} />}
      <div
        className={`min-h-screen relative transition-colors duration-500 ${
          theme === 'dark' ? 'bg-[#0a0a0f]' : 'bg-[#f0f4ff]'
        }`}
        style={{ opacity: splash ? 0 : 1, transition: 'opacity 0.5s ease' }}
      >
        <StarBackground theme={theme} />
        <Navbar theme={theme} mode={mode} setMode={setMode} />
        <HeroSection theme={theme} />
        <AboutSection theme={theme} />
        <SkillsSection theme={theme} />
        <ExperienceSection theme={theme} />
        <ProjectsSection theme={theme} />
        <CertificationsSection theme={theme} />
        <ContactSection theme={theme} />
        <Footer theme={theme} />
      </div>
    </>
  )
}
