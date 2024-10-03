import NextAuth from 'next-auth'
import authConfig from './auth.config'
import User from './models/User'
import connectDB from './lib/db'

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/error'
  },
  ...authConfig,
  callbacks: {
    async session({ token, session }) {
      if (token?.sub && session?.user) {
        session.user.id = token.sub
        session.user.name = token.nick || token.name
        session.user.image = token.image
      }
      console.log({ sessionToken: token, session })
      return session
    },

    async jwt({ token, user }) {
      if (user) {
        token.nick = user.nick
        token.image = user.image
      }
      console.log('USER JWT', user)
      return token
    },

    signIn: async ({ user, account }) => {
      await connectDB()

      const { name, email, image, id } = user
      const alreadyExistsUser = await User.findOne({ email })

      if (account?.provider !== 'credentials ') {
        try {
          if (!alreadyExistsUser) {
            await User.create({
              nick: name,
              email,
              image,
              authProviderId: id,
              emailVerified: new Date()
            })
          }
        } catch (error) {
          throw new Error('Error while creating user')
        }
      }

      if (account?.provider === 'credentials ') {
        const alreadyExistsUser = await User.findOne({ email })

        console.log('ALREADT USER===============', alreadyExistsUser)

        if (!alreadyExistsUser) {
          return { error: 'User does not exist.' }
        }

        if (!alreadyExistsUser.emailVerified) {
          return { error: 'Email not verified.' }
        }
      }

      return true
    }
  }
})
