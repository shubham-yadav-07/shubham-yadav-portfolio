import { MotionConfig } from 'framer-motion'
import About from './components/About'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import Education from './components/Education'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Skills from './components/Skills'
import CursorEffects from './components/CursorEffects'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggle } = useTheme()
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="page-backdrop" aria-hidden="true" />
      <Navbar theme={theme} onToggleTheme={toggle} />
      <CursorEffects />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
