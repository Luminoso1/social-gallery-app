'use server'

import connectDB, { getUserByNickOrEmail } from '@/lib/db'
import { RegisterSchema } from '@/lib/schemas'
import { sendVerificationEmail } from '@/lib/verification/send-email'
import { generateVerificationToken } from '@/lib/verification/tokens'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
export const register = async (values) => {
  values
  const validateData = RegisterSchema.safeParse(values)
  console.log(validateData.data)
  if (!validateData.success) {
    return { error: 'Invalid fields' }
  }

  await connectDB()

  const { nick, email, password } = validateData.data
  const salt = await bcrypt.genSaltSync(10)
  const hash = await bcrypt.hashSync(password, salt)

  const user = await getUserByNickOrEmail(nick, email)

  if (user) {
    return { error: 'User already in use' }
  }

  const newUser = await User.create({
    nick,
    email,
    password: hash
  })

  const verificationToken = await generateVerificationToken(email)

  console.log({ verificationToken, token: verificationToken.token })

  await sendVerificationEmail(newUser.email, verificationToken.token)

  return { success: 'Verify your email' }

  // send verification email
}
