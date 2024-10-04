import Link from "next/link"

export const UserCard = ({ file, nick, id }) => {
  return (
    <div className='flex items-center gap-x-2'>
      <img
        src={file}
        alt='avatar'
        className='size-8 md:size-10 rounded-full '
      />
      <Link href={`/profile/${id || 'domo'}`}>
        <h3 className='cursor-pointer text-sm md:text-base'>
          {nick || 'user avatar'}
        </h3>
      </Link>
    </div>
  )
}
