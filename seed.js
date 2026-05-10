import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import Project from './models/Project.js'
import Skill from './models/Skill.js'
import Certification from './models/Certification.js'
import Leadership from './models/Leadership.js'
import Admin from './models/Admin.js'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || `mongodb+srv://himanshu:himan2005@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority`

const initialProjects = [
  {
    title: 'Phishing Detection Chrome Extension',
    category: 'Security',
    description: 'Real-time phishing detection with Node.js backend, MongoDB storage, and multi-factor URL analysis including domain age, keywords, form behavior, and external submissions via Puppeteer.',
    tech: ['Node.js', 'Express.js', 'MongoDB Atlas', 'Puppeteer', 'Chrome Extension'],
    github: 'https://github.com/himanshuchamatkar/phishing-detector',
    live: null,
    featured: true,
    gradient: 'from-cyan-400 to-blue-500',
    order: 1
  },
  {
    title: 'Explainable AI Intrusion Detection',
    category: 'Machine Learning',
    description: 'Real-time intrusion detection with network traffic analysis, ML-based attack classification, integrated Streamlit dashboard with SHAP-based explainability.',
    tech: ['Python', 'scikit-learn', 'SHAP', 'Streamlit'],
    github: 'https://github.com/himanshuchamatkar/explainable-ids',
    live: 'https://explainable-ids-framework-izkp6lirhnpftpexnx9ey2.streamlit.app/',
    featured: true,
    gradient: 'from-purple-400 to-pink-500',
    order: 2
  },
  {
    title: 'Stock Analysis & Decision System',
    category: 'Data Science',
    description: 'Stock analysis using technical indicators and custom scoring logic with interactive dashboard and live data pipeline for real-time market insights.',
    tech: ['Python', 'Pandas', 'Plotly/Dash', 'Streamlit'],
    github: 'https://github.com/himanshuchamatkar/sentiment-driven-stock-prediction',
    live: null,
    gradient: 'from-green-400 to-teal-500',
    order: 3
  },
  {
    title: '3D Volume Reconstruction',
    category: 'Computer Vision',
    description: '3D volumetric reconstruction from DICOM image slices with real-time rendering and adjustable opacity for layered visualization.',
    tech: ['VTK', 'Python', 'DICOM'],
    github: 'https://github.com/himanshuchamatkar/3D-Volume-Reconstruction-of-the-Knee-from-2D-CT-Slices',
    live: null,
    gradient: 'from-orange-400 to-red-500',
    order: 4
  },
  {
    title: 'Soil Moisture Analysis',
    category: 'Drone Imaging',
    description: 'Image-based soil moisture estimation pipeline using segmentation and region-wise classification from drone RGB data.',
    tech: ['NumPy', 'OpenCV', 'TensorFlow'],
    github: null,
    live: 'https://soil-moisture-rgb-analysis-rking2005.streamlit.app/',
    gradient: 'from-emerald-400 to-green-500',
    order: 5
  }
]

const initialSkills = [
  {
    category: 'Programming',
    icon: '⚡',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'JavaScript', level: 85 },
      { name: 'C/C++', level: 80 },
      { name: 'SQL', level: 85 }
    ],
    color: 'from-yellow-400 to-orange-500',
    order: 1
  },
  {
    category: 'Machine Learning',
    icon: '🧠',
    skills: [
      { name: 'TensorFlow', level: 90 },
      { name: 'PyTorch', level: 75 },
      { name: 'scikit-learn', level: 88 },
      { name: 'OpenCV', level: 85 }
    ],
    color: 'from-purple-400 to-pink-500',
    order: 2
  },
  {
    category: 'Web Development',
    icon: '🌐',
    skills: [
      { name: 'React', level: 80 },
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 88 },
      { name: 'Streamlit', level: 90 }
    ],
    color: 'from-cyan-400 to-blue-500',
    order: 3
  },
  {
    category: 'Tools & Platforms',
    icon: '🔧',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Linux', level: 85 },
      { name: 'MongoDB', level: 88 },
      { name: 'Docker', level: 70 }
    ],
    color: 'from-green-400 to-teal-500',
    order: 4
  }
]

const initialCertifications = [
  { title: 'Coding for Everyone: C and C++', org: 'Coursera', date: '2025', icon: '🎓', link: 'https://www.coursera.org/account/accomplishments/specialization/W3WQLSKT2Y9J', order: 1 },
  { title: 'Generative AI: Prompt Engineering', org: 'Coursera', date: '2025', icon: '🤖', link: 'https://www.coursera.org/account/accomplishments/verify/CLDK93Y93XKL', order: 2 },
  { title: 'Introduction to HTML, CSS & JavaScript', org: 'Coursera', date: '2025', icon: '🌐', link: 'https://www.coursera.org/account/accomplishments/verify/XX7FRCCY9DWN', order: 3 },
  { title: 'Python for Data Science, AI & Development', org: 'Coursera', date: '2025', icon: '🐍', link: 'https://www.coursera.org/account/accomplishments/verify/PJBEV7M6X29N', order: 4 }
]

const initialLeadership = [
  { title: 'President - IGNITRA 4.0', org: 'Multi-college tech & cultural fest', date: 'Dec 2025 - Feb 2026', icon: '🏆', order: 1 },
  { title: 'Technical Student Incharge', org: '3rd IEEE DMIHER Intl. Conference', date: '2025', icon: '🎤', order: 2 },
  { title: 'Treasurer - IGNITRA 3.0', org: 'Student Council (FEAT)', date: 'Jun 2024 - Jun 2025', icon: '💼', order: 3 },
  { title: 'Research Paper - 3D Volumetric Reconstruction', org: 'DMIHER 3rd International Conference', date: '2025', icon: '📄', order: 4 }
]

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Create admin if not exists
    const adminExists = await Admin.findOne({ email: 'admin@portfolio.com' })
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10)
      await Admin.create({
        username: 'admin',
        email: 'admin@portfolio.com',
        password: hashedPassword
      })
      console.log('✅ Admin created: admin@portfolio.com / admin123')
    }

    // Seed data
    await Project.deleteMany({})
    await Project.insertMany(initialProjects)
    console.log('✅ Projects seeded')

    await Skill.deleteMany({})
    await Skill.insertMany(initialSkills)
    console.log('✅ Skills seeded')

    await Certification.deleteMany({})
    await Certification.insertMany(initialCertifications)
    console.log('✅ Certifications seeded')

    await Leadership.deleteMany({})
    await Leadership.insertMany(initialLeadership)
    console.log('✅ Leadership seeded')

    console.log('🎉 Seed completed!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seed error:', error)
    process.exit(1)
  }
}

seed()