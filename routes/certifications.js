import express from 'express'
import Certification from '../models/Certification.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const certs = await Certification.find().sort({ order: 1 })
    res.json(certs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const cert = new Certification(req.body)
    await cert.save()
    res.status(201).json(cert)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const cert = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(cert)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await Certification.findByIdAndDelete(req.params.id)
    res.json({ message: 'Certification deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router