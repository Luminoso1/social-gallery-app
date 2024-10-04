import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import Provider from '@/providers/query-client-provider'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Social Gallery',
  description: 'This is a social gallery to share images'
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>
        <Provider>
          <SessionProvider>{children}</SessionProvider>
        </Provider>
        <Toaster position='bottom-right' expand={true} richColors />
      </body>
    </html>
  )
}
