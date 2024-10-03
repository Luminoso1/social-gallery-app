'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
  FormField
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { LoginSchema } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import { useTransition, useState } from 'react'
import { AlertCircle, CircleCheck, Loader2 } from 'lucide-react'
import { login } from '@/actions/login'
import { OAuth } from '@/components/auth/oauth'
import Link from 'next/link'

export default function LoginPage() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState()
  const [success, setSuccess] = useState()
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      nick: '',
      password: ''
    }
  })
  console.log({ error, success })
  const onSubmit = (value) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      login(value).then((data) => {
        if (data?.error) {
          setError(data.error)
        } else {
          setSuccess(data?.success)
        }
      })
    })
  }

  return (
    <div className='max-w-md mx-auto p-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='nick'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nick</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
                      <svg
                        className='size-5'
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='#000000b9'
                      >
                        <path d='M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z'></path>
                      </svg>
                    </div>
                    <Input
                      {...field}
                      placeholder='miguelito01'
                      className='ps-10'
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{' '}
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <div className='flex justify-between items-center'>
                  <FormLabel>Password</FormLabel>
                  <Link
                    href='/forget-password'
                    className='text-sm text-blue-500'
                  >
                    Forget password?
                  </Link>
                </div>
                <FormControl>
                  <div className='relative'>
                    <div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
                      <svg
                        className='size-5'
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='#000000b9'
                      >
                        <path d='M12 2C9.243 2 7 4.243 7 7v2H6c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v2H9V7zm9.002 13H13v-2.278c.595-.347 1-.985 1-1.722 0-1.103-.897-2-2-2s-2 .897-2 2c0 .736.405 1.375 1 1.722V20H6v-9h12l.002 9z'></path>
                      </svg>
                    </div>
                    <Input
                      {...field}
                      placeholder='*********'
                      type='password'
                      className='ps-10'
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <div className='py-2 px-2 rounded-sm text-sm flex gap-x-4 items-center bg-red-200 text-black/50'>
              <AlertCircle />
              {error}
            </div>
          )}
          {success && (
            <div className='py-2 px-2 rounded-sm text-sm  flex gap-x-4 items-center  bg-green-500 text-black/50'>
              <CircleCheck />
              {success}
            </div>
          )}
          <Button
            type='submit'
            className='w-full py-5 disabled:bg-slate-400 disabled:pointer-events-none bg-blue-500  hover:bg-blue-600'
          >
            Submit
            {isPending ? '...' : ''}
          </Button>
          <OAuth />
        </form>
      </Form>

      <Link href='/register' className='mt-10 inline-block hover:text-blue-500'>
        Don&apos;t have an account?
      </Link>
    </div>
  )
}
