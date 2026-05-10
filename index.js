import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import multer from 'multer'
import path from 'path'
import contactRoutes from './routes/contact.js'
import projectRoutes from './routes/projects.js'
import skillRoutes from './routes/skills.js'
import galleryRoutes from './routes/gallery.js'
import authRoutes from './routes/auth.js'
import certificationRoutes from './routes/certifications.js'
import leadershipRoutes from './routes/leadership.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve uploaded images
app.use('/uploads', express.static('uploads'))

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }) // 5MB limit

// Upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }
  res.json({ 
    url: `/uploads/${req.file.filename}`,
    filename: req.file.filename
  })
})

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || `mongodb+srv://himanshu:himan2005@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority`

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/certifications', certificationRoutes)
app.use('/api/leadership', leadershipRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio API is running' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})