import { Schema, models, model } from 'mongoose'

const FollowSchema = new Schema(
  {
    userFollowed: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true
    },
    userFollowing: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true
    }
  },
  {
    timestamps: true
  }
)

const Follow = models?.Follow || model('Follow', FollowSchema)
export default Follow
