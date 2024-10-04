'use client'
import { UploadIcon } from 'lucide-react'
import Dropzone from 'react-dropzone'

export const DropzoneSection = ({ onDrop, isDisable, maxFiles, maxSize }) => {
  return (
    <Dropzone
      onDrop={onDrop}
      accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }}
      disabled={isDisable}
      maxSize={maxSize}
      maxFiles={maxFiles}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div
          {...getRootProps()}
          className={`group relative grid h-52 w-full cursor-pointer place-items-center 
            rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25',
            'ring-offset-background focus-visible:outline-none 
            focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  
            ${isDisable ? 'pointer-events-none opacity-60' : ''} 
            ${isDragActive ? 'border-muted-foreground/50' : ''}`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <div className='flex flex-col items-center justify-center gap-4 sm:px-5'>
              <div className='rounded-full border border-dashed p-3'>
                <UploadIcon
                  className='size-7 text-muted-foreground'
                  aria-hidden='true'
                />
              </div>
              <p className='font-medium text-muted-foreground'>
                Drop the files here
              </p>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center gap-4 sm:px-5'>
              <div className='rounded-full border border-dashed p-3'>
                <UploadIcon
                  className='size-7 text-muted-foreground'
                  aria-hidden='true'
                />
              </div>
              <div className='flex flex-col gap-px'>
                <p className='font-medium text-muted-foreground'>
                  Drag {`'n'`} drop files here, or click to select files
                </p>
                <p className='text-sm text-muted-foreground/70'>
                  You can upload only
                  {maxFiles > 1
                    ? ` ${maxFiles === Infinity ? 'multiple' : maxFiles}
                  files 'r post`
                    : ''}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </Dropzone>
  )
}
