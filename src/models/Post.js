import { Schema, model, models } from 'mongoose'
import Photo from './Photo'

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true
    },
    images: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Photo'
        }
      ],
      require: true
    }
  },
  { timestamps: true }
)

const Post = models?.Post || model('Post', PostSchema)

export default Post
