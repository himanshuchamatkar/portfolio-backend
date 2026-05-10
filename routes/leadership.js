import express from 'express'
import Leadership from '../models/Leadership.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const items = await Leadership.find().sort({ order: 1 })
    res.json(items)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const item = new Leadership(req.body)
    await item.save()
    res.status(201).json(item)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const item = await Leadership.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(item)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await Leadership.findByIdAndDelete(req.params.id)
    res.json({ message: 'Leadership item deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router