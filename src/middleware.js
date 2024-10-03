import NextAuth from 'next-auth'
import authConfig from './auth.config'

const PUBLIC_ROUTES = ['/login', '/register', '/verify-email']

const DEFAULT_REDIRECT = '/login'

const ROOT = '/'

const { auth } = NextAuth(authConfig)

export default auth(async function middleware(req) {
  const { nextUrl } = req
  const isAuthenticated = !!req.auth

  console.log('IS LOGGIN: ', isAuthenticated)

  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname)

  if (isPublicRoute && isAuthenticated) {
    return Response.redirect(new URL(ROOT, nextUrl))
  }

  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl))
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
