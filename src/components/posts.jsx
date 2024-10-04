import { useState } from 'react'
import { cn } from '@/lib/utils'
import { CardImage } from './posts/card-image'
import { LoveButton } from './posts/love-button'
import { UserCard } from './posts/user-card'
import CustomCarousel from './posts/custom-carousel'
import { usePathname } from 'next/navigation'

export default function Posts({ posts, love, className }) {
  const pathname = usePathname()
  const [selected, setSelected] = useState()

  return (
    <section>
      <div
        className={cn('mx-auto grid  md:grid-cols-2 gap-4 mb-20', className)}
      >
        {posts?.map(({ id, user, photos, loves, currentUserLove }, index) => (
          <CardImage key={id} file={photos[0].photoUrl}>
            {photos.length > 1 ? (
              <div
                className='absolute top-0  size-16 bg-black/50 text-white backdrop-blur-md 
              grid place-content-center rounded-br-lg'
              >
                +{photos.length - 1}
              </div>
            ) : null}

            <div
              className='absolute flex gap-x-4 items-center text-white bg-black/50
               bottom-0 py-2 pl-4 w-full duration-500
               backdrop-blur-lg transition'
            >
              {/* user post info only in all posts*/}
              {pathname === '/home' && (
                <UserCard file={user?.avatar} nick={user?.nick} id={user?.id} />
              )}

              {/* love button */}
              <div className='ml-auto flex gap-x-2 mr-4'>
                <LoveButton isLoved={currentUserLove} love={() => love(id)} />
                <CustomCarousel
                  selected={selected}
                  setSelected={() => setSelected(posts[index])}
                />
              </div>
            </div>
          </CardImage>
        ))}
      </div>
    </section>
  )
}
