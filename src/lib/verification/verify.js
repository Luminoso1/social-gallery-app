import User from '@/models/User'
import EmailVerification from '@/models/VerificationEmail'
import connectDB from '../db'

export const verifyEmailToken = async (token) => {
  await connectDB()

  const verificationRecord = await EmailVerification.findOne({ token })

  if (!verificationRecord) {
    return { error: 'Invalid or expired token' }
  }

  if (new Date() > verificationRecord.expires) {
    await EmailVerification.deleteOne({ token })
    return { error: 'Token has expired' }
  }

  const user = await User.findOne({ email: verificationRecord.email })
  if (!user) {
    return { error: 'User not found' }
  }

  user.emailVerified = new Date()
  await user.save()

  console.log(user)

  await EmailVerification.deleteOne({ token }) // Elimina el token una vez verificado

  return { success: 'Email verified successfully' }
}

export const getVerificationByToken = async (token) => {
  try {
    const token = await EmailVerification.findOne({ token })
    return token
  } catch (error) {
    return null
  }
}

export const getVerificationByEmail = async (email) => {
  try {
    const token = await EmailVerification.findOne({ email })
    return token
  } catch (error) {
    return null
  }
}
