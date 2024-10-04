export const UserCounter = ({ counter }) => {
  return (
    <div className='mt-4 flex flex-wrap gap-4 justify-between '>
      <div
        className='border rounded-full max-w-32 w-full py-2 px-4 flex-auto
                animate-fade-left animate-once animate-duration-300 animate-ease-in-out'
      >
        <h4 className='text-center text-sm hover:scale-110 transition ease-in-out'>
          <span className='cursor-default text-xl font-semibold'>
            {counter.posts}
          </span>
          <span className='cursor-default ml-2  capitalize text-slate-400 tracking-wider'>
            Posts
          </span>
        </h4>
      </div>
      <div
        className='border rounded-full px-4 py-2 max-w-32 w-full flex-auto
                animate-fade-left animate-once animate-duration-500 animate-ease-in-out'
      >
        <h4 className='text-center text-sm hover:scale-110 transition ease-in-out'>
          <span className='cursor-default text-xl font-semibold'>
            {counter.loves}
          </span>
          <span className='cursor-default ml-2  capitalize text-slate-400 tracking-wider'>
            Loves
          </span>
        </h4>
      </div>
      <div
        className='border rounded-full px-4 py-2 max-w-32 w-full flex-auto
                animate-fade-left animate-once animate-duration-700 animate-ease-in-out'
      >
        <h4 className='text-center text-sm hover:scale-110 transition ease-in-out '>
          <span className='cursor-default text-xl font-semibold'>
            {counter.followers}
          </span>
          <span className='cursor-default ml-2  capitalize text-slate-400 tracking-wider'>
            Followers
          </span>
        </h4>
      </div>
      <div
        className='border rounded-full px-4 py-2 max-w-32 w-full flex-auto
                animate-fade-left animate-once animate-duration-1000 animate-ease-in-out'
      >
        <h4 className='text-center text-sm hover:scale-110 transition ease-in-out'>
          <span className='cursor-default text-xl font-semibold'>
            {counter.following}
          </span>
          <span className='cursor-default ml-2  capitalize text-slate-400 tracking-wider'>
            Following
          </span>
        </h4>
      </div>
    </div>
  )
}
