import Link from 'next/link'
import React from 'react'
import { HomeIcon, PlusCircle, Settings, User2 } from 'lucide-react'
import { UserPopover } from './user'
import { auth } from '@/auth'

export default async function Sidebar() {
  const session = await auth()
  return (
    <aside className=' border-r border-slate-200 h-screen fixed left-0'>
      <nav className='py-32 flex flex-col items-center  justify-between h-screen gap-y-12'>
        <Navigation id={session.user.id} />
        <UserPopover user={session.user} />
      </nav>
    </aside>
  )
}

const Navigation = ({ id }) => {
  return (
    <div className='flex flex-col gap-y-8 items-center px-2'>
      <Link href='/create-post' className='p-2 flex gap-x-4 items-center'>
        <PlusCircle />
      </Link>
      <Link href='/home' className='p-2 flex gap-x-4 items-center'>
        <HomeIcon />
      </Link>

      <Link href={`/profile/${id}`} className='p-2 flex gap-x-4 items-center'>
        <User2 />
      </Link>

      <Link href='/settings' className='p-2 flex gap-x-4 items-center'>
        <Settings />
      </Link>
    </div>
  )
}
