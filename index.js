import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
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