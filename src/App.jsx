import { useState, useEffect } from 'react'
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

export default function App() {
  const [theme, setTheme] = useState('dark')
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  // Always return to top on refresh
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className={`min-h-screen relative transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#0a0a0f]' : 'bg-[#f0f4ff]'
    }`}>
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
  )
}
