import mongoose from 'mongoose'

const SkillSchema = new mongoose.Schema({
  category: { type: String, required: true },
  icon: { type: String },
  skills: [{
    name: String,
    level: Number
  }],
  color: { type: String, default: 'from-yellow-400 to-orange-500' },
  order: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.model('Skill', SkillSchema)