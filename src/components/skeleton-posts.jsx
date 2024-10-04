import { cn } from '@/lib/utils'

export const Skeleton = ({ length = 3, className }) => {
  return (
    <div className={cn('animate-pulse  grid gap-4', className)}>
      {Array.from({ length }).map((_, index) => (
        <div key={index} className='h-56 bg-gray-300 rounded'></div>
      ))}
    </div>
  )
}
