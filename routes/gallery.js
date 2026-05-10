import express from 'express'
import Gallery from '../models/Gallery.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

// Get all gallery items (public)
router.get('/', async (req, res) => {
  try {
    const items = await Gallery.find({ isVisible: true }).sort({ order: 1 })
    res.json(items)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all (admin)
router.get('/all', auth, async (req, res) => {
  try {
    const items = await Gallery.find().sort({ order: 1 })
    res.json(items)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Add gallery item
router.post('/', auth, async (req, res) => {
  try {
    const item = new Gallery(req.body)
    await item.save()
    res.status(201).json(item)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update gallery item
router.put('/:id', auth, async (req, res) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(item)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete gallery item
router.delete('/:id', auth, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id)
    res.json({ message: 'Gallery item deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router