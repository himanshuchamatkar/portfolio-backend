import express from 'express'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

const router = express.Router()

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email })
    if (!admin) return res.status(400).json({ error: 'Invalid credentials' })

    const isMatch = await admin.comparePassword(password)
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' })

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    res.json({ token, admin: { id: admin._id, username: admin.username, email: admin.email } })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Register (first time setup)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body
    
    const existing = await Admin.findOne({ email })
    if (existing) return res.status(400).json({ error: 'Admin already exists' })

    const admin = new Admin({ username, email, password })
    await admin.save()
    res.json({ message: 'Admin created successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Setup admin (one-time, no auth required)
router.post('/setup', async (req, res) => {
  try {
    const { username, email, password } = req.body
    
    const existing = await Admin.findOne({ email })
    if (existing) return res.json({ message: 'Admin already exists' })

    const admin = new Admin({ username, email, password })
    await admin.save()
    res.json({ message: 'Admin created successfully!', success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Check auth
router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) return res.status(401).json({ error: 'No token' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
    const admin = await Admin.findById(decoded.id).select('-password')
    if (!admin) return res.status(401).json({ error: 'Invalid token' })

    res.json(admin)
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
})

export default router