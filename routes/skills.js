import express from 'express'
import Skill from '../models/Skill.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

// Get all skills (public)
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1 })
    res.json(skills)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create skill category
router.post('/', auth, async (req, res) => {
  try {
    const skill = new Skill(req.body)
    await skill.save()
    res.status(201).json(skill)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update skill category
router.put('/:id', auth, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(skill)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete skill category
router.delete('/:id', auth, async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id)
    res.json({ message: 'Skill deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router