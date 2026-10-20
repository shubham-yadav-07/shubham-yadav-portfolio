import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import { ArrowRight, BarChart3, Brain, Code2, Download, MapPin, Sparkles, Award, FolderGit2, GraduationCap } from 'lucide-react'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { certifications } from '@/data/certifications'
import { sgpa } from '@/data/education'
import { useFinePointer } from '@/hooks/useFinePointer'
import HoloGlobe from './HoloGlobe'
import PixelMountain from './PixelMountain'
import SocialLinks from './SocialLinks'
import TiltCard from './TiltCard'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

/** Floating tag that drifts with the mouse at its own depth. */
function Chip({
  label,
  Icon,
  className,
  depth,
  mx,
  my,
  delay = '0s',
}: {
  label: string
  Icon: typeof Brain
  className: string
  depth: number
  mx: ReturnType<typeof useSpring>
  my: ReturnType<typeof useSpring>
  delay?: string
}) {
  const x = useTransform(mx, (v: number) => v * depth)
  const y = useTransform(my, (v: number) => v * depth)
  return (
    <motion.div style={{ x, y }} className={`absolute z-20 ${className}`}>
      <div
        className="animate-float-slow flex items-center gap-2 rounded-2xl border border-accent/50 bg-navy-900/90 px-3 py-2 shadow-glow backdrop-blur-md sm:gap-3 sm:px-4 sm:py-3"
        style={{ animationDelay: delay }}
      >
        <Icon size={20} className="text-accent" aria-hidden="true" />
        <span className="font-display text-xs font-bold tracking-wide text-white sm:text-sm">{label}</span>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const fine = useFinePointer()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, { stiffness: 80, damping: 18 })
  const my = useSpring(rawY, { stiffness: 80, damping: 18 })

  useEffect(() => {
    if (!fine) return
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2)
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [fine, rawX, rawY])

  const photoX = useTransform(mx, (v: number) => v * -8)
  const photoY = useTransform(my, (v: number) => v * -8)
  const codeX = useTransform(mx, (v: number) => v * 14)
  const codeY = useTransform(my, (v: number) => v * 14)

  const latest = sgpa[sgpa.length - 1]
  // Every number below is computed from the data files, nothing is hand-typed or invented
  const stats = [
    { Icon: FolderGit2, value: String(projects.length), label: 'Projects' },
    { Icon: Award, value: String(certifications.length), label: 'Certifications' },
    { Icon: GraduationCap, value: latest.value.toFixed(2), label: `Sem ${latest.sem} SGPA` },
    { Icon: MapPin, value: 'India', label: 'Based' },
  ]

  return (
    <section id="home" aria-label="Introduction" className="relative flex min-h-[100svh] items-center overflow-x-clip pb-16 pt-24 sm:pt-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        {/* Left: copy */}
        <motion.div variants={container} initial="hidden" animate="show" className="order-2 lg:order-1">
          <motion.p variants={item} className="mb-4 flex items-center gap-2 text-lg text-ink sm:text-xl">
            Hello, I&apos;m
            <span className="inline-block origin-[70%_70%] animate-wave" aria-hidden="true">
              👋
            </span>
          </motion.p>

          <motion.h1 variants={item} className="font-display text-[3.1rem] font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-[5.4rem]">
            Shubham
            <span className="block text-accent">Yadav</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 text-2xl font-medium text-white sm:text-3xl">
            I turn <span className="text-accent2">data</span> into <span className="font-semibold text-accent">useful</span> experiences.
          </motion.p>

          <motion.p variants={item} className="mt-4 font-medium text-ink">
            AI/ML Enthusiast <span className="text-ink-faint">|</span> Data Analyst <span className="text-ink-faint">|</span> Full-Stack Developer
          </motion.p>

          <motion.p variants={item} className="mt-3 max-w-xl text-base leading-relaxed text-ink-muted">
            {profile.intro}
          </motion.p>

          <motion.p variants={item} className="mt-3 max-w-xl text-xs leading-relaxed text-ink-faint">
            {profile.headline}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" data-magnetic className="btn-primary">
              <Sparkles size={16} aria-hidden="true" />
              Explore Projects
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href={profile.resumeUrl} download={profile.resumeFileName} data-magnetic className="btn-ghost">
              <Download size={16} aria-hidden="true" />
              Download Resume
            </a>
          </motion.div>

          <motion.dl variants={item} className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-6 sm:grid-cols-4">
            {stats.map(({ Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon size={22} className="shrink-0 text-accent2" aria-hidden="true" />
                <div>
                  <dd className="font-display text-xl font-bold leading-none text-white">{value}</dd>
                  <dt className="mt-1 text-xs text-ink-muted">{label}</dt>
                </div>
              </div>
            ))}
          </motion.dl>

          <motion.div variants={item} className="mt-7">
            <SocialLinks />
          </motion.div>
        </motion.div>

        {/* Right: photo frame with orbiting globe, floating tags and extras */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1 mx-auto w-full max-w-[19rem] sm:max-w-[25rem] lg:order-2 lg:max-w-[28rem]"
        >
          <HoloGlobe className="pointer-events-none absolute left-1/2 top-1/2 h-[170%] w-[170%] -translate-x-1/2 -translate-y-1/2 opacity-70" />

          <motion.div style={{ x: photoX, y: photoY }} className="relative z-10">
            <div className="animate-float">
              <TiltCard max={8} glare={false} className="rounded-[1.75rem]">
                <figure className="frame-grad relative overflow-hidden rounded-[1.75rem] shadow-glow">
                  <img
                    src="/assets/profile-640.webp"
                    srcSet="/assets/profile-640.webp 640w, /assets/profile-960.webp 960w"
                    sizes="(max-width: 640px) 19rem, 28rem"
                    width={640}
                    height={800}
                    alt="Professional portrait of Shubham Yadav in a navy blazer and white shirt"
                    className="block aspect-[4/5] w-full rounded-[1.4rem] object-cover object-top"
                    fetchPriority="high"
                    decoding="async"
                    draggable={false}
                  />
                </figure>
              </TiltCard>
            </div>
          </motion.div>

          <Chip label="AI / ML" Icon={Brain} mx={mx} my={my} depth={22} className="-left-3 top-[18%] sm:-left-10" />
          <Chip label="DATA ANALYTICS" Icon={BarChart3} mx={mx} my={my} depth={30} delay="1.2s" className="-right-3 top-[34%] sm:-right-12" />
          <Chip label="FULL-STACK" Icon={Code2} mx={mx} my={my} depth={18} delay="2.1s" className="-left-2 top-[62%] sm:-left-14" />

          {/* code snippet */}
          <motion.pre
            style={{ x: codeX, y: codeY }}
            aria-hidden="true"
            className="absolute -top-16 right-0 z-0 hidden font-mono text-[0.7rem] leading-snug text-ink-faint md:block lg:-right-10"
          >
            {`const developer = {\n  passion: 'build',\n  learn: true,\n  impact: 'real',\n};`}
          </motion.pre>

          {/* handwritten note + mountain */}
          <div className="pointer-events-none absolute -bottom-6 -right-2 z-20 hidden w-44 sm:block lg:-right-10 lg:w-52">
            <p className="absolute -top-12 left-2 -rotate-6 font-hand text-2xl leading-6 text-white">
              Better Data,
              <br />
              Bigger Impact
            </p>
            <svg viewBox="0 0 60 40" className="absolute -top-2 left-0 h-8 w-12 text-accent" fill="none" aria-hidden="true">
              <path d="M52 4C40 6 20 14 12 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 26l6 9 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <PixelMountain className="mt-6 w-full" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
