import mongoose from 'mongoose'

const LeadershipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  org: { type: String, required: true },
  date: { type: String },
  icon: { type: String, default: '🏆' },
  order: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.model('Leadership', LeadershipSchema)