'use server'
import { signIn } from '@/auth'
import { getUserByNick } from '@/lib/db'
import { LoginSchema } from '@/lib/schemas'
import { sendVerificationEmail } from '@/lib/verification/send-email'
import { generateVerificationToken } from '@/lib/verification/tokens'
import { AuthError } from 'next-auth'

export const login = async (value) => {
  const validateSchema = LoginSchema.safeParse(value)

  if (!validateSchema.success) {
    return { error: 'Invalid credentials' }
  }

  const { nick, password } = validateSchema.data

  const user = await getUserByNick(nick)

  if (!user || !user.password) {
    return { error: 'Invalid credentials or User not exists' }
  }

  if (!user.emailVerified) {
    const verificationToken = await generateVerificationToken(user.email)
    await sendVerificationEmail(user.email, verificationToken.token)
    return { success: 'Verify your email' }
  }

  try {
    await signIn('credentials', {
      nick,
      password,
      redirectTo: '/',
      callBackUrl: '/'
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'invalid credentials' }
        default:
          return { error: 'Something went wrong' }
      }
    }
    throw error
  }
}
