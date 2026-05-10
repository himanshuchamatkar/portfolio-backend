import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) return res.status(401).json({ error: 'No token, authorization denied' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
    const admin = await Admin.findById(decoded.id)
    if (!admin) return res.status(401).json({ error: 'Invalid token' })

    req.admin = admin
    next()
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' })
  }
}