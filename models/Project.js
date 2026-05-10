import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  tech: [{ type: String }],
  github: { type: String },
  live: { type: String },
  featured: { type: Boolean, default: false },
  gradient: { type: String, default: 'from-cyan-400 to-blue-500' },
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.model('Project', ProjectSchema)