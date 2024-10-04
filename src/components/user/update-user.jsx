import { Edit2, AlertCircle, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { AVATARS } from '@/lib/utils'
import { CustomSelectAvatar } from './select-avatar'

export const UpdateUser = ({ user }) => {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      nick: '',
      email: '',
      password: null,
      avatar: ''
    }
  })

  useEffect(() => {
    if (user) {
      reset({
        nick: user.name,
        email: user.email,
        password: '',
        avatar: user.image
      })
    }
  }, [user, reset])

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch('/api/users/update', {
        method: 'POST',
        body: data
      })
      return await res.json()
    },
    onSuccess: () => {
      toast.success('User successfully updated')
      queryClient.invalidateQueries(['profile'])
      setIsOpen(false)
    },
    onError: (error) => {
      toast.error('Error: ', error)
    }
  })

  const onSubmit = async (data) => {
    await mutation.mutateAsync(data)
    navigate(`/${data.nick}`)
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger>
        <Button
          type='button'
          variant='link'
          className='bg-transparent hover:bg-blue-200/50 rounded-full'
          size='icon'
        >
          <Edit2 className='size-4 md:size-5 cursor-pointer' />
          <span className='sr-only'>Edit profile</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          <h3 className='text-2xl text-center mt-2 mb-6'>Update User now!</h3>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className='space-y-4'>
            <div className='mb-6'>
              <CustomSelectAvatar
                control={control}
                name='avatar'
                user={user}
                data={AVATARS}
              />
            </div>
            <div>
              <Input
                type='text'
                placeholder='Nick'
                {...register('nick', {
                  required: {
                    value: true,
                    message: 'This field is required'
                  },
                  maxLength: {
                    value: 8,
                    message: 'Max 8 characters'
                  }
                })}
              />
              {errors.nick && (
                <span className='text-red-500 flex gap-x-2 text-sm mt-2'>
                  <AlertCircle size={20} /> {errors.nick.message}
                </span>
              )}
            </div>

            <div>
              <Input
                type='email'
                disable={true}
                className='disabled:pointer-events-none disabled:opacity-35'
                placeholder='Email'
                {...register('email', {
                  required: {
                    value: true,
                    message: 'This field is required'
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && (
                <span className='text-red-500 flex gap-x-2 text-sm mt-2'>
                  <AlertCircle size={20} /> {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <Input
                type='password'
                placeholder='Password'
                {...register('password', {})}
              />
              {errors.password && (
                <span className='text-red-500 flex gap-x-2 text-sm mt-2'>
                  <AlertCircle size={20} /> {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <Button
            className='w-full mt-8 disabled:bg-black/30 disable:pointer-events-none'
            disable={mutation.isPending}
          >
            {mutation.isPending ? <Loader2 className='animate-spin' /> : 'Send'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
