'use client'
import Posts from '@/components/posts'
import { Skeleton } from '@/components/skeleton-posts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export default function HomePage() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch('/api/posts/all')
      return await res.json()
    }
  })

  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/posts/love/${id}`)
      return await res.json()
    },
    onSuccess: () => {
      console.log('SUCCESS')
      queryClient.invalidateQueries(['posts'])
    }
  })

  const handleLove = async (id) => {
    try {
      await mutation.mutateAsync(id)
    } catch (error) {
      toast.error('An error ocurred', error.message)
    }
  }
  if (isLoading) {
    return <Skeleton length={9} className='md:grid-cols-2 lg:grid-cols-3 ' />
  }

  console.log(data)

  return (
    <Posts
      posts={data.posts}
      love={handleLove}
      className='grid lg:!grid-cols-3 gap-2 gap-y-8 md:gap-y-2'
    />
  )
}
