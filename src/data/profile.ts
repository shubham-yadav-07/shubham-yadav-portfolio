/**
 * ============================================================
 *  PROFILE CONFIG  -  edit your personal details here.
 * ============================================================
 */

export const profile = {
  name: 'Shubham Yadav',
  shortName: 'SHUBHAM',
  headline:
    'Computer Science Engineering Student | AI/ML | Data Analytics | Software Development',
  roleTag: 'Aspiring Data Scientist & ML Engineer',
  location: 'Palghar, Maharashtra, India',
  email: 'shubhamyadav.pro@gmail.com',

  // Phone number you provided. Set to '' to hide it from the site completely.
  phoneDisplay: '+91 95291 91809',
  phoneTel: '+919529191809',

  intro:
    'I build practical AI/ML, data analytics and full-stack projects, from explainable healthcare models to offline-first logistics platforms. Currently in my final years of B.E. (AI & ML) and looking for internships where I can ship real work.',

  // Resume PDF: put your file at  public/resume/Shubham_Yadav_Resume.pdf
  resumeUrl: '/resume/Shubham_Yadav_Resume.pdf',
  resumeFileName: 'Shubham_Yadav_Resume.pdf',

  // Professional photo (used in Hero and About).
  // Replace public/assets/profile-960.webp (and profile-640.webp) to change the photo.
  // Set '' to show a labelled placeholder instead.
  photoUrl: '/assets/profile-960.webp',
}

export const socials = {
  github: 'https://github.com/shubham-yadav-07',
  linkedin: 'https://www.linkedin.com/in/shubham-yadav-11aa552aa',
  leetcode: 'https://leetcode.com/u/shubham123215',
  x: 'https://x.com/Shubham_Dev_07',
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
] as const
