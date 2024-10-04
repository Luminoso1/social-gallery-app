import mongoose from 'mongoose'

const PhotoSchema = new mongoose.Schema(
  {
    photoUrl: {
      type: String,
      require: true
    },
    title: {
      type: String
    },
    date: {
      type: Date
    },
    country: {
      type: String
    },
    city: {
      type: String
    },
    description: {
      type: String
    }
  },
  { timestamps: true }
)

const Photo = mongoose.models?.Photo || mongoose.model('Photo', PhotoSchema)

export default Photo
