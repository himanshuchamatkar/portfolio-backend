import express from 'express'
import nodemailer from 'nodemailer'
import Contact from '../models/Contact.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'himanshuchamatkar91@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
})

// Get all messages (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 })
    res.json(messages)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get unread count
router.get('/unread', auth, async (req, res) => {
  try {
    const count = await Contact.countDocuments({ isRead: false })
    res.json({ count })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Public: Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body
    const contact = new Contact({ name, email, message })
    await contact.save()

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER || 'himanshuchamatkar91@gmail.com',
      to: 'himanshuchamatkar91@gmail.com',
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log('Email error:', error)
      else console.log('Email sent:', info.response)
    })

    res.status(201).json({ message: 'Message sent successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Mark as read
router.put('/:id/read', auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true })
    res.json(contact)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Archive/delete
router.delete('/:id', auth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id)
    res.json({ message: 'Message deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router