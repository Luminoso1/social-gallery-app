import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Skeleton } from '../skeleton-posts'
import Posts from '../posts'

export const UserPosts = ({ id }) => {
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['user-posts', id],
    queryFn: async () => {
      const res = await fetch(`/api/users/${id}/posts`)
      return await res.json()
    }
  })

  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/posts/love/${id}`)
      return await res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user-posts'])
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const handleLove = async (id) => {
    try {
      await mutation.mutateAsync(id)
    } catch (error) {
      toast.error('An error ocurred', error)
    }
  }

  console.log(data?.posts)
  if (isLoading || isError) {
    return <Skeleton length={6} className='md:grid-cols-2 lg:grid-cols-3' />
  }

  return (
    <section className='mt-10'>
      <Posts
        posts={data.posts}
        love={handleLove}
        className='grid lg:!grid-cols-3 gap-2 gap-y-8 md:gap-y-2'
      />
    </section>
  )
}
