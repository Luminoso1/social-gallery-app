import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'

export default async function Home() {
  const session = await auth()
  return (
    <div>
      <h1>Hello😀</h1>
      <div>{JSON.stringify(session)}</div>

      <form
        action={async () => {
          'use server'
          await signOut({ redirectTo: '/login' })
        }}
      >
        <Button>Log out</Button>
      </form>
    </div>
  )
}
