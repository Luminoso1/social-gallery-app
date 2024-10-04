import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { LoginSchema } from './lib/schemas'
import connectDB, { getUserByNick } from './lib/db'
import bcrypt from 'bcryptjs'

export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),

    Credentials({
      authorize: async (credentials) => {
        console.log('credentials:', credentials)
        const validateData = LoginSchema.safeParse(credentials)
        if (!validateData.success) {
          return null
        }

        await connectDB()

        const { nick, password } = validateData.data

        const user = await getUserByNick(nick)

        if (!user || !user.password) {
          return null
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) return null

        return {
          id: user._id,
          nick: user.nick,
          image: user.image,
          email: user.email
        }
      }
    })
  ]
}
