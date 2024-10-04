import NextAuth from 'next-auth'
import authConfig from './auth.config'
import User from './models/User'
import connectDB, { getUserByNickOrEmail } from './lib/db'

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/error'
  },
  ...authConfig,
  callbacks: {
    async session({ token, session }) {
      if (token?.id && session?.user) {
        session.user.id = token.id
        session.user.name = token.nick || token.name
        session.user.image = token.image
      }
      return session
    },

    async jwt({ token, user, account }) {
      await connectDB()

      if (user) {
        const dbUser = await User.findOne({ email: user.email })

        if (dbUser) {
          token.id = dbUser._id.toString()
          token.nick = dbUser.nick
          token.image = dbUser.image
        }
      } else if (!token.id) {
        // Si el token ya existe pero no tiene 'id', buscar en la base de datos
        const dbUser = await User.findOne({ email: token.email })
        if (dbUser) {
          token.id = dbUser._id.toString() // Asegurar que el ID en el token sea el de la base de datos
        }
      }

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
