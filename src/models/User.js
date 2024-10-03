import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema(
  {
    nick: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
      minlength: [4, 'min 4 characters']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Email is invalid'
      ]
    },
    password: {
      type: String
    },
    image: { type: String, default: '/path' },

    emailVerified: {
      type: Date
    },

    authProviderId: { type: String }
  },
  {
    timestamps: true
  }
)

const User = models?.User || model('User', UserSchema)
export default User
