import { format } from 'date-fns'

export const UserInfo = ({ user, children }) => {
  return (
    <article className='flex items-center gap-x-4 w-full'>
      <img
        src={user?.avatar}
        alt='avatar'
        className='rounded-full size-28 self-center'
      />
      <div className='text-center flex items-center justify-between w-full'>
        <div>
          <h3 className='text-2xl font-bold capitalize'>{user.nick}</h3>
          <span className='block text-slate-500 mb-2'>
            Joined in {format(user.createdAt, 'y')}
          </span>
        </div>
        <div className='flex items-center'>
          {/* <FollowButton /> */}
          {children}
        </div>
      </div>
    </article>
  )
}
