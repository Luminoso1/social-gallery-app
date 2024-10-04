'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '../ui/button'

export const Follow = ({ userId, follow }) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/users/${id}/follow`)
      return await res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user', userId])
    }
  })

  const handleFollow = () => {
    mutation.mutate(userId)
  }

  return (
    <div className='flex items-center'>
      <Button
        onClick={handleFollow}
        className='bg-[#F0F2F4] text-[#111418] font-semibold py-1.5 px-10 rounded-md hover:bg-slate-200 border-2 border-transparent active:border-blue-500 transition duration-300'
      >
        {follow === false ? 'Follow' : 'Unfollow 🖕'}
      </Button>
      <svg
        className='w-8 h-8 cursor-pointer'
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        fill='none'
        viewBox='0 0 24 24'
      >
        <path
          stroke='currentColor'
          strokeLinecap='round'
          strokeWidth='2'
          d='M12 6h.01M12 12h.01M12 18h.01'
        />
      </svg>
    </div>
  )
}
