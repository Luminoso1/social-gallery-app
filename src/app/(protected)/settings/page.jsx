import { auth } from '@/auth'

export default async function EditPage() {
  const session = await auth()
  return <div>Edit page {JSON.stringify(session)}</div>
}
