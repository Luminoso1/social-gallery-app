import { Button } from '../ui/button'

export const LoveButton = ({ isLoved, love }) => {
  return (
    <Button variant='link' className='ml-auto p-1' onClick={love}>
      <svg
        className={`size-5 md:size-6 text-white/80 ${
          isLoved ? 'fill-red-500' : 'fill-none'
        }`}
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        fill='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z'
        />
      </svg>
    </Button>
  )
}
