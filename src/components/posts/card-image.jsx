export const CardImage = ({ children, file }) => {
  return (
    <article className='relative rounded-md overflow-hidden group  max-h-[350px]'>
      <img
        src={file}
        alt='image'
        className='min-h-full object-cover rounded-md bg-black'
      />

      {children}
    </article>
  )
}
