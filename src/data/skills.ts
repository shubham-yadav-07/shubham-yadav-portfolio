export interface SkillGroup {
  title: string
  blurb: string
  accent: 'cyan' | 'violet'
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming',
    blurb: 'Languages I use for problem solving and building.',
    accent: 'cyan',
    items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C', 'C++', 'SQL'],
  },
  {
    title: 'Data Science & AI/ML',
    blurb: 'From data cleaning to explainable models.',
    accent: 'violet',
    items: [
      'Pandas',
      'NumPy',
      'scikit-learn',
      'Machine Learning',
      'Exploratory Data Analysis',
      'Data Visualization',
      'Matplotlib',
      'Seaborn',
      'OpenCV',
    ],
  },
  {
    title: 'Web Development',
    blurb: 'Front ends and APIs that talk to each other.',
    accent: 'cyan',
    items: ['HTML', 'CSS', 'React', 'FastAPI', 'Express.js', 'Node.js', 'REST APIs', 'JWT'],
  },
  {
    title: 'Databases & Tools',
    blurb: 'Where data lives and how I ship it.',
    accent: 'violet',
    items: ['MySQL', 'PostgreSQL', 'SQLite', 'MongoDB', 'Git', 'GitHub', 'Docker', 'Streamlit'],
  },
  {
    title: 'Cloud',
    blurb: 'Foundations from AWS Academy.',
    accent: 'cyan',
    items: ['AWS fundamentals'],
  },
]
