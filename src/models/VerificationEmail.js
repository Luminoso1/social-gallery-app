import { Schema, model, models } from 'mongoose'

const EmailVerificationSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Email is invalid'
      ]
    },
    token: {
      type: String,
      required: true
    },
    expires: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

const EmailVerification =
  models.EmailVerification ||
  model('EmailVerification', EmailVerificationSchema)

export default EmailVerification
