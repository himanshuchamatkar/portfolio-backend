import express from 'express'
import Project from '../models/Project.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

// Get all projects (public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ isVisible: true }).sort({ order: 1 })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all projects including hidden (admin)
router.get('/all', auth, async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create project
router.post('/', auth, async (req, res) => {
  try {
    const project = new Project(req.body)
    await project.save()
    res.status(201).json(project)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update project
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(project)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete project
router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    res.json({ message: 'Project deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router