import mongoose from 'mongoose'

const GallerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.model('Gallery', GallerySchema)