/* eslint-disable react/prop-types */
'use client'

import { Trash } from 'lucide-react'
import { Button } from '../ui/button'
import FileInfo from './file-info'
import Form from './form'
import useUploaderStore from '@/store/uploader'
import { format } from 'date-fns'

export const FileList = ({ data }) => {
  const { removeFile, setSelected, editFile } = useUploaderStore()

  return (
    <section className='flex flex-col gap-4 mt-10'>
      {data?.map(({ file, title, date, country, city, description }, index) => (
        <article key={index} className='flex items-center gap-x-4'>
          {/* file image */}
          <FileImage file={file} />
          <div className='flex justify-between w-full'>
            {/* file info */}
            <FileItem
              title={title}
              date={date}
              country={country}
              city={city}
              description={description}
            />

            {/* file actions */}
            <FileActions
              title={title || 'This is your title'}
              set={() => setSelected(index)}
              edit={(data) => editFile(index, data)}
              remove={() => removeFile(index)}
            />
          </div>
        </article>
      ))}
    </section>
  )
}

const FileImage = ({ file }) => {
  return (
    <img
      src={file.preview ? file.preview : '/preview.webp'}
      alt={file.name}
      width={70}
      height={70}
      className='aspect-square shrink-0 rounded-md object-cover'
    />
  )
}

const FileItem = ({ title, date, country, city, description }) => {
  return (
    <div className='flex gap-x-20 w-full'>
      <div className='min-w-20'>
        <h3
          className='md:text-lg capitalize whitespace-nowrap max-w-24 text-ellipsis
       self-end overflow-hidden md:max-w-60 lg:max-w-72'
        >
          {title || 'title'}
        </h3>
        <h5 className='text-xs md:text-sm text-neutral-500 capitalize'>
          {date ? format(date, 'PPP') : 'date'}
        </h5>
        <h5 className='text-xs md:text-sm text-neutral-500 capitalize'>
          {country || 'country'} - {city || 'city'}
        </h5>
      </div>

      <p
        className='hidden md:block text-neutral-500 max-w-96
                text-sm overflow-hidden whitespace-nowrap  
                text-ellipsis self-center'
      >
        {description || 'this is a discription of this post'}
      </p>
    </div>
  )
}

const FileActions = ({ title, set, edit, remove }) => {
  return (
    <div className='flex items-center gap-x-4 '>
      <FileInfo title={title || 'This is your title'} setSelected={set}>
        <Form editSelected={edit} />
      </FileInfo>

      <Button
        type='button'
        variant='link'
        size='icon'
        onClick={remove}
        className='rounded-full hover:bg-red-200/30'
      >
        <Trash className='size-4 md:size-5 cursor-pointer' />
        <span className='sr-only'>Remove file</span>
      </Button>
    </div>
  )
}
