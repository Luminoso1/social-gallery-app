'use client'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Controller } from 'react-hook-form'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { format } from 'date-fns'
import { Calendar } from './ui/calendar'

export const DatePicker = ({ name, control }) => {
  console.log({ name, control })
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              onClick={() => console.log('Popover triggered')}
              variant={'outline'}
              className={cn(
                'justify-start text-left font-normal',
                !field.value && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {field.value ? (
                format(new Date(field.value), 'PPP')
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className=''>
            <Calendar
              mode='single'
              selected={field.selected}
              onSelect={field.onChange}
            />
          </PopoverContent>
        </Popover>
      )}
    />
  )
}
