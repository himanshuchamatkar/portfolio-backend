import mongoose from 'mongoose'

const CertificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  org: { type: String, required: true },
  date: { type: String },
  icon: { type: String, default: '🎓' },
  link: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.model('Certification', CertificationSchema)