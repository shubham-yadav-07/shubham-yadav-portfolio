/**
 * ============================================================
 *  CERTIFICATIONS CONFIG
 *  Add real verification / credential URLs in the `url` field.
 *  A "View credential" button only appears when `url` is not empty.
 * ============================================================
 */

export type CertKind = 'Award' | 'Certification' | 'Job simulation' | 'Internship'

export interface Certification {
  title: string
  issuer: string
  date: string
  kind: CertKind
  detail?: string
  url: string
}

export const achievementHighlight = {
  title: 'Second Runner-Up',
  event: 'Theem Hackathon 2025',
  detail: 'Smart India Hackathon internal selection round, awarded for innovation, problem solving and rapid prototyping.',
}

export const certifications: Certification[] = [
  {
    title: 'AI/ML for Geodata Analytics',
    issuer: 'ISRO × IIRS, Dehradun',
    date: 'August 2026',
    kind: 'Certification',
    detail: '10-hour online course',
    url: '',
  },
  {
    title: 'AWS Academy Graduate: Cloud Foundations',
    issuer: 'AWS Academy',
    date: 'March 2026',
    kind: 'Certification',
    url: '',
  },
  {
    title: 'Virtual Data Science with Python Trainee',
    issuer: 'YuvaIntern',
    date: 'September 2026',
    kind: 'Internship',
    detail: 'Certificate of Experience, virtual internship',
    url: '',
  },
  {
    title: 'Software Engineering Job Simulation',
    issuer: 'JPMorgan Chase & Co. × Forage',
    date: 'February 2026',
    kind: 'Job simulation',
    detail: 'Kafka, H2 database and REST API integration',
    url: '',
  },
  {
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte × Forage',
    date: 'February 2026',
    kind: 'Job simulation',
    detail: 'Data analysis and forensic technology',
    url: '',
  },
  {
    title: 'GenAI Powered Data Analytics Job Simulation',
    issuer: 'Tata × Forage',
    date: 'February 2026',
    kind: 'Job simulation',
    detail: 'Risk profiling and AI-driven collections strategy',
    url: '',
  },
  {
    title: 'Advanced Software Engineering Job Simulation',
    issuer: 'Walmart Global Tech × Forage',
    date: 'December 2025',
    kind: 'Job simulation',
    url: '',
  },
  {
    title: 'Green Skills & Artificial Intelligence',
    issuer: 'Edunet Foundation × AICTE × Shell',
    date: 'December 2025',
    kind: 'Certification',
    url: '',
  },
  {
    title: 'Data Visualisation: Empowering Business with Effective Insights',
    issuer: 'Tata × Forage',
    date: 'November 2025',
    kind: 'Job simulation',
    url: '',
  },
  {
    title: 'Data Science for Everyone (180 hours)',
    issuer: 'Reliance Foundation × Skill India',
    date: 'November 2025',
    kind: 'Certification',
    url: '',
  },
  {
    title: 'SOAR: AI for Educators',
    issuer: 'Microsoft × NCVET × Skill India',
    date: 'November 2025',
    kind: 'Certification',
    detail: 'NSQF Level 6, 40 hours',
    url: '',
  },
  {
    title: 'The Complete Python Bootcamp: Zero to Expert',
    issuer: 'Udemy',
    date: 'February 2025',
    kind: 'Certification',
    detail: '16 hours',
    url: '',
  },
  {
    title: 'JavaScript OOP: Mastering Modern Object-Oriented Programming',
    issuer: 'Udemy',
    date: 'February 2025',
    kind: 'Certification',
    detail: '4 hours',
    url: '',
  },
  {
    title: 'Python for Absolute Beginners',
    issuer: 'EC-Council',
    date: 'June 2024',
    kind: 'Certification',
    url: '',
  },
]
