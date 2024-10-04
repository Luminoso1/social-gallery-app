import { LogOut, User2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Separator } from './ui/separator'
import { auth, signOut } from '@/auth'
import { Button } from './ui/button'

export const UserPopover = async ({ user }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={user?.image} />
          <AvatarFallback>DM</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className='space-y-6 max-w-56 *:text-sm'>
        <article className='flex gap-x-4 items-center'>
          <User2 size='18' />

          <div>
            <h3>{user?.name}</h3>
            <h4 className='!text-xs'>{user?.email}</h4>
          </div>
        </article>
        <Separator />
        <div className='flex gap-x-4 items-center'>
          <LogOut size='18' />
          <form
            className='w-full'
            action={async () => {
              'use server'
              await signOut({ redirectTo: '/login' })
            }}
          >
            <Button
              variant='outline'
              className='w-full outline-none border-none'
            >
              Log out
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  )
}
