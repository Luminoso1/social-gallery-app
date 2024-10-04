'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Edit2 } from 'lucide-react'
import { Button } from '../ui/button'

export default function FileInfo({ children, title, setSelected }) {
  return (
    <Dialog
      onOpenChange={(isOpen) => {
        // verify if the dialog is open to execute the function setSelected
        if (isOpen) {
          setSelected()
        }
      }}
    >
      <DialogTrigger>
        <Button
          type='button'
          variant='link'
          className='bg-transparent hover:bg-blue-200/50 rounded-full'
          size='icon'
        >
          <Edit2
            className='size-4 md:size-5 cursor-pointer'
            onClick={setSelected}
          />
          <span className='sr-only'>Edit file</span>
        </Button>
      </DialogTrigger>
      <DialogContent className=' max-w-5xl w-full'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{children}</DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
