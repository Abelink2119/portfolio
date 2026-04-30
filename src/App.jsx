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

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [splash, setSplash] = useState(true)
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  const handleSplashDone = useCallback(() => setSplash(false), [])

  // Always return to top on refresh
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
        <Navbar theme={theme} toggleTheme={toggleTheme} />
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
