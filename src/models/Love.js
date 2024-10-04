import { Schema, models, model } from 'mongoose'

const LoveSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      require: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true
    }
  },
  { timestamps: true }
)

const Love = models?.Love || model('Love', LoveSchema)

export default Love
