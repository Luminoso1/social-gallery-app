import { v4 as uuidv4 } from 'uuid'
import { getVerificationByEmail } from './verify'
import EmailVerification from '@/models/VerificationEmail'

export const generateVerificationToken = async (email) => {
  const token = uuidv4()

  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getVerificationByEmail(email)

  if (existingToken) {
    await EmailVerification.findOneAndDelete({ _id: existingToken._id })
  }

  const verificationToken = await EmailVerification.create({
    email,
    token,
    expires
  })

  return verificationToken
}
