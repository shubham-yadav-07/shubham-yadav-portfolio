/**
 * ============================================================
 *  PROJECTS CONFIG
 *  - github : repository URL (button only shows when set)
 *  - demo   : live demo URL (button only shows when set)
 *  - image  : optional thumbnail, e.g. '/assets/projects/polarlogix.webp'
 *             (put the file in public/assets/projects/)
 * ============================================================
 */

export type ProjectIcon =
  | 'snowflake'
  | 'heart'
  | 'ticket'
  | 'camera'
  | 'code'
  | 'vote'
  | 'shield'
  | 'coins'
  | 'brain'
  | 'database'

export type ProjectCategory = 'ai-ml' | 'data' | 'fullstack' | 'security'

export const categoryLabels: Record<ProjectCategory, string> = {
  'ai-ml': 'AI / ML',
  data: 'Data Analytics',
  fullstack: 'Full-stack',
  security: 'Security & Web3',
}

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  tags: string[]
  icon: ProjectIcon
  category: ProjectCategory
  accent: 'cyan' | 'violet'
  github: string
  demo: string
  image?: string
  note?: string
}

const GH = 'https://github.com/shubham-yadav-07'

export const projects: Project[] = [
  {
    id: 'healthlens-ai',
    title: 'HealthLens AI',
    tagline: 'Explainable diabetes risk analysis',
    description:
      'A healthcare analytics and educational risk-analysis platform covering diabetes risk assessment, exploratory data analysis, four-model machine learning comparison, and SHAP explainability.',
    tags: ['Python', 'scikit-learn', 'XGBoost', 'SHAP', 'Streamlit', 'EDA'],
    icon: 'heart',
    category: 'ai-ml',
    accent: 'violet',
    github: `${GH}/HealthLens-AI`,
    demo: '',
    note: 'Educational prototype. Outputs are not medical diagnoses.',
  },
  {
    id: 'polarlogix',
    title: 'POLARLOGIX',
    tagline: 'Offline-first expedition logistics',
    description:
      'An offline-first polar expedition logistics and asset management platform supporting cargo tracking, inventory, personnel movement, route planning, and emergency response.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'SQLite', 'JWT', 'IndexedDB', 'Docker', 'PWA'],
    icon: 'snowflake',
    category: 'fullstack',
    accent: 'cyan',
    github: `${GH}/POLARLOGIX`,
    demo: '',
  },
  {
    id: 'nextlytics',
    title: 'Nextlytics',
    tagline: 'AI-powered data analytics platform',
    description:
      'A next-generation analytics tool: upload a dataset and get exploratory analysis and ETL insights in one place for clearer decisions.',
    tags: ['React', 'Node.js', 'Data Analytics', 'ETL', 'EDA'],
    icon: 'database',
    category: 'data',
    accent: 'violet',
    github: `${GH}/Nexlyticx`,
    demo: '',
  },
  {
    id: 'syntax',
    title: 'Syntax',
    tagline: 'AI-assisted DSA code analysis',
    description:
      'An AI-assisted DSA analysis platform with time and space complexity analysis, optimization suggestions, and algorithm visualization.',
    tags: ['React', 'TypeScript', 'Node.js', 'FastAPI', 'AST Parsing', 'MongoDB'],
    icon: 'code',
    category: 'ai-ml',
    accent: 'cyan',
    github: `${GH}/Syntax`,
    demo: '',
  },
  {
    id: 'tn-elections-2026',
    title: 'TN Elections 2026 Analytics',
    tagline: 'Constituency-level election insights',
    description:
      'An election analytics project featuring exploratory analysis, K-Means clustering, constituency-level insights, and interactive visualizations.',
    tags: ['Python', 'Pandas', 'K-Means', 'Streamlit', 'Data Visualization'],
    icon: 'vote',
    category: 'data',
    accent: 'violet',
    github: `${GH}/TN-Elections-2026-Analytics`,
    demo: '',
  },
  {
    id: 'yatralens',
    title: 'YatraLens',
    tagline: 'AI travel media organizer',
    description:
      'An AI-powered travel media organization platform that uses Cloudinary AI capabilities to analyze, moderate, categorize, and organize travel photos.',
    tags: ['JavaScript', 'Cloudinary AI', 'Node.js', 'Hackathon'],
    icon: 'camera',
    category: 'ai-ml',
    accent: 'cyan',
    github: `${GH}/pixel-to-products-cloudinary-ai-hackathon-2026-clovesalients`,
    demo: '',
  },
  {
    id: 'deskline-crm',
    title: 'Deskline CRM',
    tagline: 'Customer support ticketing',
    description:
      'A customer-support ticketing CRM built with React, Express, and SQLite: create, search, filter, and update tickets with an internal note history.',
    tags: ['React', 'Vite', 'Express', 'SQLite', 'REST APIs'],
    icon: 'ticket',
    category: 'fullstack',
    accent: 'violet',
    github: `${GH}/deskline-support-crm`,
    demo: '',
  },
  {
    id: 'beyonder-ai',
    title: 'Beyonder AI',
    tagline: 'AI-focused cybersecurity platform',
    description:
      'An AI-focused cybersecurity platform concept involving threat detection, intelligent file monitoring, backup and recovery, and security analytics.',
    tags: ['React', 'Vite', 'TypeScript', 'FastAPI', 'Security Analytics'],
    icon: 'shield',
    category: 'security',
    accent: 'cyan',
    github: `${GH}/beyonder`,
    demo: '',
  },
  {
    id: 'ai-vulnerability-scanner',
    title: 'AI-Powered Vulnerability Scanner',
    tagline: 'AI-assisted vulnerability scanning',
    description:
      'An AI-assisted vulnerability scanning project focused on surfacing potential security issues for review.',
    tags: ['AI', 'Cybersecurity', 'Vulnerability Scanning'],
    icon: 'shield',
    category: 'security',
    accent: 'violet',
    github: `${GH}/AI-POWERD-VOLUNERBILITY-SCANNER-ADVANCED`,
    demo: '',
  },
  {
    id: 'startup-funding-dapp',
    title: 'Startup Funding DApp',
    tagline: 'On-chain startup funding',
    description:
      'A Solidity smart-contract DApp for startup funding with owner-based approval and direct disbursement, deployed via Remix with a MetaMask-connected frontend.',
    tags: ['Solidity', 'ethers.js', 'MetaMask', 'Express'],
    icon: 'coins',
    category: 'security',
    accent: 'violet',
    github: `${GH}/Startup-funding-DApp`,
    demo: '',
  },
  {
    id: 'metamind',
    title: 'MetaMind',
    tagline: 'Self-learning AI agent',
    description:
      'A self-learning AI agent built for a Meta hackathon using reinforcement-learning concepts, reward-based feedback loops and adaptive strategy selection.',
    tags: ['Python', 'Reinforcement Learning', 'Hackathon'],
    icon: 'brain',
    category: 'ai-ml',
    accent: 'cyan',
    github: `${GH}/Self-learning-ai`,
    demo: '',
  },
]
