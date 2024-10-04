'use client'

import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { UserInfo } from '@/components/user/user-info'
import { UpdateUser } from '@/components/user/update-user'
import { Follow } from '@/components/user/follow'
import { UserCounter } from '@/components/user/counter'
import { UserPosts } from '@/components/user/posts'

export default function ProfilePage({ params }) {
  const { id } = params

  const { data: session, status } = useSession()

  const { data, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const res = await fetch(`/api/users/${id}`)
      return await res.json()
    }
  })

  const isUserProfile = data?.user?.nick === session?.user?.name

  if (isLoading) {
    return (
      <div>
        <Loader2 className='animate-spin' />
      </div>
    )
  }

  console.log(data)

  return (
    <div>
      <section className='max-w-2xl mx-auto'>
        {/* User info */}
        <UserInfo user={data?.user}>
          {isUserProfile ? (
            <UpdateUser user={session?.user} />
          ) : (
            <Follow userId={id} follow={data?.follow} />
          )}
        </UserInfo>
        {/* User counts */}

        <UserCounter counter={data?.counts} />
      </section>
      <UserPosts id={data?.user?.id} />
    </div>
  )
}
